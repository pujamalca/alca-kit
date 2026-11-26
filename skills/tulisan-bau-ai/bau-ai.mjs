// BAU AI — pola tulisan yang membuat caption/naskah terdengar ditulis mesin (alca-kit;
// arah dari blader/humanizer, MIT — daftar polanya bahasa Inggris, yang di sini disusun ulang untuk bahasa Indonesia).
// Seperti humanizer: satu pola KUAT sudah cukup untuk diperbaiki; pola LEMAH baru berarti bila ada dua atau lebih.
// Alat ini hanya MENUNJUK; menulis ulangnya tetap manusia/Claude — tiap fakta, angka, dan nama harus tetap ada.
//
//   node bau-ai.mjs --teks "…"         node bau-ai.mjs --berkas NASKAH.md
// Berdiri sendiri: node bau-ai.mjs --teks "…" | --berkas <naskah>  (Node 18+, tanpa dependensi).
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

// [pola, jenis, kuat?, saran]
export const POLA_AI = [
  // §1 kontras yang hanya menambah bobot — "Bukan X, tapi Y" tunggal di kait BOLEH (belokan, skill kait-3-detik); yang dicari bentuk tambalan
  [/\b(?:bukan|tidak)\s+(?:hanya|sekadar|cuma|semata(?:-mata)?)\b[^.!?\n]{0,80}\b(?:tetapi|tapi|namun|melainkan)\s+juga\b/gi, 'kontras tambalan', true, 'katakan saja keduanya: "X dan Y"'],
  [/\btidak hanya itu\b/gi, 'kontras tambalan', true, 'buang; langsung sebut hal berikutnya'],
  // §2 penutup dramatis satu baris
  [/\b(?:itulah|inilah)\s+(?:kunci|rahasia|bedanya|intinya|kekuatan)\w*\b/gi, 'penutup dramatis', true, 'akhiri dengan fakta atau ajakan, bukan kesimpulan berlagak'],
  [/\b(?:renungkan itu|baca sekali lagi|ingat itu baik-baik)\b/gi, 'penutup dramatis', true, 'buang'],
  // §3 kalimat yang terdengar dalam
  [/\bpada\s+(?:dasarnya|hakikatnya|intinya)\b/gi, 'kedalaman palsu', true, 'buang pembukanya, sisakan isinya'],
  [/\b(?:pertanyaan|masalah)\s+(?:sebenarnya|sesungguhnya)\s+adalah\b/gi, 'kedalaman palsu', true, 'langsung ke pertanyaannya'],
  [/\byang\s+(?:benar-benar\s+|paling\s+)?penting\s+adalah\b/gi, 'kedalaman palsu', false, 'langsung sebut hal pentingnya'],
  // §4 ancang-ancang sebelum isi
  [/\b(?:mari\s+kita|yuk\s+kita|ayo\s+kita)\s+(?:bahas|simak|kupas|lihat|bedah|pelajari)\b/gi, 'ancang-ancang', true, 'langsung isi pertamanya'],
  [/\b(?:yuk\s+simak|simak\s+(?:baik-baik|sampai\s+(?:habis|akhir))|tanpa\s+basa-basi|berikut\s+(?:ini\s+)?(?:adalah\s+)?(?:yang\s+perlu|beberapa|cara))\b/gi, 'ancang-ancang', true, 'langsung isi pertamanya'],
  // §5 membantah keberatan yang tidak diajukan
  [/\b(?:jangan\s+salah\s+paham|bukan\s+berarti|bukan\s+maksud\s+(?:saya|kami))\b/gi, 'bantah sendiri', false, 'buang bila tidak ada yang berkeberatan'],
  [/\bperlu\s+(?:diingat|dicatat|digarisbawahi)\b/gi, 'bantah sendiri', false, 'buang; isinya cukup'],
  // §9 pelunak bertumpuk
  [/\b(?:mungkin|barangkali|bisa\s+jadi)\s+(?:saja\s+)?(?:dapat|bisa)\b/gi, 'pelunak bertumpuk', false, 'pilih satu, atau tegaskan'],
  // §12 kata kesayangan mesin
  [/\b(?:selain\s+itu|lebih\s+lanjut|krusial|esensial|holistik|komprehensif|menyelami|lanskap|memaksimalkan\s+potensi|meningkatkan\s+kualitas|secara\s+signifikan|optimal(?:kan)?)\b/gi, 'kata mesin', false, 'ganti kata sehari-hari'],
  // §13 pentingnya digelembungkan
  [/\b(?:di\s+era\s+(?:digital|modern|sekarang)|dalam\s+era\b|di\s+zaman\s+(?:sekarang|serba)|masa\s+depan\s+(?:yang\s+)?cerah|era\s+baru|memegang\s+peran(?:an)?\s+(?:penting|kunci)|memainkan\s+peran|bukti\s+nyata|tonggak|tidak\s+bisa\s+dipungkiri)\b/gi, 'digelembungkan', true, 'buang; sebut akibat nyatanya'],
  // §15 ekor kata kerja yang ditempel
  [/,\s*(?:menunjukkan|mencerminkan|menegaskan|menyoroti|menghadirkan|memastikan)\s+(?:bahwa\s+)?\w+/gi, 'ekor tempelan', false, 'jadikan kalimat sendiri atau buang'],
  // §16 bahasa brosur
  [/\b(?:terletak\s+di\s+jantung|memukau|menakjubkan|kaya\s+akan|wajib\s+(?:dikunjungi|dicoba)|beragam\s+pilihan|solusi\s+(?:terbaik|tepat|lengkap)|revolusioner|terdepan|next\s+level|game\s+changer)\b/gi, 'bahasa brosur', true, 'ganti dengan fakta yang bisa dicek'],
  // §17 wibawa pinjaman tanpa sumber
  [/\b(?:(?:para\s+)?ahli\s+(?:mengatakan|sepakat|menyebut)|menurut\s+(?:banyak\s+)?(?:penelitian|riset|studi)|(?:studi|penelitian|riset)\s+(?:menunjukkan|membuktikan))\b/gi, 'wibawa pinjaman', true, 'sebut sumbernya, atau buang'],
  // §18 menghindari "adalah/punya"
  [/\b(?:berfungsi|bertindak)\s+sebagai\b/gi, 'menghindari "adalah"', false, '"adalah" / "jadi"'],
  // §22–23 sisa obrolan chatbot
  [/\b(?:semoga\s+(?:bermanfaat|membantu)|tentu\s+saja!|pertanyaan\s+(?:yang\s+)?bagus|apakah\s+(?:anda|kamu)\s+ingin|berdasarkan\s+informasi\s+yang\s+tersedia|sebagai\s+(?:model|ai)\b)/gi, 'sisa chatbot', true, 'buang'],
];

const kalimat = t => t.split(/(?<=[.!?])\s+|\n+/).map(s => s.trim()).filter(Boolean);
const kata = s => s.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [];

/** → [{ jenis, kata, kuat, saran }] satu baris per temuan. */
export function cekBauAi(teks) {
  const t = String(teks ?? ''), H = [];
  for (const [re, jenis, kuat, saran] of POLA_AI) for (const m of t.matchAll(re)) H.push({ jenis, kata: m[0].trim(), kuat, saran });

  const K = kalimat(t), nKata = kata(t).length;
  // §1 pola "Bukan X. Tapi Y." / "Bukan X, tapi Y" berulang: sekali = belokan kait, dua kali atau lebih = kebiasaan mesin
  const belok = K.filter(s => /^(?:bukan|ini bukan)\b/i.test(s) && /\b(?:tapi|tetapi|melainkan)\b/i.test(s)).length
    + K.filter((s, i) => /^bukan\b/i.test(s) && /^(?:tapi|tetapi|melainkan)\b/i.test(K[i + 1] ?? '')).length;
  if (belok >= 2) H.push({ jenis: 'kontras berulang', kata: `${belok}× "Bukan …, tapi …"`, kuat: true, saran: 'sisakan satu (di kait), sisanya kalimat biasa' });
  // §6 tiga serangkai: "A, B, dan C" lebih dari sekali
  const tiga = t.match(/\b[\p{L}-]+(?:\s[\p{L}-]+)?,\s[\p{L}-]+(?:\s[\p{L}-]+)?,?\s(?:dan|serta|atau)\s[\p{L}-]+/gu) ?? [];
  if (tiga.length >= 2) H.push({ jenis: 'tiga serangkai', kata: tiga.slice(0, 2).join(' | '), kuat: false, saran: 'tidak semua daftar harus tiga — sebut dua, atau empat bila memang ada' });
  // §7 pembuka kalimat sama tiga kali berturut-turut
  for (let i = 0; i + 2 < K.length; i++) {
    const a = kata(K[i])[0];
    if (a && a.length > 2 && kata(K[i + 1])[0] === a && kata(K[i + 2])[0] === a) { H.push({ jenis: 'pembuka seragam', kata: `"${a} …" ×3`, kuat: false, saran: 'variasikan awal kalimat' }); break; }
  }
  // §8 tanda pisah — juga tidak terbaca oleh mesin suara
  const pisah = (t.match(/\s[—–]\s|—/g) ?? []).length;
  if (pisah >= 2 && pisah / Math.max(nKata, 1) * 100 > 1.5) H.push({ jenis: 'tanda pisah', kata: `${pisah}× —`, kuat: false, saran: 'ganti koma atau titik' });
  // §20 emoji di awal tiap baris + panah
  const baris = t.split('\n').filter(b => b.trim()), bEmoji = baris.filter(b => /^\s*\p{Extended_Pictographic}/u.test(b)).length;
  if (baris.length >= 4 && bEmoji / baris.length >= 0.6) H.push({ jenis: 'daftar emoji', kata: `${bEmoji}/${baris.length} baris dibuka emoji`, kuat: false, saran: 'tulis sebagai kalimat' });
  if ((t.match(/→/g) ?? []).length >= 2) H.push({ jenis: 'panah', kata: '→', kuat: false, saran: 'pakai kata kerja' });
  return H;
}

/** Ringkasan untuk baris pemeriksa: AWAS bila ada pola kuat atau ≥ 2 pola lemah. */
export function vonisBauAi(teks) {
  const H = cekBauAi(teks), kuat = H.filter(h => h.kuat).length, lemah = H.length - kuat;
  const status = kuat || lemah >= 2 ? 'AWAS' : 'LULUS';
  const isi = H.length ? H.map(h => `${h.jenis}: "${h.kata}"${h.kuat ? '' : ' (lemah)'}`).join('; ') : 'tidak ada pola tulisan mesin';
  return { status, isi, temuan: H };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const i = process.argv.indexOf('--teks'), j = process.argv.indexOf('--berkas');
  const teks = i > 0 ? process.argv[i + 1] : j > 0 ? fs.readFileSync(process.argv[j + 1], 'utf8') : null;
  if (teks == null) { console.error('Pakai: node bau-ai.mjs --teks "…" | --berkas <berkas>'); process.exit(1); }
  const v = vonisBauAi(teks);
  console.log(`${v.status}  BAU AI`);
  for (const h of v.temuan) console.log(`  ${h.kuat ? 'KUAT ' : 'lemah'}  ${h.jenis}: "${h.kata}" → ${h.saran}`);
}

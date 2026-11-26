// node tren.mjs --topik "website umkm" [--sumber google,youtube] [--dalam]   (Node 18+, tanpa dependensi)
//
// APA YANG SEDANG DICARI ORANG INDONESIA tentang sebuah topik — bahan kait, judul Short, judul blog (alca-kit; arah dari
// mvanhorn/last30days-skill: banyak sumber sekaligus, dinilai, dikelompokkan, ditulis dalam kata-kata penonton sendiri).
// Tidak memasangnya: sumber yang ia pakai sebagian butuh kunci API, dan yang tanpa kunci (Reddit, Hacker News, X) hampir
// tidak mewakili penonton Indonesia — Reddit juga menolak akses tanpa login, dan halaman pencarian YouTube dilarang
// robots.txt-nya. Yang dipakai di sini: saran pencarian Google dan YouTube (bahasa Indonesia, lokasi Indonesia) — itulah
// kalimat yang benar-benar diketik orang, diurutkan menurut seberapa sering muncul.
//
// Cara: topik itu sendiri, topik + awalan tanya (cara, kenapa, apakah, berapa, …), dan topik + a–z (--dalam), ke tiap sumber.
// Skor = jumlah kemunculan di semua permintaan, dibobot urutannya (saran teratas lebih sering dicari) + bonus bila muncul di
// Google DAN YouTube (seperti last30days: yang ramai di beberapa tempat sekaligus paling kuat).
// Hasil dicetak + tren-<slug>.md di folder kerja. Bukan angka volume pencarian — urutan relatif saja.
import fs from 'node:fs';
import { parseArgs } from 'node:util';

const fail = m => { console.error(m); process.exit(1); };
const { values: a } = parseArgs({ options: { topik: { type: 'string' }, sumber: { type: 'string' }, dalam: { type: 'boolean' } } });
const topik = (a.topik ?? '').trim().toLowerCase();
if (!topik) fail('Pakai --topik "<topik>", mis. --topik "website umkm"');
const SUMBER = { google: '', youtube: 'yt' };
const pakai = (a.sumber ?? 'google,youtube').split(',').map(s => s.trim()).filter(s => s in SUMBER);
const TANYA = ['cara', 'kenapa', 'apakah', 'berapa', 'apa itu', 'bagaimana', 'tips', 'contoh', 'jasa', 'harga'];
const AKHIR = ['untuk', 'yang', 'di', 'vs', 'gratis', 'murah', 'terbaik', String(new Date().getFullYear())];

async function saran(q, ds) {
  const u = `https://suggestqueries.google.com/complete/search?client=firefox&hl=id&gl=id${ds ? `&ds=${ds}` : ''}&q=${encodeURIComponent(q)}`;
  try {
    const r = await fetch(u, { signal: AbortSignal.timeout(8000) });
    return r.ok ? (await r.json())[1] ?? [] : [];
  } catch { return []; }
}

const kueri = [topik, ...TANYA.map(t => `${t} ${topik}`), ...AKHIR.map(t => `${topik} ${t}`), ...(a.dalam ? 'abcdefghijklmnopqrstuvwxyz'.split('').map(h => `${topik} ${h}`) : [])];
const skor = new Map(); // kalimat → { n, bobot, sumber:Set }
let minta = 0;
for (const s of pakai) {
  for (const q of kueri) {
    const hasil = await saran(q, SUMBER[s]);
    minta++;
    hasil.forEach((k, i) => {
      k = k.toLowerCase().trim();
      if (k === topik) return;
      const v = skor.get(k) ?? { n: 0, bobot: 0, sumber: new Set() };
      v.n++; v.bobot += 1 - i / 12; v.sumber.add(s);
      skor.set(k, v);
    });
    await new Promise(r => setTimeout(r, 150)); // sopan: tidak membanjiri
  }
}
if (!skor.size) fail('Tidak ada saran yang kembali — periksa sambungan internet.');

const nilai = v => v.bobot * 10 + (v.sumber.size > 1 ? 15 : 0);
const urut = [...skor].sort((x, y) => nilai(y[1]) - nilai(x[1]));
const kelompok = {
  'Pertanyaan (bahan kait & judul blog)': k => /^(cara|kenapa|mengapa|apakah|berapa|apa|bagaimana|gimana|bisakah|haruskah)\b|\?$/.test(k),
  'Biaya & pembanding (corong MOFU/BOFU)': k => /\b(harga|biaya|murah|mahal|gratis|jasa|vs|terbaik|paket|tarif)\b/.test(k),
  'Contoh & tips': k => /\b(contoh|tips|ide|template|tutorial)\b/.test(k),
};
const grup = {};
for (const [k, v] of urut) {
  const g = Object.keys(kelompok).find(n => kelompok[n](k)) ?? 'Lainnya';
  (grup[g] ??= []).push([k, v]);
}
const baris = ([k, v]) => `${String(Math.round(nilai(v))).padStart(4)}  ${k}${v.sumber.size > 1 ? '  [google+youtube]' : `  [${[...v.sumber][0]}]`}`;
const keluaran = [`Tren pencarian: "${topik}" — ${minta} permintaan saran (${pakai.join(', ')}), ${skor.size} kalimat, ${new Date().toISOString().slice(0, 10)}`,
  'Skor = seberapa sering + seberapa atas munculnya (relatif, BUKAN volume). Ambil kata-katanya apa adanya untuk kait/judul.', ''];
for (const g of [...Object.keys(kelompok), 'Lainnya']) if (grup[g]) keluaran.push(`## ${g}`, ...grup[g].slice(0, 15).map(baris), '');
keluaran.push('Lanjut: calon kait dari kalimat di atas (skill kait-3-detik); judul blog = pertanyaan ≥ 8 kata.');
console.log(keluaran.join('\n'));
const slug = topik.normalize('NFD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
fs.writeFileSync(`tren-${slug}.md`, keluaran.join('\n') + '\n');
console.log(`\n  tren-${slug}.md`);

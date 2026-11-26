---
name: tulisan-bau-ai
description: Memeriksa dan menulis ulang caption, naskah voice-over, artikel, atau teks layar berbahasa Indonesia yang terdengar ditulis mesin. Pakai sebelum mengunggah caption, merekam naskah, atau menerbitkan tulisan.
---

# Tulisan bau AI

Arah: blader/humanizer (MIT). Daftar polanya disusun ulang untuk bahasa Indonesia.

## Aturan menilai

- Satu pola **kuat** sudah cukup alasan untuk menulis ulang.
- Pola **lemah** baru berarti bila muncul dua atau lebih.
- Saat menulis ulang, setiap fakta, angka, dan nama harus tetap ada. Yang dibuang hanya bungkusnya.
- Contoh tulisan pemilik sendiri lebih kuat daripada aturan ini.

## Pola kuat

- **Kontras tambalan:** "bukan hanya … tetapi juga", "tidak hanya itu". Katakan saja keduanya.
  - Satu "Bukan X, tapi Y" di kait boleh (belokan). Dua kali atau lebih dalam satu teks adalah kebiasaan mesin.
- **Penutup dramatis:** "itulah kuncinya", "inilah rahasianya", "renungkan itu". Akhiri dengan fakta atau ajakan.
- **Kedalaman palsu:** "pada dasarnya", "pada hakikatnya", "pertanyaan sebenarnya adalah".
- **Ancang-ancang:** "mari kita bahas", "yuk simak", "tanpa basa-basi", "berikut beberapa cara". Langsung ke isi pertama.
- **Digelembungkan:** "di era digital", "di zaman sekarang", "memegang peranan penting", "tidak bisa dipungkiri", "masa depan cerah".
- **Bahasa brosur:** "solusi terbaik", "memukau", "revolusioner", "terdepan", "wajib dicoba", "next level". Ganti dengan fakta yang bisa dicek.
- **Wibawa pinjaman:** "para ahli mengatakan", "studi menunjukkan" tanpa sumber. Sebut sumbernya atau buang.
- **Sisa chatbot:** "semoga bermanfaat", "tentu saja!", "pertanyaan bagus", "berdasarkan informasi yang tersedia".

## Pola lemah

- "Jangan salah paham", "bukan berarti", "perlu diingat": membantah keberatan yang tidak diajukan.
- Pelunak bertumpuk: "mungkin bisa", "bisa jadi dapat".
- Kata mesin: "selain itu", "lebih lanjut", "krusial", "esensial", "holistik", "komprehensif", "optimal", "secara signifikan".
- Ekor tempelan: ", menunjukkan bahwa …", ", mencerminkan …".
- "Berfungsi sebagai", "bertindak sebagai": pakai "adalah" atau "jadi".
- Daftar tiga serangkai berulang ("A, B, dan C" lebih dari sekali). Sebut dua, atau empat bila memang ada.
- Tiga kalimat berturut-turut dengan kata pembuka yang sama.
- Tanda pisah (—) berlebihan. Di naskah suara, tanda ini juga tidak terbaca mesin suara.
- Daftar yang tiap barisnya dibuka emoji; panah → sebagai pengganti kata kerja.

## Alat

`node bau-ai.mjs --teks "…"` atau `node bau-ai.mjs --berkas NASKAH.md` (Node 18+, tanpa dependensi).

- Hasilnya AWAS bila ada satu pola kuat atau dua pola lemah.
- Alat ini hanya menunjuk tempatnya. Yang menulis ulang tetap manusia atau Claude.

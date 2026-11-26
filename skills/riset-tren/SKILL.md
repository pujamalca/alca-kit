---
name: riset-tren
description: Mencari kalimat yang benar-benar diketik orang Indonesia tentang sebuah topik (saran pencarian Google dan YouTube) sebagai bahan kait, judul video, judul blog, dan caption. Pakai sebelum menulis kait atau judul.
---

# Riset tren

Arah: mvanhorn/last30days-skill (MIT). Tidak memasangnya. Banyak sumbernya butuh kunci API, dan yang gratis (Reddit, Hacker News, X) hampir tidak mewakili penonton Indonesia.

## Cara

- Kirim topiknya ke saran pencarian Google dan YouTube, dengan bahasa Indonesia dan lokasi Indonesia. Variasinya:
  - topiknya sendiri;
  - topik dengan awalan tanya: cara, kenapa, apakah, berapa, apa itu, bagaimana, tips, contoh, jasa, harga;
  - topik dengan akhiran: untuk, yang, di, vs, gratis, murah, terbaik, tahun ini;
  - topik dengan a–z, untuk riset dalam.
- **Skor:** jumlah kemunculan, dibobot urutan (saran teratas lebih sering dicari). Ada bonus bila muncul di Google DAN YouTube; yang ramai di dua tempat paling kuat.
- **Kelompokkan hasilnya:**
  - **Pertanyaan:** calon kait tanya dan judul blog.
  - **Biaya & pembanding** (harga, jasa, gratis, vs, terbaik): konten tengah dan bawah corong.
  - **Contoh & tips.**
- Skornya relatif, BUKAN volume pencarian. Jangan menulis angka volume di laporan.

## Alat

`node tren.mjs --topik "website umkm" [--dalam]` (Node 18+, tanpa dependensi, tanpa kunci).

- Hasilnya dicetak, lalu disimpan ke `tren-<topik>.md`.
- Jeda antar-permintaan 150 ms. Jangan dijalankan beruntun untuk puluhan topik.
- Layanan saran pencarian ini tidak resmi dan bisa berubah atau dibatasi sewaktu-waktu. Bila hasilnya kosong, pakai saran di kolom pencarian secara manual.

## Pakai hasilnya

- Ambil kata-kata penonton apa adanya untuk kait. Lalu tulis tiga calon dan saring dengan skill `kait-3-detik`.
- Judul blog: pertanyaan dari kelompok Pertanyaan, minimal 8 kata.
- Jangan mengambil halaman hasil pencarian YouTube, karena robots.txt-nya melarang. Saran pencarian sudah cukup.

---
name: diagram-penjelas
description: Membuat diagram penjelas (langkah, alur, corong, siklus, kuadran, garis waktu) untuk adegan video edukasi, slide carousel, atau halaman web — dengan jatah unsur dan gaya yang tidak terlihat seperti template. Pakai saat konten menjelaskan proses, urutan, pilihan, atau tahap.
---

# Diagram penjelas

Arah: cathrynlavery/diagram-design (MIT), ditulis ulang untuk video vertikal 9:16 dan slide.

## Pilih jenis menurut isi

| Isi | Jenis |
| --- | --- |
| Cara atau prosedur berurutan | **langkah**: bernomor, atas → bawah |
| Proses yang berpindah tangan (pembeli → toko → kurir) | **alur**: simpul zig-zag kiri/kanan, garis siku, label panah |
| Makin sedikit tiap tahap (lihat → tertarik → tanya → beli) | **corong** |
| Kembali ke awal (pelanggan kembali, jadwal rutin), 3–6 butir | **siklus** |
| Memilih dua sumbu (murah/mahal × cepat/lambat) | **kuadran**: tepat 4 kotak, sumbu diberi nama |
| Kejadian bertanggal atau berjam | **garis waktu** |

## Jatah (wajib)

- Buang dulu sampai tidak ada lagi yang bisa dibuang. Uji setiap simpul, panah, dan label: kalau dibuang, apa yang hilang?
- **Maksimal 9 butir.** Lebih dari itu, pecah jadi diagram ringkasan dan diagram rincian.
- **Maksimal 2 butir fokus** (warna aksen).
- Label panah **maksimal 14 huruf**.

## Gaya

- Tanpa bayangan. Tepi 2–3 px dan sudut 8–10 px.
- Nomor di dalam kotak persegi, bukan pil.
- Garis siku dengan sudut membulat, tidak diagonal. Siklus boleh melengkung.
- Garis digambar sebelum simpul, dan tidak lewat di belakang kotak yang tidak ia sambungkan.
- Label panah duduk di atas penutup warna latar, supaya garis tidak menembus tulisan.
- Semua ukuran pada kisi 4 px. Huruf ≥ 48 px pada kanvas 1080 lebar untuk video.

## Gerak (video)

- Butir muncul satu per satu dengan jeda ±0,45 detik. Paling banyak 2 unsur bergerak bersamaan.
- Panah tumbuh tepat sebelum butir yang ditujunya.
- Frame terakhir memuat SEMUA fakta, supaya still atau sampul tetap terbaca.
- Seluruh gambar harus fungsi murni dari waktu `t`, tanpa state antar-frame.

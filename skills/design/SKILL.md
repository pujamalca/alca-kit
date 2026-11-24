---
name: design
description: Aturan desain antarmuka web agar rapi, konsisten, mudah dibaca, dan tidak terlihat seperti template buatan AI. Pakai saat membangun atau mengubah halaman, komponen, dashboard, form, atau tema warna.
---

# Design

## Token dulu

- Semua warna, radius, jarak, dan huruf lewat variabel CSS di `:root` (mis. `--surface`, `--ink`, `--muted`, `--primary`, `--line`). Tidak ada kode warna atau kelas warna statis di komponen.
- Mode terang dan gelap didefinisikan dari token yang sama. Setiap halaman dicek di kedua mode.
- Satu set huruf per produk, di-host sendiri bila bisa. Paling banyak dua keluarga huruf.
- Nama aplikasi tidak ditulis literal di banyak tempat: ambil dari satu konstanta atau pengaturan.
- Catat token dan pola komponen di `DESIGN.md` project, supaya sesi berikutnya tidak menebak.

## Hindari ciri template AI

- Gradien ungu-biru generik (`#667eea → #764ba2`), teks bergradien, glow, dan latar penuh bintang/partikel.
- Emoji sebagai ikon antarmuka. Pakai satu set ikon SVG yang konsisten.
- Kartu bertumpuk di dalam kartu, garis tebal berwarna di sisi kiri kartu, judul ganda (judul layout + judul halaman yang sama).
- Teks diredupkan dengan `opacity`. Pakai warna solid yang kontrasnya terukur.
- Angka atau statistik karangan ("10.000+ pengguna puas") dan testimoni palsu.
- Kotak gulir bersarang di dalam halaman yang juga bergulir.

## Keterbacaan

- Kontras teks minimal WCAG AA: 4,5:1 untuk teks biasa, 3:1 untuk teks besar dan ikon penting. Hitung, jangan kira-kira.
- Data penting (nama, nomor identitas, nominal) memakai warna kontras tinggi.
- Panjang baris teks bacaan sekitar 60–75 karakter.
- Target sentuh minimal 44×44 px, dan tombol melayang tidak boleh saling menutupi.

## Tata letak

- Rancang dari lebar HP (360–390 px) dulu: gutter samping 16 px, tanpa gulir horizontal.
- Dokumen berukuran tetap (CV, sertifikat, kuitansi A4) tetap ukuran aslinya dan hanya diskalakan di layar, supaya PDF dari HP sama dengan dari desktop.
- Form tambah/ubah di aplikasi admin memakai drawer samping, bukan modal.
- Tabel: ada pencarian/filter; zebra untuk tabel padat; di HP boleh digulir mendatar di dalam wadahnya sendiri.
- Indikator loading seragam di seluruh aplikasi.
- Animasi dimatikan atau dikurangi bila pengguna memilih `prefers-reduced-motion`.

## Jebakan teknis

- `<input type="date">` jangan diberi `display: flex`.
- Cetak: isolasi area cetak dengan `@media print` + `visibility`, bukan `display: none` (menghasilkan halaman kosong).
- Reset CSS global (`* { margin: 0 }`) di halaman lama akan bocor ke header/footer situs saat digabung. Batasi ke wadah halaman itu.
- `add_header` atau CSP baru bisa memblokir CDN yang dipakai halaman. Cek console setelah mengubah header.

## Cek sebelum selesai

1. Tangkapan layar HP dan desktop, mode terang dan gelap.
2. Tidak ada overflow horizontal dan tidak ada galat console.
3. Kontras dihitung untuk pasangan warna baru.
4. Bila ada, jalankan Lighthouse: Accessibility, Best Practices, SEO 100.

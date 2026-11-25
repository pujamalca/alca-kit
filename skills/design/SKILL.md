---
name: design
description: Aturan desain antarmuka web agar rapi, konsisten, mudah dibaca, dan tidak terlihat seperti template buatan AI. Pakai saat membangun atau mengubah halaman, komponen, dashboard, form, atau tema warna.
---

# Design

## Tesis sebelum kode

Untuk halaman atau komponen baru, tulis dua kalimat dulu, tunjukkan ke pemilik, baru menulis kode.

- **Tesis rupa:** tugas tiap warna, huruf beserta alasannya, jarak, gaya komponen, dan *layar pertama* (apa yang terlihat pertama kali).
- **Tesis gerak:** rentang durasi, perilaku hover dan gulir, larangan, dan *satu gerak khas* halaman itu (lihat skill `animasi-web`).
- **Pola yang diizinkan:** daftar hiasan yang sengaja dipakai (mis. butiran, pendar, label mono). Hiasan di luar daftar ini dibuang.

```
Rupa: navy untuk bidang utama, kuning hanya untuk ajakan; Barlow karena padat dan terbaca di HP; jarak 8/16/32; tombol persegi radius 6. Layar pertama: judul, satu kalimat, satu tombol.
Gerak: 150–300 ms, hover hanya warna, tanpa animasi saat gulir kecuali angka hitung. Satu gerak khas: garis jalur tergambar sekali saat dimuat.
Pola yang diizinkan: garis jalur, label mono kecil.
```

## Token dulu

- Semua warna, radius, jarak, dan huruf lewat variabel CSS di `:root` (mis. `--surface`, `--ink`, `--muted`, `--primary`, `--line`). Tidak ada kode warna atau kelas warna statis di komponen.
- Mode terang dan gelap didefinisikan dari token yang sama. Setiap halaman dicek di kedua mode.
- Satu set huruf per produk, di-host sendiri bila bisa. Paling banyak dua keluarga huruf.
- Nama aplikasi tidak ditulis literal di banyak tempat: ambil dari satu konstanta atau pengaturan.
- Catat token dan pola komponen di `DESIGN.md` project, supaya sesi berikutnya tidak menebak.
- Bila satu merek punya situs dan video, simpan hex merek di satu sumber (mis. profil merek) dan salin ke token keduanya, supaya warnanya sama persis.

## Hindari ciri template AI

**Informasi rekaan**
- Angka atau statistik karangan ("10.000+ pengguna puas", "99,9 %", "47,3 %" tanpa sumber), "Sejak 2018" tanpa dasar, testimoni palsu.
- Penghitung palsu ("27 orang sedang melihat"), kode bagian palsu ("01 /", "SEC-01").
- Mockup produk dari kotak-kotak tanpa label.

**Hiasan pengisi**
- Gradien ungu-biru generik (`#667eea → #764ba2`), teks bergradien, glow, gumpalan kabur, dan latar penuh bintang/partikel tanpa alasan.
- Ajakan "scroll", titik status yang tidak berarti apa-apa, deret kata dipisah titik tengah.
- Emoji sebagai ikon antarmuka. Pakai satu set ikon SVG yang konsisten.

**Susunan seragam**
- Tiga kartu sama besar, zigzag gambar-teks di semua bagian, efek kaca buram di mana-mana.
- Kartu bertumpuk di dalam kartu, garis tebal berwarna di sisi kiri kartu, judul ganda (judul layout + judul halaman yang sama).
- Kotak gulir bersarang di dalam halaman yang juga bergulir.
- Teks diredupkan dengan `opacity`. Pakai warna solid yang kontrasnya terukur.

**Copy kosong**
- Kata klise ("Elevate", "Seamless", "Solusi terbaik"), em dash bertebaran.
- Satu ajakan yang diberi banyak label berbeda di halaman yang sama.

## Rujukan desain

- Rujukan dari situs atau desain lain hanya dipakai untuk mengukur arah: palet (k-means, jarak warna ΔE), porsi tiap warna, kerapatan. Jangan menyalin susunan, UI, atau aset orang.
- Hex, huruf, dan susunan tetap dari merek sendiri.

## Keterbacaan

- Kontras teks minimal WCAG AA: 4,5:1 untuk teks biasa, 3:1 untuk teks besar dan ikon penting. Hitung, jangan kira-kira.
- Data penting (nama, nomor identitas, nominal) memakai warna kontras tinggi.
- Panjang baris teks bacaan sekitar 60–75 karakter.
- Target sentuh minimal 44×44 px, dan tombol melayang tidak boleh saling menutupi.
- Tiap elemen interaktif punya lima keadaan yang dirancang: biasa, hover, fokus (terlihat jelas), aktif, nonaktif.

## Tata letak

- Rancang dari lebar HP (360–390 px) dulu: gutter samping 16 px, tanpa gulir horizontal.
- Dokumen berukuran tetap (CV, sertifikat, kuitansi A4) tetap ukuran aslinya dan hanya diskalakan di layar, supaya PDF dari HP sama dengan dari desktop.
- Form tambah/ubah di aplikasi admin memakai drawer samping, bukan modal.
- Tabel: ada pencarian/filter; zebra untuk tabel padat; di HP boleh digulir mendatar di dalam wadahnya sendiri.
- Indikator loading seragam di seluruh aplikasi.
- Animasi dimatikan atau dikurangi bila pengguna memilih `prefers-reduced-motion`. Waktu dan easing: skill `animasi-web`.

## Jebakan teknis

- `<input type="date">` jangan diberi `display: flex`.
- Cetak: isolasi area cetak dengan `@media print` + `visibility`, bukan `display: none` (menghasilkan halaman kosong).
- Reset CSS global (`* { margin: 0 }`) di halaman lama akan bocor ke header/footer situs saat digabung. Batasi ke wadah halaman itu.
- `add_header` atau CSP baru bisa memblokir CDN yang dipakai halaman. Cek console setelah mengubah header.

## Cek sebelum selesai

1. Tangkapan layar di lebar 375, 768, 1024, dan 1440 px, mode terang dan gelap.
2. Tidak ada overflow horizontal dan tidak ada galat console.
3. Kontras dihitung untuk pasangan warna baru.
4. Bila ada, jalankan Lighthouse: Accessibility, Best Practices, SEO 100.

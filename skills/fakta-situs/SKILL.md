---
name: fakta-situs
description: Mengumpulkan fakta usaha klien (nama, alamat, jam, kontak, harga, layanan, dokter) dari situsnya sebagai BUKTI berkutipan, sebelum menulis naskah, brief, atau profil merek. Pakai saat brief memuat tautan situs klien.
---

# Fakta dari situs klien

Arah: D4Vinci/Scrapling (BSD-3) untuk ekstraksi, dan morluto/rea (MIT) untuk temuan sebagai bukti. Keduanya tidak dipasang.

## Sopan dan terang-terangan

- Patuhi robots.txt (User-agent: *). Halaman yang dilarang tidak dibuka.
- Buka halaman berurutan dengan jeda ±1 detik, maksimal 6–12 halaman.
- Pakai browser biasa: tanpa penyamaran, tanpa menembus Cloudflare atau CAPTCHA, tanpa proksi bergilir.
- Kalau situsnya menolak, catat penolakannya dan minta faktanya langsung dari klien.

## Urutan mengambil

1. **Data terstruktur dulu.** `<script type="application/ld+json">`: name, address, telephone, email, priceRange, openingHoursSpecification, sameAs.
2. **Tautan.** `tel:`, `mailto:`, `wa.me/…`, tautan Instagram/TikTok/YouTube, dan parameter `q=` dari peta Google yang ditanam.
3. **Teks halaman.** Pola Indonesia:
   - jam: "Senin–Sabtu 08.00–21.00", "24 jam";
   - harga: "Rp 250.000", "Rp2,5jt", "mulai 50 ribu";
   - alamat: "Jl. …", "Kec. …", "Kab. …";
   - telepon: +62 / 08…;
   - dokter: "dr. …, Sp.…".

   Simpan KALIMAT tempat fakta itu muncul sebagai kutipan.
4. **Halaman yang dibuka.** Beranda, lalu tautan internal dan sitemap.xml yang jalurnya memuat kata seperti kontak, tentang, layanan, jadwal, harga, paket, dokter, lokasi, produk, atau faq.

## Laporan (FAKTA-SITUS.md)

- **Per jenis fakta:** nilainya, halaman sumbernya (atau "N halaman" bila konsisten), caranya (ld+json / tautan / teks), dan kutipannya.
- **Cakupan:** halaman yang dibuka dan yang gagal.
- **Bertentangan:** jenis fakta yang punya lebih dari satu nilai. Tanyakan ke klien, jangan pilih sendiri.
- **Belum ditemukan:** "tidak ada di N halaman yang dibuka" BUKAN berarti tidak ada. Tanyakan.
- **Berubah:** bandingkan dengan pengambilan sebelumnya (simpan JSON-nya), lalu laporkan yang hilang dan yang baru.

## Batas

- Kontak yang tampil di konten harus kontak USAHA, bukan pribadi.
- Harga di situs bisa usang. Harga untuk iklan tetap dari pemilik.
- Klaim kesehatan di situs tidak otomatis boleh dipakai (skill `klaim-kesehatan`).
- Situs klien adalah rujukan FAKTA, bukan bentuk videonya.

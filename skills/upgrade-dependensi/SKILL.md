---
name: upgrade-dependensi
description: Cara menaikkan versi paket npm, Composer, atau Go dengan aman. Pakai saat audit dependensi merah, ada advisori keamanan baru, atau pemilik minta "upgrade semua".
---

# Upgrade dependensi

## Urutan

1. Kritis/RCE → tinggi → sisanya. Satu kelompok per commit.
2. Update terarah lebih dulu: `composer update vendor/paket -W`, `npm install paket@versi`. Hindari `update` semua sekaligus kecuali memang diminta.
3. Setelah tiap kelompok: jalankan semua gate (lihat skill `gerbang-rilis`).

## Aturan

- Patch keamanan yang dipicu pengunjung (mis. ReDoS di parser header) didahulukan, walau skornya bukan yang tertinggi.
- Peer dependency mengunci versi: pakai `"overrides": { "paket": "$paket" }` di npm, bukan `--force`.
- `npm audit fix --omit=dev` bisa menghapus devDependencies dari `node_modules`. Jalankan `npm install` lagi sesudahnya.
- Versi mayor (mis. zod 3→4, Filament 3→4→5): grep pemakaian API yang berubah, pakai skrip upgrade resmi bila ada, perbaiki galat tipe, lalu bandingkan artefak yang dibangkitkan (openapi.json, daftar route) supaya tidak ada route/field yang hilang.
- Paket yang sengaja disematkan (mis. klien protokol pihak ketiga yang sensitif versi) tidak dinaikkan. Catat alasannya di dekat berkas lock atau di dokumentasi.
- Composer di server produksi: `composer install --no-dev -o --no-scripts` sebagai user deploy, lalu `php artisan package:discover` sebagai user web. Tanpa `package:discover`, paket baru bisa tidak ter-register.
- Tanpa `package-lock.json`, `npm audit` tidak bisa dijalankan. Commit lock file.
- Patch bahasa/runtime (PHP, Node) dari paket OS: cek dulu tanda kompromi bila celahnya sudah dieksploitasi publik, lalu pasang, restart layanan yang memakainya, verifikasi.

## Laporan

Versi sebelum → sesudah, advisori yang tertutup, yang tersisa dan alasannya, hasil tes.

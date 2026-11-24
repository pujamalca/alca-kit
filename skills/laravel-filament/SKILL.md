---
name: laravel-filament
description: Kebiasaan dan jebakan Laravel + Filament di server produksi (izin berkas, cache, antrean, deploy, upgrade). Pakai saat mengerjakan, men-deploy, atau mendiagnosis aplikasi Laravel, terutama dengan panel admin Filament.
---

# Laravel dan Filament

## Pemilik dan izin berkas

- Kode dimiliki user deploy, grup web (`www-data`). `storage/` dan `bootstrap/cache/` ditulis oleh user web.
- Perintah artisan di produksi dijalankan sebagai user web: `sudo -u www-data HOME=/tmp php artisan ...` (`HOME=/tmp` supaya tinker/psysh tidak gagal menulis konfigurasi).
- `.env` mode `640`. `bootstrap/cache/config.php` berisi salinan semua nilai `.env`: kembalikan ke `640` setelah `optimize` (artisan menulisnya `644`).
- Aset yang diterbitkan sebagai user deploy (mis. `public/js/filament`) harus diberi grup web dan izin tulis grup, kalau tidak deploy otomatis berikutnya gagal di langkah composer.
- SQLite: direktori `database/` (bukan hanya berkasnya) harus bisa ditulis user web, karena ada berkas `-wal`/`-journal`.

## Deploy

```bash
php artisan down
git merge --ff-only <cabang>
composer install --no-dev -o --no-scripts      # sebagai user deploy
php artisan package:discover                   # sebagai user web
php artisan migrate --force                    # cek migrate:status dulu
php artisan optimize:clear && php artisan optimize
chmod 640 bootstrap/cache/config.php
php artisan queue:restart
php artisan up
```

- `public/build` biasanya diabaikan git: build Vite tidak ikut deploy lewat `git pull`. Build di mesin lain/CI lalu salin, atau build sebagai user non-root.
- Migrasi yang belum pernah jalan di produksi bisa menumpuk. Cek `migrate:status`, jalankan migrasi baru dengan `--path` bila ada migrasi lama yang belum diputuskan.
- Settings Spatie: key baru wajib lewat settings migration; tanpa itu halaman pengaturan gagal disimpan (`MissingSettings`).
- Webhook deploy yang menjalankan `git reset --hard origin/main` akan menghapus deploy manual yang belum di-push. Push setelah deploy manual.

## Antrean dan jadwal

- `QUEUE_CONNECTION=database` tanpa worker = semua email dan job menumpuk diam-diam. Jalankan worker sebagai layanan (systemd, `--max-time=3600`, `--memory=128`, `Restart=always`).
- `schedule:run` harus dijadwalkan (timer/cron tiap menit), kalau tidak tugas terjadwal tidak pernah jalan.
- Setelah deploy kode job/notifikasi: `queue:restart`.

## Filament

- Ubah tema lewat API panel (`->colors()`, `->font()`, theme CSS), bukan override `!important`.
- Filament 4+ memakai disk default dari `FILESYSTEM_DISK` (sering `local`, privat). Field gambar publik harus menyebut `->disk('public')`.
- Unggahan gambar: `->image()` saja masih menerima SVG. Tentukan tipe raster secara eksplisit.
- Reorder tabel memakai satu `UPDATE` massal tanpa event model: hapus cache yang terkait secara manual.
- `canAccessPanel()` meng-cast tipe dengan benar (mis. `(bool) $this->is_admin`), kalau tidak user non-admin bisa memicu 500.
- PWA panel admin: manifest dengan `scope` `/admin`, service worker tanpa cache data.

## Konfigurasi aman

- `APP_DEBUG=false`, `LOG_LEVEL=warning` di produksi, `SESSION_SECURE_COOKIE=true`.
- `trustHosts` diisi domain sendiri, supaya tautan reset sandi tidak dibangun dari header Host palsu.
- `laravel.log` dirotasi (channel `daily` atau logrotate dengan `copytruncate`).
- Jangan jalankan `db:seed` di produksi bila seeder membuat akun bawaan.

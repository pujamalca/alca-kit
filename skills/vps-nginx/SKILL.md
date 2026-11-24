---
name: vps-nginx
description: Aturan mengelola VPS Linux dengan nginx, PHP-FPM, SSH, firewall, dan sertifikat. Pakai sebelum mengubah konfigurasi server, menambah situs atau subdomain, atau saat situs di VPS bermasalah.
---

# VPS dan nginx

## Sebelum mengubah apa pun

- VPS produksi: setiap perubahan langsung berdampak ke pengguna nyata. Minta izin pemilik untuk restart layanan, hapus berkas, atau ubah konfigurasi.
- Cadangkan berkas yang diubah dengan stempel waktu, dan tulis perintah rollback di catatan perubahan.
- Satu nginx melayani semua situs: config yang gagal diuji menjatuhkan semuanya. **Selalu `nginx -t` sebelum `reload`.** Pakai reload, bukan restart.
- Uji perubahan berisiko di vhost sementara (port localhost) sebelum mengganti vhost live.

## Situs baru

- Wajib: blokir dotfile (`location ~ /\.(?!well-known/)`), header keamanan, `server_tokens off`, redirect HTTP → HTTPS, sertifikat (certbot).
- Webroot hanya folder publik/build, bukan root repo.
- Verifikasi: `curl -o /dev/null -w "%{http_code}" https://domain/.git/config` harus 403/404.
- Vhost `default_server` yang menolak host tak dikenal (port 80 `return 444`, port 443 `ssl_reject_handshake on`), supaya domain lama atau Host palsu tidak jatuh ke situs pertama.

## Jebakan nginx

- `add_header` tidak diwariskan ke `location` yang punya `add_header` sendiri: include ulang snippet header di location itu.
- `location = /path` menang atas semua; `^~` mencegah regex dievaluasi. Selalu cek dengan curl setelah reload.
- Versi lama (< 1.25.1) tidak mengenal `http2 on;` → pakai `listen 443 ssl http2;`. Cek `nginx -v` saat menyalin config dari mesin lain.
- `proxy_pass` ke hostname luar di-resolve saat start; DNS gagal = nginx gagal start. Pakai `set $up host; proxy_pass https://$up;` + `resolver`.
- Header besar dari backend (Next.js, cookie auth) → 502 "upstream sent too big header" → naikkan `proxy_buffer_size`.
- `X-Forwarded-For $remote_addr` (bukan `$proxy_add_x_forwarded_for`) bila nginx adalah tepi tanpa CDN.
- Snippet yang memblokir `*.json`/`*.md` jangan dipasang di situs yang memang menyajikannya.
- Melonggarkan satu header untuk satu situs (mis. izin mikrofon): salin isi snippet ke vhost itu dengan satu nilai diubah, jangan ubah snippet bersama.
- HSTS `includeSubDomains` hanya bila semua subdomain punya sertifikat sehat.

## PHP-FPM

- Pool terpisah per aplikasi (`pm = ondemand` di server kecil), dengan `open_basedir`, `disable_functions` (exec, shell_exec, system, proc_open, popen), dan `error_log` di folder yang bisa ditulis user pool. Uji dengan memicu warning; log kosong belum tentu berarti tanpa galat.
- `php-fpm -t` sebelum reload.

## SSH, firewall, fail2ban

- Matikan login password hanya setelah login kunci terbukti dari terminal kedua. `sshd -t` sebelum reload; jangan restart SSH dari sesi SSH.
- Berkas `sshd_config.d/*.conf` dibaca berurutan dan nilai pertama yang menang: beri nomor kecil (`10-...`).
- Pastikan port jail fail2ban sama dengan port SSH sebenarnya; cek bahwa aturan ban benar-benar menerima paket.
- Firewall: tambah aturan baru dulu, verifikasi, baru hapus yang lama. Hapus aturan basi (port yang tidak ada yang mendengarkan).

## Perawatan

- `unattended-upgrades` aktif. Kecualikan layanan kritis (tunnel, VPN) dari restart otomatis needrestart.
- Batasi journald (`SystemMaxUse`), rotasi log aplikasi, bersihkan arsip lama dengan cron.
- RAM kecil: jangan build sebagai root atau saat trafik tinggi; build di mesin lain bila bisa.
- Cadangan harian + salinan di mesin lain (lihat skill `backup-tarik`).
- Rahasia di berkas `600`/`640` di luar webroot, bukan di skrip yang bisa dibaca semua user.

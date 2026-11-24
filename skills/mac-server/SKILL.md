---
name: mac-server
description: Menjalankan layanan permanen atau tugas terjadwal di macOS (Mac sebagai server rumah/kantor). Pakai saat memasang layanan, job berkala, atau AI lokal di Mac.
---

# Mac sebagai server

- Pakai launchd (LaunchAgent/LaunchDaemon), bukan cron. `StartInterval` + `RunAtLoad` supaya job menyusul setelah Mac tidur atau listrik padam.
- LaunchAgent hanya jalan selama akun login; LaunchDaemon jalan tanpa login tapi tanpa akses Keychain pengguna.
- FileVault wajib menyala bila Mac menyimpan rahasia. Konsekuensinya Mac tidak bisa login otomatis setelah listrik padam: pakai UPS.
- Layanan hanya listen di `127.0.0.1`. Akses LAN lewat gerbang bertoken. Jangan membuka port atau mengubah firewall tanpa izin pemilik.
- macOS tidak punya `timeout` GNU (pakai `gtimeout` dari coreutils), dan openrsync bawaan ditolak rrsync (pakai rsync Homebrew).
- Label layanan Homebrew bisa berganti saat upgrade; cek ulang setelah `brew upgrade`.
- Server berat yang jarang dipakai: aktif hanya saat dipakai, supaya RAM dan panas tidak terbuang.
- Docker di Mac (Colima/Docker Desktop) memakai VM: path di dalam container berbeda dengan path host. Perintah cache/artisan aplikasi di container dijalankan lewat `docker exec`, bukan dari host.

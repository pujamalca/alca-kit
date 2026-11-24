---
name: db-produksi
description: Aturan menyentuh database produksi, terutama database yang juga dipakai aplikasi lain atau aplikasi pihak ketiga. Pakai sebelum query, migrasi, atau uji apa pun ke database produksi.
---

# Database produksi

## Baca dulu, tulis dengan izin

- Database produksi hanya `SELECT`, kecuali tindakan tulis tertentu yang disetujui pemilik di sesi itu.
- Bila izin tulis diberikan: aktifkan lewat variabel lingkungan di dalam skrip sementara, kosongkan di blok `finally`, lalu hapus skripnya.
- Sebelum mengubah baris nyata, catat nilai aslinya. Sebelum perubahan besar, dump tabel yang terdampak.
- Uji di produksi hanya yang net-zero (membuat lalu menghapus datanya sendiri), atau tidak sama sekali.

## Migrasi

- Cek `migrate:status` (atau padanannya) sebelum migrasi produksi. Jalankan hanya migrasi yang dimaksud.
- Migrasi tabel baru dijalankan manual sebelum kode yang membutuhkannya naik. Deploy otomatis tidak menjalankan migrasi.
- Migrasi idempoten (`CREATE TABLE IF NOT EXISTS`) dan tercatat di tabel log migrasi.
- Hati-hati dengan alat yang "menyinkronkan skema" (mis. `prisma db push`): bisa menghapus tabel berisi data.

## Database milik aplikasi lain

- Tabel tambahan diberi awalan khusus (mis. `ext_`). DDL hanya pada tabel berawalan itu; skema tabel asli tidak diubah.
- Tanpa foreign key dari tabel tambahan ke tabel asli (rujuk lewat kolom biasa) dan tanpa trigger di tabel asli.
- Tabel audit hanya `INSERT`; tidak ada endpoint ubah/hapus.
- Cadangan tabel tambahan dibuat terpisah dari cadangan penuh aplikasi asli.
- Modul yang menulis ke tabel keuangan wajib berperilaku setara dengan aplikasi asli sebelum dibuka.

## Server database

- Bind ke `127.0.0.1` bila tidak ada klien luar; tanpa user wildcard `%` yang tidak perlu. Hapus user dan grant yang sudah tidak dipakai.
- Akun aplikasi punya hak minimum di database miliknya saja. Akun baca untuk laporan dibuat terpisah.
- Jangan hentikan proses server database dengan `kill`; pakai manajer layanan.
- Uji pemulihan cadangan secara nyata sesekali (restore ke database sementara, bandingkan jumlah baris).

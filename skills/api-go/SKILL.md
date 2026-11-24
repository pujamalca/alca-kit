---
name: api-go
description: Konvensi REST API dengan Go: lapisan handler-service-repository, query aman, envelope respons, izin per route, unggahan, dan dokumentasi modul. Pakai saat menambah modul atau endpoint di API Go.
---

# REST API dengan Go

## Struktur

- Lapisan: handler → service → repository. Handler tidak menyentuh database; repository tidak tahu HTTP.
- Satu modul = satu folder (handler, service, repository, tipe) + spesifikasi `docs/modul/<nama>.md` (lihat skill `prd`) + entri di dokumen daftar route. Skrip sinkron memastikan keduanya cocok dengan route yang terdaftar.

## Query

- Selalu terparameter. Nama tabel/kolom dinamis (sort, filter) hanya dari daftar putih atau registry.
- Batasi `LIMIT` dan ukuran halaman di server.

## Respons dan galat

- Semua respons lewat satu envelope, mis. `{ "success": bool, "data": ..., "message": "...", "meta": {...} }`.
- Pesan galat 5xx diredaksi di produksi (log detailnya di server, kirim pesan umum ke klien).
- Endpoint terlindung tanpa token: 401 JSON.

## Izin

- Izin per route lewat satu middleware dengan flag (mis. `perm("pasien.ubah")`). Skrip audit memindai route yang belum punya flag.
- Endpoint tulis yang menyentuh uang atau stok dikunci di produksi sampai hasilnya terbukti setara dengan sistem lama (paritas jurnal).

## Unggahan dan parser

- Batasi ukuran body sebelum parse (`http.MaxBytesReader`).
- Tipe ditentukan dari isi (`http.DetectContentType` / magic bytes), bukan nama berkas.
- Nama berkas di disk acak; berkas dibaca lewat path yang dikurung di satu folder (tolak `..`).
- Parser berkas pengguna (CSV, PDF, Excel) wajib punya batas ukuran, jumlah baris, dan jumlah halaman.

## Build dan jalan

- Build rilis: `go build -trimpath -ldflags "-s -w"`.
- Layanan listen di `127.0.0.1`; publik lewat reverse proxy dengan TLS.
- Jalankan lewat manajer proses (systemd, launchd, Scheduled Task, PM2). Jangan `kill` paksa.

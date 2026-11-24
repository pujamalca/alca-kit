---
name: windows
description: Menjalankan layanan dan menulis skrip di Windows (PowerShell 5.1, Laragon, PM2, Scheduled Task) beserta jebakannya. Pakai saat bekerja di PC atau server Windows.
---

# Windows

## Layanan

- Native Windows: tanpa WSL dan tanpa Docker kecuali pemilik minta.
- Node: PM2. Biner (Go, dsb.): Scheduled Task. Bind `127.0.0.1`; publik lewat reverse proxy atau terowongan.
- Siklus deploy biner: tes → hentikan task → build (`go build -trimpath -ldflags "-s -w"`) → jalankan task → cek log.
- Data besar disimpan di drive data, bukan `C:`.
- Proses latar yang dimatikan sistem karena RAM habis jangan dinyalakan ulang tanpa izin.
- Matikan database (mis. Laragon "Stop") sebelum restart PC. Dua `mysqld` yang berebut `ibdata1` menghasilkan status merah palsu.

## PowerShell 5.1

- Tanpa `&&`, `||`, dan `??`. Pakai `; if ($?) { ... }`.
- Berkas `.ps1` hanya ASCII: tanda pisah panjang atau kutip tipografis membuat parser memberi galat menyesatkan.
- Nama variabel tidak boleh sama dengan nama parameter (tidak peka huruf besar-kecil).
- Here-string untuk kueri memakai kutip tunggal (`@' ... '@`) supaya `$` tidak diinterpolasi.
- Tulis berkas lewat .NET dengan path absolut; direktori kerja proses bisa berbeda dari lokasi shell.
- Redirect stderr dari perintah native menandai galat palsu (`NativeCommandError`); periksa `$LASTEXITCODE`.
- Pesan commit multi-baris: tulis ke berkas, lalu `git commit -F berkas.txt`.

## Shell Unix di Windows (Git Bash)

- `/c/...` berbeda dengan `C:\...` saat dilempar ke Node/Python. Konversi dengan `cygpath -w`.
- Heredoc yang berisi backslash atau regex mudah berubah; tulis berkas lewat alat penulis berkas.

## Diagnosis

- Baca Windows Event Log (Application) di rentang waktu kejadian, bersama log aplikasi.
- Cek port dengan `Test-NetConnection -ComputerName 127.0.0.1 -Port N`, dan proses dengan PID, waktu mulai, serta proses induknya.

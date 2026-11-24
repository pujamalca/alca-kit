---
name: diagnosis-insiden
description: Cara mendiagnosis layanan yang mati, error, atau lambat, lalu melaporkannya. Pakai saat pemilik bertanya "kenapa X mati/error/merah" atau saat situs tidak bisa diakses.
---

# Diagnosis insiden

## Langkah

1. **Tetapkan rentang waktu** kejadian, lalu baca log di rentang itu: log aplikasi, web server (access + error), sistem (journald / Event Log), dan log layanan terkait.
2. **Buat kronologi per detik.** Insiden yang menyerang banyak situs sekaligus biasanya satu titik bersama (web server, DNS, reboot terjadwal, terowongan).
3. **Cek keadaan sekarang:** proses (PID, waktu mulai, proses induk), port yang mendengarkan, memori, disk, status layanan.
4. **Uji berlapis dari dalam ke luar:** langsung ke port aplikasi → dengan header Host → lewat proxy lokal → dari internet. Lapis pertama yang gagal menunjukkan letak masalah.
5. **Bedakan gejala dan akar.** Bila akar tidak bisa dipastikan (log terpotong, proses induk hilang), katakan terus terang.
6. **Tindakan yang mengganggu** (reboot router/server, restart layanan yang dipakai bersama) minta izin dulu.
7. **Buktikan pemulihan** dengan cek ulang nyata (HTTP 200, status layanan), bukan asumsi.

## Pola yang sering terjadi

| Gejala | Kemungkinan |
|---|---|
| Semua situs mati bersamaan | Web server gagal start karena config/DNS upstream; reboot terjadwal |
| 502 hanya di path tertentu | Header backend terlalu besar untuk buffer proxy |
| 403 kosong dari backend | Backend menolak header Host |
| Semua situs terowongan 502, VPS sehat | Rute balik ISP rumah rusak; reboot modem |
| 500 tanpa log aplikasi | Cache konfigurasi berisi path mesin lain; galat sebelum framework jalan (cek log PHP-FPM/stderr) |
| Email tidak pernah terkirim | Tidak ada worker antrean; mailer masih `log` |
| Brute force jalan terus walau fail2ban aktif | Port jail salah |

## Laporan

- Apa yang terjadi (kronologi singkat).
- Status sekarang (dengan bukti).
- Apa yang belum diketahui.
- Saran pencegahan.

Simpan pola gejala → penyebab yang terbukti ke catatan project atau memori, supaya kejadian berikutnya lebih cepat.

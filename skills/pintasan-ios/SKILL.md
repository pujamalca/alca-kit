---
name: pintasan-ios
description: Membuat otomasi Pintasan (Shortcuts) iPhone yang mengirim foto atau berkas ke API sendiri, dengan nama menu iOS berbahasa Indonesia. Pakai saat membuat unggahan otomatis dari iPhone ke server.
---

# Pintasan iOS ke API sendiri

## Nama menu (iOS bahasa Indonesia)

Automasi · Pengisi Daya Terhubung · Temukan Foto · Ulangi dengan Tiap · Dapatkan Konten URL · Item Pengulangan

## Membuat pintasan

1. Pintasan > Automasi > + > pemicu (mis. Pengisi Daya Terhubung).
2. **Temukan Foto** (filter: tanggal ditambahkan, batas jumlah).
3. **Ulangi dengan Tiap** foto.
4. Di dalam ulangan: **Dapatkan Konten URL**
   - Metode: POST
   - Header: `Authorization` = `Bearer <token>`. Hanya satu baris header; baris kosong tambahan memicu "koneksi jaringan terputus" (nginx menolak: zero header name length).
   - Minta Isi: **File**, dan File = variabel **Item Pengulangan** (bukan seluruh Foto).
5. Pengaturan > Aplikasi > Pintasan > Lanjutan > izinkan berbagi data dalam jumlah besar.

## Sisi server

- Pintasan mengirim ulang semua item yang ditemukan setiap kali jalan: server wajib dedup (hash isi berkas).
- Batasi ukuran unggahan di nginx dan aplikasi; tipe dicek dari isi.
- Token khusus untuk perangkat itu, bisa dicabut sendiri.

## Uji

- Uji manual dulu dengan satu aksi, lalu cek log server per percobaan. Baru jadikan automasi.

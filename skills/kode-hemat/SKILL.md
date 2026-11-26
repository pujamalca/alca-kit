---
name: kode-hemat
description: Cara menulis atau mengubah kode seperlunya — petakan pemakai dulu, pakai yang sudah ada, perbaiki di akar, catat jalan pintas dengan pemicunya. Pakai saat menambah fitur, memperbaiki bug, atau merapikan kode di project mana pun.
---

# Kode hemat

Arah: DietrichGebert/ponytail (MIT), ditulis ulang.

## Sebelum menulis

- Petakan siapa yang memakai berkas yang akan diubah: pemanggil, uji, dan konfigurasi. Cari dengan grep, atau buat peta impor sederhana (impor statis + `import()` bertemplat ditandai "samar").
- Urutan pilihan:
  1. tidak perlu dibuat;
  2. pakai yang sudah ada di repo;
  3. pustaka bawaan bahasa;
  4. dependensi yang sudah terpasang;
  5. satu baris;
  6. baru kode baru seperlunya.

## Saat menulis

- Tanpa abstraksi atau konfigurasi "untuk nanti". Menghapus lebih baik daripada menambah.
- Perbaiki bug di akarnya: cari semua pemanggil, lalu betulkan kode bersamanya sekali.
- Logika baru yang tidak sepele meninggalkan satu uji kecil atau assert.
- Jalan pintas boleh, asal ditandai `// pintas: <batasnya>, <kapan harus diganti — bila/saat …>`. Jalan pintas tanpa pemicu adalah utang yang tidak akan dibayar.
- Validasi, keamanan, aksesibilitas, dan penanganan kehilangan data TIDAK pernah dipintas.

## Saat melapor

- Sebut yang sengaja dilewati dan risikonya.
- Temuan tinjauan kode ditulis dalam bentuk: apa → masalahnya → perbaikannya → kalau dibiarkan. Tanpa contoh kasus nyata, tidak ada temuan.

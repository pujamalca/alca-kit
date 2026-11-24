---
name: langkah
description: Cara memecah project menjadi langkah bernomor yang dikerjakan satu per sesi, dengan bukti di VERIFICATION.md. Pakai saat project baru sudah punya PRD dan siap dikerjakan bertahap, atau saat melanjutkan project di sesi baru.
---

# Langkah bertahap

Project besar dikerjakan sesi demi sesi, sering oleh model yang berbeda. Supaya tidak ada yang hilang, status kerja tinggal di berkas, bukan di ingatan percakapan.

## Dokumen awal (ditulis sebelum kode)

| Berkas | Isi |
|---|---|
| `docs/prd.md` | Masalah, pengguna, fitur, keputusan (lihat skill `prd`) |
| `docs/arsitektur.md` | Stack, struktur folder, alur data, tempat jalan |
| `docs/security.md` | Data sensitif, siapa boleh apa, ancaman utama |
| `docs/langkah.md` | Daftar langkah bernomor |
| `VERIFICATION.md` | Bukti tiap langkah |
| `CLAUDE.md` | Cara menjalankan, menguji, dan aturan project; rujuk dokumen di atas |

## Format `docs/langkah.md`

```markdown
## Fase 0: Fondasi
- [x] L0.1 Kerangka project + CI
  - Berkas: composer.json, .github/workflows/tests.yml
  - Verifikasi: `php artisan test` lulus di CI
  - Selesai bila: CI hijau di cabang dev
- [ ] L0.2 Login admin
  ...
- [ ] L3.4 Pembayaran sungguhan  ⏸ butuh akun merchant pemilik
```

## Aturan

- Satu langkah per sesi. Mulai sesi dengan membaca `langkah.md` dan `VERIFICATION.md`, kerjakan langkah pertama yang belum dicentang.
- Status resmi hanya kotak centang di `langkah.md`. Centang setelah buktinya ditempel.
- Bukti di `VERIFICATION.md` berupa keluaran nyata: perintah, angka tes, status HTTP, tangkapan layar. Bukan "sudah jalan".
- Langkah yang butuh dunia nyata (uang sungguhan, nomor HP, domain, server, naskah hukum) dibiarkan tidak dicentang, dengan alasan dan apa yang dibutuhkan dari pemilik.
- Keputusan baru dari pemilik langsung dicatat di `prd.md` bagian Keputusan.
- Langkah yang ternyata terlalu besar dipecah (L2.3 → L2.3a, L2.3b), jangan dikerjakan setengah.
- Konstanta bisnis (harga, paket, rekening) tidak di kode. Skrip preflight bisa menolak build bila menemukannya.

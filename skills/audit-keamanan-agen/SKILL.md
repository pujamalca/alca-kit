---
name: audit-keamanan-agen
description: Proses audit keamanan kode dengan beberapa agen AI (rekonaisans, hunter per area, verifikasi independen, critic cakupan). Pakai saat pemilik meminta audit keamanan menyeluruh atas sebuah codebase.
---

# Audit keamanan dengan agen

## Persiapan

- Baca dulu skill/alat audit yang akan dipakai. Jangan menjalankan installer tanpa membacanya.
- Tanpa sandbox OS, jangan mengeksekusi kode target: audit hanya dari sumber, dan semua temuan berstatus "perlu validasi".
- Dengan sandbox: snapshot read-only tanpa `.env`, tanpa jaringan, sebagai user tanpa hak.
- Larangan selama audit: membaca `.env`, menyentuh database atau produksi, menjalankan skrip project.

## Alur

1. **Rekonaisans** paralel: struktur, route, titik masuk input, autentikasi, unggahan, integrasi luar.
2. **Unit cakupan:** daftar area (mis. auth, API publik, unggahan, email, admin, webhook).
3. **Hunter** satu per area. Hasil ditulis ke berkas, bukan ke percakapan.
4. **Verifikasi:** setiap kandidat diperiksa agen yang berbeda. Bila koreksinya mengubah akar masalah, periksa lagi dengan agen ketiga.
5. **Gabungkan** kandidat kembar per akar masalah.
6. **Critic cakupan** antar gelombang: area apa yang belum diperiksa. Nyatakan terus terang bila cakupan masih sebagian.
7. **Cek mekanis:** nomor baris benar-benar ada, path relatif terhadap repo.

## Setelah audit

- Laporan tidak dipublikasikan dan tidak dimasukkan ke repo publik.
- Perbaikan dikerjakan terpisah: satu commit per perbaikan, dengan tes regresi yang gagal di kode lama.
- Setelah perbaikan, uji ulang perbaikan itu (re-hunt), karena perbaikan sendiri bisa tidak lengkap.

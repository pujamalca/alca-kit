---
name: gerbang-rilis
description: Urutan pemeriksaan (gate) sebelum push atau deploy ke produksi. Pakai saat diminta "pastikan siap produksi", "optimise", atau sebelum rilis aplikasi web.
---

# Gerbang rilis

Satu daftar gate, ditulis di satu berkas (skrip), dipakai oleh semua alur rilis. Berhenti di gate pertama yang gagal.

## Urutan

1. **Tipe dan gaya:** `tsc --noEmit` / `phpstan` / `go vet`, lalu lint/formatter dalam mode cek (`pint --test`, `eslint`, `gofmt -l`).
2. **Unit test.**
3. **Uji integrasi** dengan database uji. Hentikan worker latar dulu bila memakai database yang sama.
4. **Preflight project:** konstanta terlarang di kode, berkas rahasia tidak ter-commit, env wajib terisi.
5. **Audit dependensi:** `npm audit --omit=dev`, `composer audit`, `govulncheck`. Kritis ditutup; sisanya dicatat beserta alasan.
6. **Build produksi.** Baca peringatannya, jangan dilewati.
7. **Uji asap di browser:** halaman utama, satu halaman penting, login dengan sandi salah. Nol galat console dan nol pelanggaran CSP.

## Cek header

- Versi server dan framework tidak bocor (`server_tokens off`, `poweredByHeader: false`, `expose_php = Off`).
- Header keamanan dan CSP ada, masing-masing tepat satu kali.

## Jebakan

- Peringatan build yang sering diabaikan tapi penting, contohnya Next.js/Turbopack "Dynamic filesystem access causes tracing of the whole project": bundle membengkak; tandai path dinamis dengan komentar `turbopackIgnore`.
- Formatter dengan cache (mis. Pint) bisa lolos lokal tapi gagal di CI. Uji tanpa cache: `pint --test --cache-file=$(mktemp)`.
- CI yang merah berbulan-bulan sama dengan tidak punya CI. Perbaiki akar masalahnya (env CI, aset build yang tidak ada, tes tidak stabil), jangan dimatikan.

## Laporan akhir

Dua daftar: yang sudah beres, dan penghalang yang butuh pemilik (akses database, domain, SMTP, data uji yang tercampur dengan data nyata).

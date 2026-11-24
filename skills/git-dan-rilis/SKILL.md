---
name: git-dan-rilis
description: Alur commit, push, dan rilis ke produksi. Pakai setiap kali menyentuh repo git, dan wajib sebelum push ke cabang yang ter-deploy otomatis atau sebelum deploy ke produksi.
---

# Git dan rilis

## Commit

- Commit dan push hanya bila diminta. Pemilik biasanya bilang "commit dan push" di akhir rangkaian kerja.
- Satu commit per perbaikan atau fitur; tes ikut di commit yang sama.
- Pesan commit dalam bahasa project (di kit ini: Indonesia). Judul pendek; isi menjelaskan kenapa, plus bukti singkat (mis. "312 tes lulus").
- `git add` berkas secara eksplisit, bukan `git add -A`. Berkas tak terlacak yang bukan buatan sesi ini jangan disentuh atau ikut di-commit.
- Jangan commit `.env`, kredensial, folder output build, atau folder rahasia.
- Tanpa `--no-verify`: hook pra-commit/pra-push harus lolos.
- Tanpa amend, rebase, atau force-push pada riwayat yang sudah dibagikan.

## Cabang dan rilis

- Dua cabang: `dev` untuk kerja, `main`/`master` untuk produksi. Tidak ada commit langsung di cabang produksi.
- Naik ke produksi lewat fast-forward dari `dev`, hanya setelah pemilik mengetik persetujuan eksplisit di sesi itu.
- Bila memakai skrip `ship` (cek mutu + commit + push ke dev) dan `promote` (fast-forward ke produksi): skrip promote gagal-tertutup. Stdin non-interaktif berarti batal; flag "ya" hanya boleh datang dari manusia.
- Daftar cek mutu (gate) ditulis di satu berkas dan dipakai bersama oleh semua skrip. Jangan disalin.
- Push ke cabang yang ter-deploy otomatis sama dengan tayang. Tanyakan dulu.
- Deploy ke produksi adalah langkah terpisah dari push. Tanyakan dulu.

## Setelah rilis

- Tunggu deploy selesai, lalu cek:
  - commit yang terpasang di server sama dengan yang di-push;
  - endpoint health / halaman utama 200;
  - satu probe tanpa token ke endpoint terlindung harus 401/403;
  - `git status` di folder produksi bersih.
- Untuk rilis kreatif (video, desain): beri tag pada tiap hasil final dan catat di satu berkas riwayat (mis. `RENDERS.md`).
- Jangan klaim rilis selesai tanpa keluaran sukses dari skrip dan cek di atas.

## Rollback

- Sebelum deploy, catat commit yang sedang berjalan dan cadangkan artefak build yang tidak ada di git.
- Tulis perintah rollback di catatan rilis, bukan dicari saat panik.

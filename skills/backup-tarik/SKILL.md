---
name: backup-tarik
description: Cadangan otomatis server dan salinan ke mesin lain dengan model tarik (penerima yang mengambil). Pakai saat menyiapkan atau memeriksa backup server, database, atau unggahan.
---

# Backup model tarik

## Di server

- Skrip backup harian (systemd timer, `Persistent=true`): dump semua database, snapshot SQLite (`VACUUM INTO` + integrity check), berkas `.env`/rahasia, konfigurasi web server, sertifikat, VPN, firewall, unit systemd. Unggahan pengguna mingguan.
- Retensi di server pendek (mis. 14 hari harian, 28 hari mingguan). Folder backup `700`/`750`, karena berisi rahasia.
- Tulis penanda keberhasilan (mis. berkas `last-success`) supaya gagal diam-diam bisa terdeteksi.
- Uji pemulihan sungguhan sekali: restore ke database sementara, bandingkan jumlah tabel dan baris, lalu hapus.

## Salinan ke mesin lain (tarik)

- Mesin cadangan yang menarik dari server, supaya server yang dibobol tidak bisa menghapus salinan di mesin cadangan.
- Di server: user khusus, password terkunci, satu kunci di `authorized_keys` dengan `from="<IP penerima>",command="rrsync -ro <folder backup>",restrict`.
- Kunci ed25519 khusus untuk tugas ini. Yang dikirim antar pihak hanya `.pub`; fingerprint dicocokkan di kedua sisi.
- Uji dengan kunci: baca berhasil; tulis, shell, dan keluar folder ditolak.
- Di penerima: rsync tanpa `--delete`; retensi diatur di penerima (mis. harian 60 hari, mingguan 90 hari); folder `700` di disk terenkripsi.
- macOS: openrsync bawaan ditolak rrsync. Pakai rsync dari Homebrew. Job launchd hanya jalan selama akun login.

## Verifikasi rutin

- `gzip -t` pada berkas terbaru, laporkan nama folder dan ukurannya.
- Karena backup berisi rahasia, kehilangan mesin cadangan berarti rahasia dianggap bocor: rotasi.

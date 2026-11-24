---
name: terowongan-publik
description: Pola mempublikasikan layanan di komputer rumah/kantor lewat terowongan ke VPS dan nginx, serta cara mendiagnosis bila terowongan putus. Pakai saat membuka aplikasi lokal ke internet atau saat semua situs terowongan 502.
---

# Terowongan publik

## Pola

```
aplikasi (127.0.0.1:PORT) → klien terowongan → VPS (port terowongan) → nginx (TLS) → domain
```

- Aplikasi hanya listen di `127.0.0.1`. Yang publik hanya nginx di VPS.
- Port terowongan di VPS tidak dibuka di firewall; nginx mengaksesnya lewat localhost.
- Jalur klien → VPS dienkripsi (TLS dengan sertifikat yang benar, atau overlay WireGuard). TLS dengan sertifikat contoh bawaan proyek hanya melindungi dari penyadapan pasif.
- Port kontrol terowongan dibatasi ke antarmuka VPN bila semua klien sudah lewat VPN.
- Kunci klien tidak memakai karakter yang bisa merusak parser protokol (contoh nyata: `@` di kunci klien LANProxy membuat semua request macet).

## nginx untuk layanan terowongan

- `proxy_set_header Host` sesuai yang diharapkan aplikasi (beberapa aplikasi, mis. Ollama, menolak Host selain localhost).
- Unggahan besar: naikkan `client_max_body_size`, `client_body_timeout`, `proxy_read_timeout`; pertimbangkan `proxy_request_buffering off`.
- Rate limit login di nginx bila aplikasinya tidak punya.
- Panel admin terowongan tidak dibuka ke internet; bila perlu, tambah Basic Auth di depannya.

## Diagnosis "semua situs terowongan 502"

1. Cek dari VPS: `curl -sI http://127.0.0.1:<port>` dan dengan `-H "Host: domain"`. Bila keduanya gagal, masalah di sisi klien, bukan nginx.
2. Cek klien terowongan terhubung (koneksi ESTAB dari IP klien ke port kontrol).
3. ISP satelit/CGNAT: rute ke IP tertentu bisa rusak (SYN sampai ke VPS, balasan tidak sampai ke rumah; terlihat dengan `tcpdump`). Restart klien tidak menolong; reboot modem/dish yang menolong.
4. DNS router rumahan kadang `REFUSED`: arahkan klien ke DNS publik.
5. Setelah pulih, buktikan dengan HTTP 200 dari luar.

Perubahan konfigurasi VPS untuk diagnosis (log tambahan, header debug) dikembalikan setelah selesai.

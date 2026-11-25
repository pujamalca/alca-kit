---
name: profil-merek
description: Template profil merek per usaha (gaya bahasa, warna, musik, larangan klaim, riwayat konten) agar konten konsisten dan tidak berulang. Pakai saat membuat konten pertama untuk sebuah usaha, atau sebelum setiap konten baru untuk usaha itu.
---

# Profil merek

Satu berkas per usaha, disimpan privat di project (bukan di kit publik), misalnya `merek/<nama-usaha>.md`.

## Template

```markdown
# <Nama usaha>

## Ringkas
Usaha apa, untuk siapa, di mana.

## Ajakan utama
Apa yang diminta dari penonton (pesan lewat WhatsApp, kunjungi toko, ...).

## Gaya bahasa
Sapaan (kak / Anda / kamu), tingkat formal, kata yang dipakai dan dihindari.

## Rupa
- Warna (diambil dari piksel logo, bukan ditebak): #...
- Huruf:
- Logo: letak dan ukuran minimal

## Musik
Suasana, tempo, lisensi.

## Larangan
Klaim yang tidak boleh dibuat, kompetitor yang tidak boleh disebut, topik sensitif.

## Riwayat konten
| Tanggal | Judul/kait | Gaya | Musik | Tautan |
```

## Aturan

- Warna diambil dari piksel logo asli.
- Hex di profil ini satu-satunya sumber warna merek. Token video dan token situs disalin dari sini, supaya keduanya sama.
- Jangan mengulang gaya, kait, atau lagu dari konten terakhir usaha yang sama.
- Konten satu klien tidak boleh menyerupai klien lain di sektor yang sama.
- Kontak dan detail nyata usaha hanya di berkas privat.

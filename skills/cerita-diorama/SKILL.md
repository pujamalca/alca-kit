---
name: cerita-diorama
description: Membuat video cerita bertokoh di dunia 3D/diorama dari kode (Three.js atau sejenisnya): shot, kamera, gerak, bunyi, dan kerumunan. Pakai saat video punya tokoh, latar, dan alur cerita, bukan sekadar motion graphic.
---

# Cerita diorama

Melengkapi skill `animasi-video` (determinisme dan render tetap berlaku).

## Shot

- Pecah setiap adegan menjadi shot berurutan: tempat (establishing) → orang → wajah atau benda penting.
- Satu shot satu informasi. Durasi shot mengikuti kalimat narasi, bukan angka tetap.

## Kamera

- Perlakukan kamera seperti lensa sungguhan: tentukan fov, lalu hitung jarak dari tinggi bingkai yang diinginkan (`jarak = (tinggi / 2) / tan(fov / 2)`).
- Gerak kamera halus (easing), tidak berpindah mendadak kecuali memang potongan (cut).
- POV orang pertama: tempelkan tangan/senjata ke kamera, pakai near plane kecil supaya tidak terpotong.

## Gerak dan fisika

- Gerak dari data (keyframe, kurva, simulasi deterministik), bukan diatur tangan per frame.
- Benda tidak saling tembus; tokoh menapak tanah (titik tapak tetap), tidak melayang.
- Kecepatan langkah sesuai animasi kaki: tubuh yang meluncur lebih cepat dari langkahnya terlihat melayang.
- Kejadian punya reaksi: jatuh, kaget, menang, mundur saat terkena.

## Bunyi

- Bunyi berasal dari kejadian di timeline (langkah, benturan, pintu), bukan ditaruh terpisah.

## Kerumunan

- Banyak objek sama: instancing. Posisi dan fase gerak tiap anggota adalah fungsi `(indeks, t)`, sehingga tetap deterministik.

## Aset

- Pakai aset buatan sendiri atau berlisensi jelas. Tokoh/maskot milik merek lain tidak dipakai, dan aset berbayar tidak ikut dipublikasikan di repo.

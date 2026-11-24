---
name: ai-lokal
description: Memakai LLM dan embedding lokal lewat Ollama (terutama di Mac Apple Silicon), termasuk jebakan model berpikir, JSON, evaluasi, dan upgrade. Pakai saat project memanggil model lokal atau saat mengganti model/versi Ollama.
---

# AI lokal dengan Ollama

## Memanggil model

- Pakai `/api/chat`, bukan `/api/generate`.
- Model yang "berpikir" (mis. qwen3, gemma dengan mode thinking) bisa menghabiskan jatah token di tahap berpikir: respons kosong dengan `done_reason: "length"`. Kirim `think: false` kecuali penalaran memang dibutuhkan.
- Model MLX menolak `format: "json"` (501). Minta JSON lewat prompt, lalu pungut dari teks: buang pagar ```` ```json ```` dan blok `<think>`, validasi, ulangi bila gagal.
- Batasi `num_predict` dan beri timeout di klien.

## Mengekspos ke luar

- Ollama listen di `127.0.0.1`. Akses dari luar lewat gerbang (reverse proxy) dengan API key dan daftar putih endpoint (`/api/chat`, `/api/embed`, `/v1/chat/completions`, ...). Endpoint seperti `/api/delete` dan `/api/pull` tidak dibuka.
- Ollama menolak header Host selain localhost (proteksi DNS rebinding): proxy harus mengirim `Host: localhost`.
- Terima `Authorization: Bearer` selain header khusus, supaya klien gaya OpenAI bisa dipakai.
- Satu kunci bersama untuk semua konsumen tidak bisa dicabut per konsumen. Bila perlu, buat kunci per konsumen.

## Evaluasi dan ganti model

- Uji pembanding: `temperature: 0` + `seed` tetap; catat token/detik dan `done_reason`.
- Ganti model atau versi hanya setelah uji A-B pada tugas nyata. Skor bisa naik-turun ±3 poin antar uji, jadi ulangi minimal dua kali.
- Jangan jalankan batch atau eval berat saat model sedang melayani produksi.

## Upgrade Ollama

- Sebelum: cadangkan biner lama, catat env (`OLLAMA_FLASH_ATTENTION`, `OLLAMA_KV_CACHE_TYPE`, `OLLAMA_KEEP_ALIVE`), ingat label layanan Homebrew bisa berganti.
- Sesudah: uji jawaban model produksi (bandingkan sebelum/sesudah), cek embedding, cek gerbang dari luar.

## Fine-tuning

- Mac: MLX-LM untuk LoRA. GPU NVIDIA: Unsloth atau vLLM.

## Privasi

- Data pasien/klien yang diproses model lokal tetap tidak dikirim ke layanan cloud, dan hasil eval yang memuat data nyata tidak dipublikasikan.

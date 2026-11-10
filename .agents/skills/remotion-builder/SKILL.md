---
name: remotion-builder
description: Programmatic video production engine using React and Remotion. Use this skill whenever the user asks to generate, preview, edit, or render programmatic MP4 videos, animated title cards, or social media reels.
---

# Remotion Video Production Guide

Anda adalah Senior Creative Technologist spesialis pembuatan video berbasis program dengan **React** dan **Remotion**.

## Core Constraints & Best Practices
1. **Frame-Based Architecture**:
   - Selalu gunakan `const frame = useCurrentFrame()` dan `const { fps, durationInFrames, width, height } = useVideoConfig()`.
   - Gunakan `interpolate(frame, [start, end], [from, to], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })` untuk transisi halus.
   - Gunakan `spring({ frame, fps, config: { damping, stiffness, mass } })` untuk pergerakan alami.
   - **Dilarang** menggunakan CSS transitions (`transition: all 0.3s`) atau `setTimeout`/`setInterval`.

2. **Bang Motion Design Laws (Anti-PPT)**:
   - Terapkan pedoman desain dari skill `bang-motion` (`.agents/skills/bang-motion/references/anti-ppt.md`).
   - **Satu shot = satu pernyataan** (maksimal ≤ 5 kata per shot). Hindari tampilan slide/bullet points PPT.
   - **Hirarki Perhatian**: Kalimat utama → objek visual / metric → detail pendukung.
   - **Kedalaman Multi-layer**: Gunakan komponen latar hidup (`GrainyBackground`, animated mesh, horizon glow).
   - **Kamera Bernapas**: Terapkan sedikit dorongan skala kamera (`0.95 -> 1.04`) agar video dinamis dan tidak kaku.

3. **Asset Handling**:
   - Gunakan `staticFile('nama-file.ext')` untuk membaca aset lokal dari `remotion/public/`.

4. **Eksekusi Prosedural**:
   - **Langkah 1**: Edit atau buat komponen di `remotion/src/components/`.
   - **Langkah 2**: Daftarkan komposisi di `remotion/src/Root.tsx`.
   - **Langkah 3**: Jalankan verifikasi tipe: `npm run check`.
   - **Langkah 4**: Uji komposisi tanpa render: `npm run test:composition <CompositionId>`.
   - **Langkah 5**: Render video ke MP4:
     ```bash
     # Jika tanpa props kustom:
     npm run render <CompositionId> out/output.mp4

     # Jika menggunakan file props JSON:
     npm run render <CompositionId> out/output.mp4 props.json
     ```

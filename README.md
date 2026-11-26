# Raya’s Arcade

Jalankan `npm install` lalu `npm run dev` untuk membuka pratinjau lokal. Gunakan `npm run build` untuk membuat versi produksi di folder `dist`.

## Ganti PNG Sonic dan Emma

Ganti `public/characters/sonic.png` dan `public/characters/emma-meyers.png` dengan PNG transparan milikmu. Pertahankan nama file dan huruf kecilnya. Ikon pertama menghiasi sudut kiri bawah Birthday Quest dan ikon kedua menghiasi sudut kanan bawah. Ketuk ikon untuk memainkan animasinya. Gambar pengganti otomatis mengikuti ukuran ikon.

## Tambahkan lagu dari Spotify

1. Buka lagu di Spotify. Pilih **⋯ → Bagikan → Salin tautan lagu**.
2. Buka `src/data/scrapbook.js`. Di dalam daftar `songs`, salin salah satu entri lalu tempel tepat sebelum tanda `]` penutup daftar.
3. Ganti `title`, `artist`, dan `spotifyUrl`. Tautan lagu berbentuk `https://open.spotify.com/track/…`. Bagian `?si=…` boleh ikut ditempel.
4. Isi `note` dengan alasan personal kamu. Misalnya, “Bagian pianonya bikin aku ingat sore waktu kita berteduh dan kamu nyanyi pelan.”
5. Simpan file dan buka layar **Soundtrack kamu**. Arahkan kursor ke baris lagu atau fokuskan dengan Tab untuk menampilkan pesannya di catatan. Ketuk lagunya untuk memilih pesan dan meminta Spotify memutar lagu.

Jika perangkat meminta satu ketukan lagi, tekan **Play** di pemutar Spotify yang muncul di bawah kartu. Musik latar arcade dijeda selama layar playlist terbuka. Jika Spotify tidak bisa dimuat, **Buka Spotify** mengarah langsung ke lagu.

Ucapan, fun fact, dan isi galeri juga bisa diganti di `src/data/scrapbook.js`. Foto galeri disimpan di `public/images`.

# Raya’s Arcade

Jalankan `npm install` lalu `npm run dev` untuk membuka pratinjau lokal. Gunakan `npm run build` untuk membuat versi produksi di folder `dist`.

## Ganti PNG Sonic dan Emma

Ganti `public/characters/sonic.png` dan `public/characters/emma-meyers.png` dengan gambarmu. Pertahankan nama file dan huruf kecilnya. PNG transparan dengan ruang kosong tipis di sekeliling karakter akan terlihat paling rapi. Kedua gambar muncul berdampingan di layar ucapan dan otomatis menyesuaikan ukuran tanpa terpotong.

## Tambahkan lagu dari Spotify

1. Buka lagu di Spotify. Pilih **⋯ → Bagikan → Salin tautan lagu**.
2. Buka `src/data/scrapbook.js`. Di dalam daftar `songs`, salin salah satu entri lalu tempel tepat sebelum tanda `]` penutup daftar.
3. Ganti `title`, `artist`, dan `spotifyUrl`. Tautan lagu berbentuk `https://open.spotify.com/track/…`. Bagian `?si=…` boleh ikut ditempel.
4. Isi `note` dengan alasan personal kamu. Misalnya, “Bagian pianonya bikin aku ingat sore waktu kita berteduh dan kamu nyanyi pelan.”
5. Simpan file dan buka layar **Soundtrack kamu**. Arahkan kursor atau fokuskan kartu dengan Tab untuk melihat pesan. Ketuk kartu di HP untuk membuka pesan dan meminta Spotify memutar lagunya.

Jika perangkat meminta satu ketukan lagi, tekan **Play** di pemutar Spotify yang muncul di bawah kartu. Musik latar arcade dijeda selama layar playlist terbuka. Jika Spotify tidak bisa dimuat, **Buka Spotify** mengarah langsung ke lagu.

Ucapan, fun fact, dan isi galeri juga bisa diganti di `src/data/scrapbook.js`. Foto galeri disimpan di `public/images`.

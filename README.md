# Raya’s Arcade

Run `npm install` and then `npm run dev` for a local preview. Use `npm run build` to create the production build in `dist`.

## Replace the pixel stickers

The blue hedgehog is on the bottom left and Emma is on the bottom right. Replace `public/characters/sonic.png` or `public/characters/emma-meyers.png` with a transparent PNG. Keep the filenames to preserve the placement and tap animation.

## Add a Spotify track

1. In Spotify, open the track and choose **⋯ → Share → Copy Song Link**.
2. Duplicate an entry in the `songs` array in `src/data/scrapbook.js`.
3. Update `title`, `artist`, and `spotifyUrl`. Use the track URL copied from Spotify.
4. Fill in `note` with why the song reminds you of Raya.
5. Open **Your soundtrack**. Hover or focus a track to read its note, or tap it to play.

If playback needs another tap, press **Play** directly in the Spotify player. **Open in Spotify** opens the track externally.

Edit the letter, facts, gallery captions, and five bottle wishes in `src/data/scrapbook.js`. Gallery photos live in `public/images`.

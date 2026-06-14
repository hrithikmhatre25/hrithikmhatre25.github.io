# Our Little Sunset World 🌅🐾

## Files
- `index.html` — page structure and content
- `style.css` — all styling (pink sunset / cats / dogs / flowers theme)
- `script.js` — auto-builds the video & gallery carousels + falling flowers/emoji animation
- `gallery/` — put your photos here
- `videos/` — put your video files here
- `generate-lists.js` — run this to auto-detect everything in those folders

## How to fill it in

### 1. Members photos
In `index.html`, Members section, for each of the 4 members replace:
- `PASTE_PHOTO_LINK_1_HERE` (and `_2_`, `_3_`, `_4_`) with the image URL or path.
- `NAME_1_HERE` (and `_2_`, `_3_`, `_4_`) with the person's name.

### 2. Messages (scrollable boxes)
Replace `PASTE_MESSAGE_FROM_HRITHIK_TO_KRISHA_HERE` and
`PASTE_MESSAGE_FROM_KRISHA_TO_HRITHIK_HERE` with the actual messages.
The box scrolls automatically if the message is long.

### 3. Gallery & Videos — fully automatic 🎉

You do **not** need to write any HTML for individual photos or videos.

1. Drop your photo files into the `gallery/` folder, and your video files into
   the `videos/` folder (any number — 3 or 300, doesn't matter).
2. Run this once from the project folder (requires [Node.js](https://nodejs.org)):

   ```
   node generate-lists.js
   ```

   This scans both folders and writes `gallery/gallery.json` and
   `videos/videos.json` — simple lists of filenames.
3. Commit and push everything (photos, videos, and the two updated `.json`
   files) to GitHub.

The website reads those `.json` files and automatically builds the carousel
slides — one photo/video shown at a time, with left/right arrows and a
counter (e.g. "3 / 120").

**Re-run `node generate-lists.js`** any time you add or remove files, then
commit again.

> No Node.js available? You can also edit `gallery/gallery.json` and
> `videos/videos.json` by hand — they're just plain arrays of filenames:
> ```json
> ["photo1.jpg", "photo2.jpg", "photo3.jpg"]
> ```

## Enable GitHub Pages

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Source**, select the branch (e.g. `main`) and root folder.
4. Save — your site will be live at `https://<username>.github.io/<repo-name>/`.

#!/usr/bin/env node
/**
 * generate-lists.js
 *
 * Scans the /gallery and /videos folders and writes gallery.json /
 * videos.json containing the filenames found inside, so the website
 * carousels can load them automatically.
 *
 * Usage:
 *   node generate-lists.js
 *
 * Run this any time you add or remove photos/videos, then commit +
 * push the updated .json files along with your new media files.
 */

const fs = require('fs');
const path = require('path');

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'];
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov', '.m4v'];

function generateList(folder, extensions, outputFile) {
  const folderPath = path.join(__dirname, folder);

  if (!fs.existsSync(folderPath)) {
    console.warn(`Folder "${folder}" not found, skipping.`);
    return;
  }

  const files = fs
    .readdirSync(folderPath)
    .filter((file) => extensions.includes(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const outputPath = path.join(folderPath, outputFile);
  fs.writeFileSync(outputPath, JSON.stringify(files, null, 2) + '\n');

  console.log(`Wrote ${files.length} file(s) to ${folder}/${outputFile}`);
}

generateList('gallery', IMAGE_EXTENSIONS, 'gallery.json');
generateList('videos', VIDEO_EXTENSIONS, 'videos.json');

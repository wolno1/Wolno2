'use strict';

const fs = require('fs');
const path = require('path');

global.window = {};
require(path.join(__dirname, 'data', 'notebook-data.js'));

const outputDirectory = path.join(__dirname, '..', 'pages', 'notebook-share');
fs.mkdirSync(outputDirectory, { recursive: true });

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

window.notebookEntries.forEach((entry) => {
    const id = encodeURIComponent(entry.id);
    const artist = escapeHtml(entry.artist);
    const characters = escapeHtml(entry.characters.join(', '));
    const description = escapeHtml(entry.description || `A drawing by ${entry.artist}.`);
    const shareUrl = `https://wolno.art/pages/notebook-share/${id}.html`;
    const notebookUrl = `../notebook.html?drawing=${id}`;
    const previewUrl = `https://wolno.art/assets/images/notebook/previews/${id}.jpg`;
    const title = `${characters} by ${artist} | The Notebook`;
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="${shareUrl}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Wolno">
    <meta property="og:url" content="${shareUrl}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${previewUrl}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="${characters}, drawn by ${artist}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${previewUrl}">
    <meta http-equiv="refresh" content="0; url=${notebookUrl}">
    <script>window.location.replace(${JSON.stringify(notebookUrl)});<\/script>
</head>
<body>
    <p>Opening <a href="${notebookUrl}">${characters} by ${artist} in The Notebook</a>…</p>
</body>
</html>`;
    fs.writeFileSync(path.join(outputDirectory, `${entry.id}.html`), html);
});

console.log(`Generated ${window.notebookEntries.length} notebook share pages.`);

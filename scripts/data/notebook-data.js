'use strict';

// EDIT THIS FILE. Dates use YYYY-MM-DD; dated entries sort newest first.
// Social example: [{ label: '@handle', url: 'https://...' }]
window.notebookEntries = [
  ['aleszka','Aleszka.png','3630 × 4968 px'], ['cilward','Cilward.png','1220 × 1620 px'],
  ['frontman-x','FrontmanX.png','4609 × 5753 px'], ['jang-1','Jang1.png','1100 × 1700 px'],
  ['jang-2','Jang2.png','3966 × 5364 px'], ['lunna','Lunna.png','4404 × 5148 px'],
  ['malengil','Malengil.png','3756 × 4530 px'], ['miokagv','Miokagv.png','4296 × 5952 px'],
  ['not-your-rott','NotYourRott.png','3825 × 5175 px'], ['pompis-dulces','PompisDulces.png','4572 × 4698 px'],
  ['taxie-1','Taxie1.png','4788 × 4608 px'], ['taxie-2','Taxie2.png','2361 × 1470 px'],
  ['taxie-3','Taxie3.png','1770 × 2515 px'], ['trazh','Trazh.png','3630 × 5016 px']
].map(([id, image, dimensions]) => ({
  id, artist: 'ARTIST TO EDIT', date: '', socials: [],
  characters: ['CHARACTERS TO EDIT'], description: 'DESCRIPTION TO EDIT (optional)', image, dimensions
})).map((entry) => entry.id === 'frontman-x' ? {
  ...entry,
  artist: 'FrontX',
  date: '2026-04-15',
  socials: [
    { label: 'Twitter / X', url: 'https://x.com/Frontman_X' },
    { label: 'Bluesky', url: 'https://bsky.app/profile/frontmanx.bsky.social' },
    { label: 'Tumblr', url: 'https://frontmanx.tumblr.com' },
    { label: 'Newgrounds', url: 'https://s-neira.newgrounds.com' }
  ],
  characters: ['Inu'],
  description: 'Made by my amazing friend FrontX, he mailed me this drawing from so far away!'
} : entry);

window.notebookEntries = window.notebookEntries.map((entry) => entry.id === 'cilward' ? {
  ...entry,
  artist: 'Cilward',
  date: '2026-07-04',
  socials: [
    { label: 'Instagram', url: 'https://www.instagram.com/Cilward' },
    { label: 'Facebook', url: 'https://www.facebook.com/CilWard/' },
    { label: 'Twitter / X', url: 'https://x.com/CilWard' },
    { label: 'Tumblr', url: 'https://www.tumblr.com/cilward-uwu-blog' }
  ],
  characters: ['Inu'],
  description: 'Commission I got at Furregios 2026!'
} : entry);

const additionalNotebookData = {
  'aleszka': {
    artist: 'Aleszka', date: '2026-07-04', characters: ['Inu'],
    socials: [
      { label: 'Twitter / X', url: 'https://x.com/aleszka_zz' },
      { label: 'Instagram', url: 'https://www.instagram.com/al3szana/' }
    ], description: 'Commission I got at Furregios 2026!'
  },
  'jang-1': {
    artist: 'Dreamknight JANG', date: '2025-03-09', characters: ['Inu'],
    socials: [
      { label: 'Twitter / X', url: 'https://x.com/sketchesJang' },
      { label: 'Instagram', url: 'https://www.instagram.com/sketchesjang/' },
      { label: 'Newgrounds', url: 'https://sketchesjang.newgrounds.com' }
    ], description: 'Commission I got at Expofur 2025!'
  },
  'jang-2': {
    artist: 'Dreamknight JANG', date: '2026-02-21', characters: ['Inu'],
    socials: [
      { label: 'Twitter / X', url: 'https://x.com/sketchesJang' },
      { label: 'Instagram', url: 'https://www.instagram.com/sketchesjang/' },
      { label: 'Newgrounds', url: 'https://sketchesjang.newgrounds.com' }
    ], description: 'Commission I got at Furregios 2026!'
  },
  'lunna': {
    artist: 'Lunna Howell', date: '2026-03-22', characters: ['Inu'],
    socials: [
      { label: 'Twitter / X', url: 'https://x.com/LunnaHowell' },
      { label: 'Instagram', url: 'https://www.instagram.com/lunnahowell/' },
      { label: 'Facebook', url: 'https://www.facebook.com/lunnahowell/' }
    ], description: 'Commission I got at LaConve 2026'
  },
  'malengil': {
    artist: 'Malengil', date: '2026-07-04', characters: ['Inu'],
    socials: [
      { label: 'Twitter / X', url: 'https://x.com/malengil' },
      { label: 'Facebook', url: 'https://www.facebook.com/Malengilblog' },
      { label: 'Instagram', url: 'https://www.instagram.com/malengil' },
      { label: 'FurAffinity', url: 'https://www.furaffinity.net/user/malengil/' }
    ], description: 'Commission I got at Furregios 2026!'
  },
  'miokagv': {
    artist: 'Miokagv', date: '2026-07-04', characters: ['Inu'],
    socials: [
      { label: 'Facebook', url: 'https://www.facebook.com/MiokaGV/' },
      { label: 'Instagram', url: 'https://www.instagram.com/miokagv/' },
      { label: 'Twitter', url: 'https://x.com/miokagv' }
    ], description: 'Commission I got at Furregios 2026!'
  },
  'not-your-rott': {
    artist: 'KBell Rott', date: '2026-07-04', characters: ['Inu'],
    socials: [
      { label: 'X / Twitter', url: 'https://x.com/NotYourRott' },
      { label: 'Instagram', url: 'https://www.instagram.com/notyourrott/' }
    ], description: 'Commission I got at Furregios 2026!'
  },
  'pompis-dulces': {
    artist: 'Pompis Dulces', date: '2026-07-04', characters: ['Inu'],
    socials: [{ label: 'Instagram', url: 'https://www.instagram.com/pompis_dulces/' }],
    description: 'Commission I got at Furregios 2026!'
  },
  'taxie-1': {
    artist: 'Taxaxe', date: '2025-10-24', characters: ['Inu'],
    socials: [{ label: 'Instagram', url: 'https://www.instagram.com/taxaxe/' }],
    description: 'Gift from the BEST artist I love Taxie'
  },
  'taxie-2': {
    artist: 'Taxaxe', date: '2025-10-24', characters: ['Inu'],
    socials: [{ label: 'Instagram', url: 'https://www.instagram.com/taxaxe/' }],
    description: 'Gift from the BEST artist I love Taxie part 2'
  },
  'taxie-3': {
    artist: 'Taxaxe', date: '2026-06-30', characters: ['Inu'],
    socials: [{ label: 'Instagram', url: 'https://www.instagram.com/taxaxe/' }],
    description: 'MORE gift from the BEST Taxie <3'
  },
  'trazh': {
    artist: 'Gloomytrazh', date: '2026-07-04', characters: ['Inu'],
    socials: [
      { label: 'Instagram', url: 'https://www.instagram.com/gloomytrazh/' },
      { label: 'Twitter / X', url: 'https://x.com/gloomytrazh' },
      { label: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61591693226440' },
      { label: 'Reddit', url: 'https://www.reddit.com/user/gloomytrazh/' },
      { label: 'DeviantArt', url: 'https://www.deviantart.com/em0trazh' },
      { label: 'FurAffinity', url: 'https://www.furaffinity.net/user/em0trazh' },
      { label: 'Bluesky', url: 'https://bsky.app/profile/trazh.bsky.social' }
    ], description: 'Commission I got at Furregios 2026!'
  }
};

window.notebookEntries = window.notebookEntries.map((entry) => ({
  ...entry,
  ...(additionalNotebookData[entry.id] || {})
}));

window.notebookEntries.push({
  id: 'haizara', image: 'Haizara.png', dimensions: '1280 × 2094 px',
  artist: 'Arkitect Haizara', date: '2025-05-24', characters: ['Abigail'],
  socials: [
    { label: 'Instagram', url: 'https://www.instagram.com/arkitecthaizara/' },
    { label: 'Tumblr', url: 'https://www.tumblr.com/arkitecthaizara' },
    { label: 'Bluesky', url: 'https://bsky.app/profile/arkitecthaizara.bsky.social' }
  ],
  description: 'Commission I got at Oops con 2025!'
});

window.notebookEntries.push({
  id: 'sonokido', image: 'Sonokido.png', dimensions: '2260 × 2812 px',
  artist: 'Sonokido', date: '2026-07-03', characters: ['Inu'],
  socials: [
    { label: 'Twitter / X', url: 'https://x.com/sonokido' },
    { label: 'Instagram', url: 'https://www.instagram.com/sonokido/' },
    { label: 'Bluesky', url: 'https://www.furaffinity.net/user/sonokido' },
    { label: 'FurAffinity', url: 'https://www.furaffinity.net/user/sonokido' }
  ],
  description: 'Counterattack I got from Sonokido in Artfight 2026!'
});

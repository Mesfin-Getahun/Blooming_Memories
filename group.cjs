const fs = require('fs');

const distDir = 'dist/memories';
let files;
try {
  files = fs.readdirSync(distDir);
} catch (e) {
  console.error("error reading dist/memories");
  process.exit(1);
}

const groups = {};
let mixed = [];

for (const f of files) {
  if (f === "PUT-YOUR-PHOTOS-HERE.txt") continue;
  
  if (f.startsWith('IMG_')) {
    // IMG_20260103_...
    const match = f.match(/^IMG_(\d{8})/);
    if (match) {
      const date = match[1];
      groups[date] = groups[date] || [];
      groups[date].push(f);
    } else {
      mixed.push(f);
    }
  } else if (f.startsWith('photo_')) {
    // photo_1_2026-04-07_21-26-29.jpg
    const match = f.match(/(\d{4}-\d{2}-\d{2})/);
    if (match) {
      const date = match[1];
      groups[date] = groups[date] || [];
      groups[date].push(f);
    } else {
      mixed.push(f);
    }
  } else if (f.startsWith('Screenshot_')) {
    // Screenshot_20251109-210126.jpg
    const match = f.match(/^Screenshot_(\d{8})/);
    if (match) {
      const date = match[1];
      groups[date] = groups[date] || [];
      groups[date].push(f);
    } else {
      mixed.push(f);
    }
  } else if (f.startsWith('Snapchat')) {
    groups['Snapchat'] = groups['Snapchat'] || [];
    groups['Snapchat'].push(f);
  } else {
    mixed.push(f);
  }
}

// Convert to the JS Array structure
const result = [];
// Create friendly titles from dates etc
for (const [key, imgs] of Object.entries(groups)) {
    result.push({
        title: key === 'Snapchat' ? 'Snapchat Memories' : `Moment on ${key}`,
        description: 'Captured together in perfect sync.',
        category: 'Memories',
        urls: imgs.map(i => `/memories/${i}`)
    });
}
if (mixed.length > 0) {
    result.push({
        title: 'Mixed Memories',
        description: 'Random moments that bring a smile.',
        category: 'Mixed',
        urls: mixed.map(i => `/memories/${i}`)
    });
}

console.log(JSON.stringify(result, null, 2));

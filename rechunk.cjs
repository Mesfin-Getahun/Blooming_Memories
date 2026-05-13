const fs = require('fs');

const path = 'src/pages/FullGallery.tsx';
let content = fs.readFileSync(path, 'utf8');

const regex = /const fullGalleryImages = (\[[\s\S]*?\]);\n\nconst FullGallery/m;
const match = content.match(regex);
if (!match) { throw new Error('Could not find array'); }

const arrayString = match[1];
const fullGalleryImages = eval('(' + arrayString + ')');

const chunked = [];
let partCounter = 1;

for (const group of fullGalleryImages) {
    if (group.urls.length > 9) {
        // chunk this down
        const chunkSize = 9;
        let p = 1;
        for (let i = 0; i < group.urls.length; i += chunkSize) {
            const chunkUrls = group.urls.slice(i, i + chunkSize);
            chunked.push({
                title: group.title + ' (Part ' + p + ')',
                description: group.description,
                category: group.category,
                urls: chunkUrls
            });
            p++;
        }
    } else {
        chunked.push(group);
    }
}

// Convert back to string and inject
const newArrayString = JSON.stringify(chunked, null, 2);
content = content.replace(regex, 'const fullGalleryImages = ' + newArrayString + ';\n\nconst FullGallery');

fs.writeFileSync(path, content, 'utf8');
console.log('Re-chunked gallery images! Total cards is now:', chunked.length);

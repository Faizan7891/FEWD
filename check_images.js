import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function checkImages() {
    const productsPath = path.join(__dirname, 'src/data/products.js');
    const content = fs.readFileSync(productsPath, 'utf-8');
    
    // Extract URLs
    const regex = /"https:\/\/images\.unsplash\.com\/photo-[^"]+"/g;
    const urls = content.match(regex).map(s => s.replace(/"/g, ''));
    
    console.log(`Checking ${urls.length} images...`);
    
    for (const url of urls) {
        try {
            const res = await fetch(url, { method: 'HEAD' });
            if (res.status !== 200) {
                console.log(`BROKEN: ${url} (Status: ${res.status})`);
            }
        } catch (e) {
            console.log(`ERROR: ${url} - ${e.message}`);
        }
    }
    console.log("Done checking.");
}

checkImages();

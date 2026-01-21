
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DOMAIN = 'https://excel-clean.vercel.app';

const routes = [
    '/',
    '/remove-blank-rows-excel',
    '/fix-excel-date-format',
    '/trim-excel-whitespace',
    '/clean-csv-online'
];

const generateSitemap = () => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
            .map((route) => {
                return `
  <url>
    <loc>${DOMAIN}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
            })
            .join('')}
</urlset>`;

    const distPath = path.resolve(__dirname, '../dist/sitemap.xml');
    const publicPath = path.resolve(__dirname, '../public/sitemap.xml');

    // Write to public for dev and dist for prod
    try {
        // Ensure public dir exists
        if (!fs.existsSync(path.resolve(__dirname, '../public'))) {
            fs.mkdirSync(path.resolve(__dirname, '../public'));
        }

        fs.writeFileSync(publicPath, sitemap);
        console.log('✅ Sitemap generated in public/');
    } catch (e) {
        console.error('Error writing sitemap to public:', e);
    }
};

generateSitemap();

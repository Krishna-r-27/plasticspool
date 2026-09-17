import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { publicRoutes, SITE_URL } from "../src/seo/publicRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.resolve(rootDir, "public");
const distDir = path.resolve(rootDir, "dist");

// 1. Generate sitemap.xml content
const sitemapRoutes = publicRoutes.filter(r => r.sitemap);
const today = new Date().toISOString().split("T")[0];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes.map(r => `  <url>
    <loc>${SITE_URL}${r.path === "/" ? "" : r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq || "weekly"}</changefreq>
    <priority>${r.priority !== undefined ? r.priority.toFixed(1) : "0.8"}</priority>
  </url>`).join("\n")}
</urlset>
`;

// 2. Generate robots.txt
const robotsTxt = `User-agent: *
Allow: /
Disallow: /poweradmin/
Disallow: /poweradmin/*

Sitemap: ${SITE_URL}/sitemap.xml
`;

// 3. Generate seo-routes.json (for server/catalog lookups)
const seoRoutesJson = JSON.stringify(publicRoutes, null, 2);

function ensureDirAndWrite(filePath, content) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Generated: ${filePath}`);
}

// Write to public/ directory
ensureDirAndWrite(path.join(publicDir, "sitemap.xml"), sitemapXml);
ensureDirAndWrite(path.join(publicDir, "robots.txt"), robotsTxt);
ensureDirAndWrite(path.join(publicDir, "seo-routes.json"), seoRoutesJson);

// Write to dist/ directory if dist exists
if (fs.existsSync(distDir)) {
    ensureDirAndWrite(path.join(distDir, "sitemap.xml"), sitemapXml);
    ensureDirAndWrite(path.join(distDir, "robots.txt"), robotsTxt);
    ensureDirAndWrite(path.join(distDir, "seo-routes.json"), seoRoutesJson);
}

console.log("Sitemap, robots.txt, and seo-routes.json generated successfully.");

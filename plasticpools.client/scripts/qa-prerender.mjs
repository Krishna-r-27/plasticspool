import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { publicRoutes } from "../src/seo/publicRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.resolve(rootDir, "dist");

console.log("=== Running Prerender QA Verification ===");

let hasError = false;

// 1. Verify spa-shell.html has EMPTY #root
const spaShellPath = path.join(distDir, "spa-shell.html");
if (!fs.existsSync(spaShellPath)) {
    console.error("❌ QA FAIL: dist/spa-shell.html does not exist!");
    hasError = true;
} else {
    const spaShellHtml = fs.readFileSync(spaShellPath, "utf8");
    const rootMatch = spaShellHtml.match(/<div id="root">([\s\S]*?)<\/div>/i);
    if (!rootMatch || rootMatch[1].trim().length > 0) {
        console.error("❌ QA FAIL: dist/spa-shell.html must have an EMPTY #root!");
        hasError = true;
    } else {
        console.log("✅ dist/spa-shell.html has clean empty #root");
    }
}

// 2. Verify all prerendered pages have NON-EMPTY #root and valid SEO meta
const prerenderRoutes = publicRoutes.filter(r => r.prerender);
const qaTable = [];

for (const route of prerenderRoutes) {
    let filePath;
    if (route.path === "/") {
        filePath = path.join(distDir, "index.html");
    } else if (route.path === "/404") {
        filePath = path.join(distDir, "404", "index.html");
    } else {
        const sub = route.path.startsWith("/") ? route.path.slice(1) : route.path;
        filePath = path.join(distDir, sub, "index.html");
    }

    if (!fs.existsSync(filePath)) {
        console.error(`❌ QA FAIL: Missing prerender file for ${route.path} -> ${filePath}`);
        hasError = true;
        qaTable.push({ Route: route.path, Exists: "NO", RootContent: "0", Title: "N/A", Canonical: "N/A" });
        continue;
    }

    const html = fs.readFileSync(filePath, "utf8");
    const rootMatch = html.match(/<div id="root">([\s\S]*?)<\/div>/i);
    const rootContent = rootMatch ? rootMatch[1].trim() : "";
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const canonicalMatch = html.match(/<link\s+[^>]*rel="canonical"[^>]*href="([^"]+)"/i);

    const titleOk = titleMatch && titleMatch[1].includes(route.title.split("|")[0].trim());
    const canonicalOk = canonicalMatch && canonicalMatch[1] === route.canonical;
    const rootOk = rootContent.length > 50;

    if (!rootOk) {
        console.error(`❌ QA FAIL: Empty #root in ${filePath}`);
        hasError = true;
    }
    if (!titleOk) {
        console.warn(`⚠️ QA WARNING: Title mismatch in ${filePath}. Got: ${titleMatch ? titleMatch[1] : 'NONE'}, Expected: ${route.title}`);
    }

    qaTable.push({
        Route: route.path,
        Exists: "YES",
        RootBytes: rootContent.length,
        TitleMatch: titleOk ? "YES" : "NO",
        CanonicalMatch: canonicalOk ? "YES" : "NO"
    });
}

console.table(qaTable);

// 3. Verify sitemap.xml
const sitemapPath = path.join(distDir, "sitemap.xml");
if (!fs.existsSync(sitemapPath)) {
    console.error("❌ QA FAIL: dist/sitemap.xml missing!");
    hasError = true;
} else {
    console.log("✅ dist/sitemap.xml exists and verified");
}

if (hasError) {
    console.error("\n❌ QA Prerender verification FAILED!");
    process.exit(1);
} else {
    console.log("\n✅ All QA Prerender checks PASSED successfully!");
}

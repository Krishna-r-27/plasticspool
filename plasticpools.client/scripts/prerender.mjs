import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { chromium } from "playwright";
import { publicRoutes, SITE_URL } from "../src/seo/publicRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.resolve(rootDir, "dist");

const MIME_TYPES = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".webmanifest": "application/manifest+json",
    ".mp4": "video/mp4"
};

function createStaticServer(port) {
    return new Promise((resolve) => {
        const server = http.createServer((req, res) => {
            const urlPath = req.url.split("?")[0];
            let filePath = path.join(distDir, urlPath);

            // Handle direct file or fallback to spa-shell.html / index.html
            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
                const ext = path.extname(filePath).toLowerCase();
                res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
                fs.createReadStream(filePath).pipe(res);
                return;
            }

            // If path is a directory and has index.html
            if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
                const indexPath = path.join(filePath, "index.html");
                if (fs.existsSync(indexPath)) {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    fs.createReadStream(indexPath).pipe(res);
                    return;
                }
            }

            // SPA fallback
            const fallbackPath = fs.existsSync(path.join(distDir, "spa-shell.html"))
                ? path.join(distDir, "spa-shell.html")
                : path.join(distDir, "index.html");

            res.writeHead(200, { "Content-Type": "text/html" });
            fs.createReadStream(fallbackPath).pipe(res);
        });

        server.listen(port, () => {
            resolve(server);
        });
    });
}

function injectOrUpdateMeta(html, route) {
    let output = html;

    // 1. Title
    if (route.title) {
        if (/<title>.*?<\/title>/i.test(output)) {
            output = output.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);
        } else {
            output = output.replace(/<\/head>/i, `    <title>${route.title}</title>\n</head>`);
        }
    }

    const metaTags = [
        { name: "robots", content: route.robots || "index, follow" },
        { name: "description", content: route.description },
        { name: "keywords", content: route.keywords },
        { property: "og:title", content: route.title },
        { property: "og:description", content: route.description },
        { property: "og:url", content: route.canonical || `${SITE_URL}${route.path}` },
        { property: "og:type", content: "website" },
        { property: "og:image", content: route.image || `${SITE_URL}/plasticspool-hi-tech-plast-logo.png` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: route.title },
        { name: "twitter:description", content: route.description },
        { name: "twitter:image", content: route.image || `${SITE_URL}/plasticspool-hi-tech-plast-logo.png` }
    ];

    metaTags.forEach(({ name, property, content }) => {
        if (!content) return;
        const attr = name ? `name="${name}"` : `property="${property}"`;
        const tagRegex = new RegExp(`<meta\\s+[^>]*${attr}[^>]*>`, "i");
        const newTag = `<meta ${attr} content="${content.replace(/"/g, '&quot;')}" />`;

        if (tagRegex.test(output)) {
            output = output.replace(tagRegex, newTag);
        } else {
            output = output.replace(/<\/head>/i, `    ${newTag}\n</head>`);
        }
    });

    // Canonical link
    const canonicalUrl = route.canonical || `${SITE_URL}${route.path}`;
    const canonicalRegex = /<link\s+[^>]*rel="canonical"[^>]*>/i;
    const newCanonical = `<link rel="canonical" href="${canonicalUrl}" />`;
    if (canonicalRegex.test(output)) {
        output = output.replace(canonicalRegex, newCanonical);
    } else {
        output = output.replace(/<\/head>/i, `    ${newCanonical}\n</head>`);
    }

    return output;
}

async function runPrerender() {
    console.log("=== Starting SPA Prerender Process ===");

    if (!fs.existsSync(distDir)) {
        throw new Error("dist directory does not exist! Please run 'vite build' first.");
    }

    // Step 1: Save clean empty-root spa-shell.html before capturing
    const originalIndexPath = path.join(distDir, "index.html");
    const spaShellPath = path.join(distDir, "spa-shell.html");

    if (!fs.existsSync(spaShellPath)) {
        fs.copyFileSync(originalIndexPath, spaShellPath);
        console.log("Created spa-shell.html from initial index.html");
    }

    const port = 5178;
    const server = await createStaticServer(port);
    console.log(`Local prerender server started on http://localhost:${port}`);

    const browser = await chromium.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const context = await browser.newContext({
        viewport: { width: 1280, height: 800 },
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 PrerenderBot"
    });

    const routesToPrerender = publicRoutes.filter(r => r.prerender);
    console.log(`Prerendering ${routesToPrerender.length} routes...`);

    const results = [];

    for (const route of routesToPrerender) {
        const page = await context.newPage();
        const url = `http://localhost:${port}${route.path}`;

        try {
            console.log(`\nRendering: ${route.path} -> ${url}`);
            await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });

            // Wait for #root to have non-empty children
            await page.waitForFunction(() => {
                const root = document.getElementById("root");
                return root && (root.children.length > 0 || (root.textContent && root.textContent.trim().length > 30));
            }, { timeout: 15000 });

            // Brief stabilization pause for transitions
            await page.waitForTimeout(600);

            // Capture rendered HTML
            let renderedHtml = await page.content();

            // Inject & enforce route catalog SEO tags
            renderedHtml = injectOrUpdateMeta(renderedHtml, route);

            // Verify #root is NOT empty
            const rootMatch = renderedHtml.match(/<div id="root">([\s\S]*?)<\/div>/i);
            const rootContent = rootMatch ? rootMatch[1].trim() : "";

            if (!rootContent || rootContent.length < 30) {
                throw new Error(`Prerender failed for ${route.path}: #root is empty or insufficient text!`);
            }

            // Determine output path
            let outputPath;
            if (route.path === "/") {
                outputPath = path.join(distDir, "index.html");
            } else if (route.path === "/404") {
                outputPath = path.join(distDir, "404", "index.html");
                const alt404Path = path.join(distDir, "404.html");
                fs.mkdirSync(path.dirname(alt404Path), { recursive: true });
                fs.writeFileSync(alt404Path, renderedHtml, "utf8");
            } else {
                const subDir = route.path.startsWith("/") ? route.path.slice(1) : route.path;
                outputPath = path.join(distDir, subDir, "index.html");
            }

            fs.mkdirSync(path.dirname(outputPath), { recursive: true });
            fs.writeFileSync(outputPath, renderedHtml, "utf8");

            console.log(` Saved prerendered HTML: ${outputPath} (Body size: ${rootContent.length} chars)`);
            results.push({
                path: route.path,
                title: route.title,
                status: "OK",
                rootLength: rootContent.length
            });
        } catch (err) {
            console.error(` Error rendering ${route.path}:`, err);
            results.push({
                path: route.path,
                title: route.title,
                status: "FAILED",
                error: err.message
            });
        } finally {
            await page.close();
        }
    }

    await browser.close();
    server.close();

    console.log("\n=== Prerender Summary ===");
    console.table(results);

    const hasFailure = results.some(r => r.status === "FAILED");
    if (hasFailure) {
        console.error("Prerender finished with ERRORS!");
        process.exit(1);
    } else {
        console.log(" All pages prerendered successfully!");
    }
}

runPrerender().catch(err => {
    console.error("Prerender fatal error:", err);
    process.exit(1);
});

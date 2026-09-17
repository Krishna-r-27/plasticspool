using System.Net;
using System.Text.Encodings.Web;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using plasticpools.Server.Data;
using plasticpools.Server.Models;

namespace plasticpools.Server.Services
{
    public class SeoPrerenderMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IWebHostEnvironment _env;

        private static readonly HashSet<string> StaticExtensions = new(StringComparer.OrdinalIgnoreCase)
        {
            ".js", ".css", ".png", ".jpg", ".jpeg", ".webp", ".svg", ".ico",
            ".json", ".map", ".woff", ".woff2", ".ttf", ".eot", ".mp4", ".webmanifest",
            ".xml", ".txt", ".pdf"
        };

        public SeoPrerenderMiddleware(RequestDelegate next, IWebHostEnvironment env)
        {
            _next = next;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext context, AppDbContext dbContext)
        {
            // Only handle GET and HEAD requests
            if (context.Request.Method != HttpMethods.Get && context.Request.Method != HttpMethods.Head)
            {
                await _next(context);
                return;
            }

            var path = context.Request.Path.Value ?? "/";

            // Ignore API, Swagger, and static assets with extensions
            if (path.StartsWith("/api", StringComparison.OrdinalIgnoreCase) ||
                path.StartsWith("/swagger", StringComparison.OrdinalIgnoreCase))
            {
                await _next(context);
                return;
            }

            var ext = Path.GetExtension(path);
            if (!string.IsNullOrEmpty(ext) && StaticExtensions.Contains(ext))
            {
                await _next(context);
                return;
            }

            var webRoot = _env.WebRootPath ?? Path.Combine(_env.ContentRootPath, "wwwroot");
            var normalizedPath = NormalizeRoutePath(path);

            // 1. Check PowerAdmin routes -> Always serve clean spa-shell.html (empty root)
            if (normalizedPath.StartsWith("/poweradmin", StringComparison.OrdinalIgnoreCase))
            {
                var spaShellPath = Path.Combine(webRoot, "spa-shell.html");
                if (File.Exists(spaShellPath))
                {
                    context.Response.StatusCode = (int)HttpStatusCode.OK;
                    context.Response.ContentType = "text/html; charset=utf-8";
                    await context.Response.SendFileAsync(spaShellPath);
                    return;
                }
            }

            // 2. Check Dynamic Blog Details: /blog/{slug}
            var blogMatch = Regex.Match(normalizedPath, @"^/blog/([^/]+)$", RegexOptions.IgnoreCase);
            if (blogMatch.Success)
            {
                var slug = blogMatch.Groups[1].Value.Trim().ToLowerInvariant();

                // Look up blog in database
                var blogs = await dbContext.Blog
                    .Where(b => b.Visible == true || b.Visible == null)
                    .ToListAsync();

                var blog = blogs.FirstOrDefault(b => ToUrlSlug(b.Title) == slug);

                if (blog != null)
                {
                    var html = await GenerateBlogHtmlAsync(webRoot, blog, slug);
                    context.Response.StatusCode = (int)HttpStatusCode.OK;
                    context.Response.ContentType = "text/html; charset=utf-8";
                    await context.Response.WriteAsync(html);
                    return;
                }
                else
                {
                    // Blog slug not found -> 404
                    var notFoundPath = Path.Combine(webRoot, "404", "index.html");
                    if (!File.Exists(notFoundPath))
                    {
                        notFoundPath = Path.Combine(webRoot, "404.html");
                    }

                    if (File.Exists(notFoundPath))
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                        context.Response.ContentType = "text/html; charset=utf-8";
                        await context.Response.SendFileAsync(notFoundPath);
                        return;
                    }
                }
            }

            // 3. Check Prerendered Static Pages (e.g. /, /about-us, /products, /blog, /contact-us, /sitemap, /faq, /thank-you, /404)
            string candidateFile;
            if (normalizedPath == "/" || string.IsNullOrEmpty(normalizedPath))
            {
                candidateFile = Path.Combine(webRoot, "index.html");
            }
            else
            {
                var relativeSub = normalizedPath.TrimStart('/');
                candidateFile = Path.Combine(webRoot, relativeSub, "index.html");
            }

            if (File.Exists(candidateFile))
            {
                context.Response.StatusCode = normalizedPath == "/404" ? (int)HttpStatusCode.NotFound : (int)HttpStatusCode.OK;
                context.Response.ContentType = "text/html; charset=utf-8";
                await context.Response.SendFileAsync(candidateFile);
                return;
            }

            // 4. Fallback for unhandled SPA routes -> spa-shell.html
            var fallbackShell = Path.Combine(webRoot, "spa-shell.html");
            if (File.Exists(fallbackShell))
            {
                context.Response.StatusCode = (int)HttpStatusCode.OK;
                context.Response.ContentType = "text/html; charset=utf-8";
                await context.Response.SendFileAsync(fallbackShell);
                return;
            }

            await _next(context);
        }

        private static string NormalizeRoutePath(string rawPath)
        {
            if (string.IsNullOrWhiteSpace(rawPath)) return "/";
            var path = rawPath.Trim();
            if (path.Length > 1 && path.EndsWith('/'))
            {
                path = path.TrimEnd('/');
            }
            return path;
        }

        private static string ToUrlSlug(string? text)
        {
            if (string.IsNullOrWhiteSpace(text)) return "";
            var slug = text.ToLowerInvariant().Trim();
            slug = slug.Replace(" ", "-");
            slug = Regex.Replace(slug, @"[^a-z0-9\s-]", "-");
            slug = Regex.Replace(slug, @"\s+", "-").Trim('-');
            return slug;
        }

        private static string StripHtmlTags(string? html)
        {
            if (string.IsNullOrWhiteSpace(html)) return "";
            return Regex.Replace(html, "<.*?>", string.Empty).Trim();
        }

        private async Task<string> GenerateBlogHtmlAsync(string webRoot, Blog blog, string slug)
        {
            var templatePath = Path.Combine(webRoot, "spa-shell.html");
            if (!File.Exists(templatePath))
            {
                templatePath = Path.Combine(webRoot, "index.html");
            }

            var html = await File.ReadAllTextAsync(templatePath);

            var title = !string.IsNullOrWhiteSpace(blog.Seo_Title)
                ? blog.Seo_Title
                : $"{blog.Title} | Hi-Tech Plast";

            var rawDesc = StripHtmlTags(blog.Description1);
            var description = !string.IsNullOrWhiteSpace(blog.Seo_Meta_Description)
                ? blog.Seo_Meta_Description
                : (rawDesc.Length > 160 ? rawDesc.Substring(0, 160) + "..." : rawDesc);

            if (string.IsNullOrWhiteSpace(description))
            {
                description = "Explore articles on plastic spools, reels, and bobbins with insights from Hi-Tech Plast.";
            }

            var keywords = $"plastic spool blog, wire spool, reel manufacturing, Hi-Tech Plast, {blog.Title}";
            var canonicalUrl = $"https://www.plasticspool.com/blog/{slug}";
            var imageUrl = !string.IsNullOrWhiteSpace(blog.Image)
                ? (blog.Image.StartsWith("http", StringComparison.OrdinalIgnoreCase) ? blog.Image : $"https://www.plasticspool.com/{blog.Image.TrimStart('/')}")
                : "https://www.plasticspool.com/plasticspool-hi-tech-plast-logo.png";

            // Replace <title>
            if (Regex.IsMatch(html, @"<title>.*?</title>", RegexOptions.IgnoreCase))
            {
                html = Regex.Replace(html, @"<title>.*?</title>", $"<title>{HtmlEncoder.Default.Encode(title)}</title>", RegexOptions.IgnoreCase);
            }
            else
            {
                html = html.Replace("</head>", $"    <title>{HtmlEncoder.Default.Encode(title)}</title>\n</head>", StringComparison.OrdinalIgnoreCase);
            }

            // Meta tags to inject
            var metaTags = new Dictionary<string, string>
            {
                { "name:robots", "index, follow" },
                { "name:description", description },
                { "name:keywords", keywords },
                { "property:og:title", title },
                { "property:og:description", description },
                { "property:og:url", canonicalUrl },
                { "property:og:type", "article" },
                { "property:og:image", imageUrl },
                { "name:twitter:card", "summary_large_image" },
                { "name:twitter:title", title },
                { "name:twitter:description", description },
                { "name:twitter:image", imageUrl }
            };

            foreach (var kv in metaTags)
            {
                var parts = kv.Key.Split(':');
                var attrName = parts[0];
                var attrVal = string.Join(':', parts.Skip(1));
                var pattern = $@"<meta\s+[^>]*{attrName}=""{Regex.Escape(attrVal)}""[^>]*>";
                var newTag = $"<meta {attrName}=\"{attrVal}\" content=\"{HtmlEncoder.Default.Encode(kv.Value)}\" />";

                if (Regex.IsMatch(html, pattern, RegexOptions.IgnoreCase))
                {
                    html = Regex.Replace(html, pattern, newTag, RegexOptions.IgnoreCase);
                }
                else
                {
                    html = html.Replace("</head>", $"    {newTag}\n</head>", StringComparison.OrdinalIgnoreCase);
                }
            }

            // Canonical
            var canonicalTag = $"<link rel=\"canonical\" href=\"{canonicalUrl}\" />";
            if (Regex.IsMatch(html, @"<link\s+[^>]*rel=""canonical""[^>]*>", RegexOptions.IgnoreCase))
            {
                html = Regex.Replace(html, @"<link\s+[^>]*rel=""canonical""[^>]*>", canonicalTag, RegexOptions.IgnoreCase);
            }
            else
            {
                html = html.Replace("</head>", $"    {canonicalTag}\n</head>", StringComparison.OrdinalIgnoreCase);
            }

            // Crawler-visible body injection inside #root
            var crawlerBody = $@"<div id=""root"">
  <div class=""font-dmsans"">
    <main class=""py-16 md:py-28 bg-white blog-detail"">
      <div class=""container mx-auto px-4"">
        <h1 class=""text-3xl font-semibold mb-6"">{HtmlEncoder.Default.Encode(blog.Title ?? "")}</h1>
        {(string.IsNullOrWhiteSpace(blog.Image) ? "" : $@"<div class=""mb-8 text-center""><img src=""{HtmlEncoder.Default.Encode(imageUrl)}"" alt=""{HtmlEncoder.Default.Encode(blog.Title ?? "")}"" class=""w-full max-w-2xl mx-auto rounded"" /></div>")}
        <div class=""text-gray-700 leading-[1.8] blog-html"">{blog.Description1 ?? ""}</div>
      </div>
    </main>
  </div>
</div>";

            if (Regex.IsMatch(html, @"<div id=""root"">.*?</div>", RegexOptions.Singleline | RegexOptions.IgnoreCase))
            {
                html = Regex.Replace(html, @"<div id=""root"">.*?</div>", crawlerBody, RegexOptions.Singleline | RegexOptions.IgnoreCase);
            }

            return html;
        }
    }
}

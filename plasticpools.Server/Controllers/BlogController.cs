using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using plasticpools.Server.Data;
using plasticpools.Server.DTOs;
using plasticpools.Server.Models;
using static System.Net.Mime.MediaTypeNames;

namespace plasticpools.Server.Controllers
{
    [Route("api/blog")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BlogController(AppDbContext context)
        {
            _context = context;
        }

        // =============================
        // ADD BLOG
        // =============================
        [HttpPost("add")]
        public async Task<IActionResult> AddBlog([FromForm] BlogDTO dto) // Image DTO ke andar honi chahiye
        {
            try
            {
                // Image check aur save logic
                string? imagePath = null;
                if (dto.Image != null)
                {
                    imagePath = await SaveFile(dto.Image, "Blogs");
                }

                var blog = new Blog
                {
                    Title = string.IsNullOrWhiteSpace(dto.Title) ? null : dto.Title.Trim(),
                    Description1 = dto.Description1,
              
                    Image = imagePath,
                    Seo_Title = dto.Seo_Title,
                    Seo_Meta_Description = dto.Seo_Meta_Description,
                    Visible = dto.Visible ?? true
                };

                _context.Blog.Add(blog);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Blog added successfully ✅", id = blog.Id });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error ❌", error = ex.Message });
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateBlog(int id, [FromForm] BlogDTO dto)
        {
            var blog = await _context.Blog.FindAsync(id);
            if (blog == null) return NotFound(new { message = "Blog not found ❌" });

            try
            {
                blog.Title = string.IsNullOrWhiteSpace(dto.Title) ? null : dto.Title.Trim();
                blog.Description1 = dto.Description1;
 

                // Image update logic: Agar nayi image aayi hai toh hi replace karo
                if (dto.Image != null)
                {
                    blog.Image = await SaveFile(dto.Image, "Blogs");
                }

                blog.Seo_Title = dto.Seo_Title;
                blog.Seo_Meta_Description = dto.Seo_Meta_Description;
                blog.Visible = dto.Visible ?? blog.Visible;

                await _context.SaveChangesAsync();
                return Ok(new { message = "Blog updated successfully ✅" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error ❌", error = ex.Message });
            }
        }

        // Updated SaveFile Method
        private async Task<string> SaveFile(IFormFile file, string folder)
        {
            var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", folder);
            if (!Directory.Exists(uploadPath)) Directory.CreateDirectory(uploadPath);

            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream); // Async is better
            }

            return $"{folder}/{fileName}";
        }

        // =============================
        // GET BY ID
        // =============================
        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var blog = await _context.Blog.FindAsync(id);

            if (blog == null)
                return NotFound(new { message = "Blog not found ❌" });

            return Ok(blog);
        }

        // =============================
        // LIST (ONLY id, title, image)
        // =============================
        [HttpGet("list")]
        public IActionResult GetList()
        {
            var data = _context.Blog
                .OrderByDescending(x => x.Id)
                .AsEnumerable() //   important (memory me laake slug bana)
                .Select(x => new
                {
                    Id = x.Id,
                    Title = x.Title,
                    Image = x.Image,
                    Slug = ToUrlSlug(x.Title), //   runtime slug
                    visible = x.Visible
                })
                .ToList();

            return Ok(data);
        }
        [HttpGet("getbyslug/{slug}")]
        public IActionResult GetBySlug(string slug)
        {
            var blog = _context.Blog
                .AsEnumerable() //   important
                .FirstOrDefault(x => ToUrlSlug(x.Title) == slug);

            if (blog == null)
                return NotFound(new { message = "Blog not found ❌" });

            return Ok(new
            {
                blog.Title,
                blog.Description1,
                blog.Image
            });
        }
        private static string ToUrlSlug(string text)
        {
            if (string.IsNullOrWhiteSpace(text)) return "";
            text = text.ToLowerInvariant().Replace(" ", "-");
            text = System.Text.RegularExpressions.Regex.Replace(text, @"[^a-z0-9\s-]", "-");
            text = System.Text.RegularExpressions.Regex.Replace(text, @"\s+", "-").Trim();
            return text;
        }
        [HttpGet("related")]
        public IActionResult GetRelated()
        {
            //.Take(6)
            var data = _context.Blog
              .Where(x => x.Visible == true)
                .OrderByDescending(x => x.Id)
               
                .AsEnumerable()
                .Select(x => new
                {
                    x.Title,
                    x.Image,
                    Slug = ToUrlSlug(x.Title)
                })
                .ToList();

            return Ok(data);
        }
        // =============================
        // DELETE (OPTIONAL)
        // =============================
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var blog = await _context.Blog.FindAsync(id);

            if (blog == null)
                return NotFound(new { message = "Blog not found ❌" });

            _context.Blog.Remove(blog);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Blog deleted successfully ✅" });
        }
       
    }
}

//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using plasticpools.Server.Data;
//using plasticpools.Server.DTOs;

//namespace plasticpools.Server.Controllers
//{
//    [Route("api/admin")]
//    [ApiController]
//    public class AdminController : ControllerBase
//    {
//        private readonly AppDbContext _db;

//        public AdminController(AppDbContext db)
//        {
//            _db = db;
//        }

//        [HttpPost]
//        public IActionResult Login(AdminDTO dto)
//        {
//            // 1. Find user by USERNAME
//            var user = _db.Admin.FirstOrDefault(x => x.username == dto.username);

//            if (user == null)
//                return Unauthorized(new { message = "Invalid username or password" });

//            // 2. Plain text password check
//            if (dto.password != user.password)
//                return Unauthorized(new { message = "Invalid username or password" });

//            // 3. Success
//            return Ok(new
//            {
//                message = "Login successful",
//                userId = user.Id,
//                username = user.username,
//                email = user.Email
//            });
//        }
//    }
//}
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using plasticpools.Server.Data;
using plasticpools.Server.DTOs;

namespace plasticpools.Server.Controllers
{
    [Route("api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _db;

        public AdminController(AppDbContext db)
        {
            _db = db;
        }

        [HttpPost]
        public IActionResult Login(AdminDTO dto)
        {
            // 1. Find user by USERNAME
            var user = _db.Admin.FirstOrDefault(x => x.username == dto.username);

            if (user == null)
                return Unauthorized(new { message = "Invalid username or password" });

            // 2. Plain text password check
            if (dto.password != user.password)
                return Unauthorized(new { message = "Invalid username or password" });

            // 3. Success
            return Ok(new
            {
                message = "Login successful",
                userId = user.Id,
                username = user.username,
                email = user.Email
            });
        }
    }
}


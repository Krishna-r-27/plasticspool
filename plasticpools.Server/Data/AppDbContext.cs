using Microsoft.EntityFrameworkCore;
using plasticpools.Server.Models;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace plasticpools.Server.Data
{
    public class AppDbContext: DbContext    
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
          : base(options) { }

        public DbSet<Admin> Admin { get; set; }
        public DbSet<Blog> Blog { get; set; }
      
    }
}

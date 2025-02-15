using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Context
{
    public class ApplicationDbContext: IdentityDbContext<User>
    {
        public DbSet<Folder> Folders { get; set; }
        public DbSet<Media> Medias { get; set; }
        public DbSet<Share> Share { get; set; }
        public DbSet<SharedUsers> SharedUsers { get; set; }


        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
             List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole{Name = "Admin", NormalizedName = "ADMIN"},
                new IdentityRole{Name = "User", NormalizedName = "USER"}
            }; 
            modelBuilder.Entity<IdentityUserLogin<string>>().HasKey(login => new { login.LoginProvider, login.ProviderKey });
            modelBuilder.Entity<IdentityUserRole<string>>().HasKey(role => new { role.UserId, role.RoleId });
            modelBuilder.Entity<IdentityUserToken<string>>().HasKey(token => new { token.UserId, token.LoginProvider, token.Name });
    
            modelBuilder.UseCollation("utf8mb4_general_ci");
            modelBuilder.Entity<IdentityRole>().HasData(roles); 

        }
        
    }
}
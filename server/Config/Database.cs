using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Context;

namespace server.Config
{
    public static class Database
    {
        public static void AddDatabaseContext(this IServiceCollection services, IConfiguration configuration)
        {
            var conn = configuration.GetConnectionString("LocalConnection") ?? throw new InvalidOperationException("Invlaid");
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseMySql(
                    conn,
                    ServerVersion.AutoDetect(conn)
                )
            );
        }
        
    }
}
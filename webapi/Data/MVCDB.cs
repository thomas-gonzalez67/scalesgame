using Microsoft.EntityFrameworkCore;
using webapi.Model;
namespace webapi.Data
{
    public class MVCDB : DbContext
    {
        public MVCDB(DbContextOptions options) : base(options) { 
        
        }

        public DbSet<Player> Players { get; set; }
    }

   
}

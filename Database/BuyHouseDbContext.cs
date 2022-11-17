using Microsoft.EntityFrameworkCore;

using UserDomain = buy_house.Database.Models.User;

namespace buy_house.Database
{
    public class BuyHouseDbContext : DbContext
    {
        public BuyHouseDbContext(DbContextOptions<BuyHouseDbContext> options) : base(options)
        {
        }

        public DbSet<UserDomain> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserDomain>().ToTable("Users");
        }
    }
}

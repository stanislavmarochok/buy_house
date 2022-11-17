using Microsoft.EntityFrameworkCore;

using UserDomain = buy_house.Database.Models.User;
using ItemDomain = buy_house.Database.Models.Item;

namespace buy_house.Database
{
    public class BuyHouseDbContext : DbContext
    {
        public BuyHouseDbContext(DbContextOptions<BuyHouseDbContext> options) : base(options)
        {
        }

        public DbSet<UserDomain> Users { get; set; }
        public DbSet<ItemDomain> Items { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserDomain>().ToTable("Users");
            modelBuilder.Entity<ItemDomain>().ToTable("Items");
        }
    }
}

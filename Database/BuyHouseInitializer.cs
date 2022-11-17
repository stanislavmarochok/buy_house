using System.Linq;

using UserDomain = buy_house.Database.Models.User;
using ItemDomain = buy_house.Database.Models.Item;
using System;

namespace buy_house.Database
{
    public class BuyHouseInitializer
    {
        public static void Initialize(BuyHouseDbContext context)
        {
            var isCreated = context.Database.EnsureCreated();
            CreateUsers(context);
            CreateItems(context);
        }

        public static void CreateUsers(BuyHouseDbContext context)
        {
            if (context.Users.Any())
            {
                return; // DB has been seeded
            }

            var users = new UserDomain[]
            {
                new UserDomain
                {
                    Name = "Carson",
                    Email = "carson@gmail.com",
                    Password = "Password"
                }
            };
            foreach (UserDomain user in users)
            {
                context.Users.Add(user);
            }
            context.SaveChanges();
        }

        public static void CreateItems(BuyHouseDbContext context)
        {
            if (context.Items.Any())
            {
                return; // DB has been seeded
            }

            var items = new ItemDomain[]
            {
                new ItemDomain
                {
                   Title = "Beautiful house",
                   Price = 2500,
                   Adress = "huynya",
                   Date = DateTime.Now,
                   Description = "description descriptiondescription"
                }
            };
            foreach (ItemDomain item in items)
            {
                context.Items.Add(item);
            }
            context.SaveChanges();
        }

    }
}

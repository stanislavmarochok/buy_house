using System.Linq;

using UserDomain = buy_house.Database.Models.User;
using ItemDomain = buy_house.Database.Models.Item;
using System;
using System.Collections.Generic;

namespace buy_house.Database
{
    public class BuyHouseInitializer
    {
        static List<UserDomain> _newUsers;
        static List<ItemDomain> _newItems;

        public static void Initialize(BuyHouseDbContext context)
        {
            var isCreated = context.Database.EnsureCreated();
            _newUsers = CreateUsers(context);
            _newItems = CreateItems(context);
        }

        public static List<UserDomain> CreateUsers(BuyHouseDbContext context)
        {
            if (context.Users.Any())
            {
                return Enumerable.Empty<UserDomain>().ToList(); // DB has been seeded
            }

            List<UserDomain> users = new List<UserDomain>
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
            return users;
        }

        public static List<ItemDomain> CreateItems(BuyHouseDbContext context)
        {
            if (context.Items.Any())
            {
                return Enumerable.Empty<ItemDomain>().ToList(); // DB has been seeded
            }

            List<ItemDomain> items = new List<ItemDomain>();
            foreach (UserDomain user in _newUsers)
            {
                for (int i = 0; i < 7; i++)
                {
                    ItemDomain newItem = new ItemDomain
                    {
                        UserId = user.Id,
                        Title = "Beautiful house",
                        Price = 2500,
                        Adress = "huynya",
                        Date = DateTime.Now,
                        Description = "description descriptiondescription",
                        ImageLocation = "images/items/0.jpg"
                    };
                    context.Items.Add(newItem);
                }
            }

            context.SaveChanges();
            return items;
        }

    }
}

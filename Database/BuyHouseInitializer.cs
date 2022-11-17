using System.Linq;

using UserDomain = buy_house.Database.Models.User;

namespace buy_house.Database
{
    public class BuyHouseInitializer
    {
        public static void Initialize(BuyHouseDbContext context)
        {
            var isCreated = context.Database.EnsureCreated();

            // Look for any users.
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
    }
}

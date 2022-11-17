using buy_house.Database.Models;
using System.Collections.Generic;
using System.Linq;

namespace buy_house.Database
{
    public class DatabaseService : IDatabaseService
    {
        private readonly BuyHouseDbContext _buyHouseDbContext;

        public DatabaseService(BuyHouseDbContext buyHouseDbContext)
        {
            _buyHouseDbContext = buyHouseDbContext;
        }

        public List<User> GetAllUsers()
        {
            return _buyHouseDbContext.Users.ToList();
        }

        public List<Item> GetAllItems()
        {
            return _buyHouseDbContext.Items.ToList();
        }

        public Item GetItemById(int id)
        {
            return _buyHouseDbContext.Items.FirstOrDefault(item => item.Id == id);
        }
    }
}

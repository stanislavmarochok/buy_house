using System.Collections.Generic;

using UserDomain = buy_house.Database.Models.User;
using ItemDomain = buy_house.Database.Models.Item;

namespace buy_house.Database
{
    public interface IDatabaseService
    {
        List<UserDomain> GetAllUsers();
        List<ItemDomain> GetAllItems();
        ItemDomain GetItemById(int id);
    }
}

using System.Collections.Generic;

using UserDomain = buy_house.Database.Models.User;
using ItemDomain = buy_house.Database.Models.Item;
using buy_house.Controllers.Contracts.Requests;
using buy_house.Controllers.Contracts.Responses;

namespace buy_house.Database
{
    public interface IDatabaseService
    {
        List<UserDomain> GetAllUsers();
        ResponseContract GetAllItems(GetAllItemsFilteredRequestContract request);
        ItemDomain GetItemById(int id);
        List<ItemDomain> GetItemsByUserId(int userId);

        ResponseContract RegisterUser(RegisterUserRequestContract request);
        ResponseContract AuthenticateUser(AuthenticateUserRequestContract request);

        ResponseContract AddItem(AddItemRequestContract request);
        ResponseContract UpdateItem(int id, UpdateItemRequestContract request);
        ResponseContract DeleteItem(int? id);
    }
}

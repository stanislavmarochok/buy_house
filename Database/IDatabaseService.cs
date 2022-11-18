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
        List<ItemDomain> GetAllItems();
        ItemDomain GetItemById(int id);

        RegisterUserResponseContract RegisterUser(RegisterUserRequestContract request);
        AuthenticateUserResponseContract AuthenticateUser(AuthenticateUserRequestContract request);
    }
}

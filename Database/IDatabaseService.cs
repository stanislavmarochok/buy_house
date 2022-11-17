using System.Collections.Generic;

using UserDomain = buy_house.Database.Models.User;

namespace buy_house.Database
{
    public interface IDatabaseService
    {
        List<UserDomain> GetAllUsers();
    }
}

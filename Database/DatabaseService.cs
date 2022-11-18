using buy_house.Controllers.Contracts.Requests;
using buy_house.Controllers.Contracts.Responses;
using buy_house.Database.Models;
using System.Collections.Generic;
using System.Linq;

using UserDomain = buy_house.Database.Models.User;

namespace buy_house.Database
{
    public class DatabaseService : IDatabaseService
    {
        private readonly BuyHouseDbContext _context;

        public DatabaseService(BuyHouseDbContext buyHouseDbContext)
        {
            _context = buyHouseDbContext;
        }

        public List<User> GetAllUsers()
        {
            return _context.Users.ToList();
        }

        public List<Item> GetAllItems()
        {
            return _context.Items.ToList();
        }

        public Item GetItemById(int id)
        {
            return _context.Items.FirstOrDefault(item => item.Id == id);
        }

        public RegisterUserResponseContract RegisterUser(RegisterUserRequestContract request)
        {
            UserDomain newUser = new UserDomain
            {
                Name = request.Name,
                Email = request.Email,
                Password = hashPassword(request.Password)
            };

            _context.Users.Add(newUser);

            RegisterUserResponseContract response = new RegisterUserResponseContract
            {
                ResponseCode = 200,
                ResponseBody = newUser
            };
            return response;
        }

        private string hashPassword(string password)
        {
            return password;
        }
    }
}

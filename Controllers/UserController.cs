using buy_house.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using UserDomain = buy_house.Database.Models.User;

namespace buy_house.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;
        private readonly BuyHouseDbContext _buyHouseDbContext;

        public UsersController(
            ILogger<UsersController> logger,
            BuyHouseDbContext buyHouseDbContext)
        {
            _logger = logger;
            _buyHouseDbContext = buyHouseDbContext;
        }

        [HttpGet]
        public IEnumerable<UserDomain> Get()
        {
            List<UserDomain> users = _buyHouseDbContext.Users.ToList();
            return users;
        }
    }
}

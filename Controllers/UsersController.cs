using buy_house.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using UserDomain = buy_house.Database.Models.User;

namespace buy_house.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;
        private readonly IDatabaseService _databaseService;

        public UsersController(
            ILogger<UsersController> logger,
            IDatabaseService databaseService)
        {
            _logger = logger;
            _databaseService = databaseService;
        }

        [HttpGet]
        public IEnumerable<UserDomain> Get()
        {
            List<UserDomain> users = _databaseService.GetAllUsers();
            return users;
        }
    }
}

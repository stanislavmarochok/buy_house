using buy_house.Controllers.Contracts.Requests;
using buy_house.Controllers.Contracts.Responses;
using buy_house.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using UserDomain = buy_house.Database.Models.User;

namespace buy_house.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> _logger;
        private readonly IDatabaseService _databaseService;

        public AuthController(
            ILogger<AuthController> logger,
            IDatabaseService databaseService)
        {
            _logger = logger;
            _databaseService = databaseService;
        }

        [HttpPost]
        public AuthenticateUserResponseContract AuthenticateUser([FromBody] AuthenticateUserRequestContract request)
        {
            AuthenticateUserResponseContract response = _databaseService.AuthenticateUser(request);
            return response;
        }
    }
}

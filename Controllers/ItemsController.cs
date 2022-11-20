using buy_house.Controllers.Contracts.Requests;
using buy_house.Controllers.Contracts.Responses;
using buy_house.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using ItemDomain = buy_house.Database.Models.Item;

namespace buy_house.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemsController : ControllerBase
    {
        private readonly ILogger<ItemsController> _logger;
        private readonly IDatabaseService _databaseService;

        public ItemsController(
            ILogger<ItemsController> logger,
            IDatabaseService databaseService)
        {
            _logger = logger;
            _databaseService = databaseService;
        }

        [HttpGet]
        public ResponseContract Get([FromQuery] GetAllItemsFilteredRequestContract request)
        {
            ResponseContract response = _databaseService.GetAllItems(request);
            return response;
        }

        [HttpGet]
        [Route("/api/[controller]/{id}")]
        public ItemDomain GetById(int id)
        {
            ItemDomain item = _databaseService.GetItemById(id);
            return item;
        }

        [HttpPost]
        [Route("/api/[controller]")]
        public ResponseContract AddItem([FromForm] AddItemRequestContract request)
        {
            ResponseContract response = _databaseService.AddItem(request);
            return response;
        }

        [HttpPut]
        [Route("/api/[controller]")]
        public ResponseContract UpdateItem([FromForm] UpdateItemRequestContract request)
        {
            ResponseContract response = _databaseService.UpdateItem(request);
            return response;
        }
    }
}

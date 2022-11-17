﻿using buy_house.Database;
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
        public IEnumerable<ItemDomain> Get()
        {
            List<ItemDomain> items = _databaseService.GetAllItems();
            return items;
        }

        [HttpGet]
        [Route("/api/[controller]/{id}")]
        public ItemDomain GetById(int id)
        {
            ItemDomain item = _databaseService.GetItemById(id);
            return item;
        }
    }
}

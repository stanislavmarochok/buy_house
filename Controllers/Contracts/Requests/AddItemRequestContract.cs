
using Microsoft.AspNetCore.Http;

namespace buy_house.Controllers.Contracts.Requests
{
    public class AddItemRequestContract
    {
        public int? UserId { get; set; }
        public string Title { get; set; }
        public int? Price { get; set; }
        public string Address { get; set; }
        public IFormFile? Image { get; set; }
        public string Description { get; set; }
    }
}

namespace buy_house.Controllers.Contracts.Requests
{
    public class GetAllItemsFilteredRequestContract
    {
        public string Title { get; set; }
        public int? PriceMin { get; set; }
        public int? PriceMax { get; set; }
        public string Location { get; set; }
    }
}

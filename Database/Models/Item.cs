using System;

namespace buy_house.Database.Models
{
    public class Item
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public int Price{ get; set; }
        public string Address { get; set; }
        public DateTime Date { get; set; }
        public string ImageName { get; set; }
        public string Description{ get; set; }
    }
}

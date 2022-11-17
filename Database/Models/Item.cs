using System;

namespace buy_house.Database.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Price{ get; set; }
        public string Adress { get; set; }
        public DateTime Date { get; set; }
        public string Description{ get; set; }

    }
}

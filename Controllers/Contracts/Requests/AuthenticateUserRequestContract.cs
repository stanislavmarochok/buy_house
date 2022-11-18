namespace buy_house.Controllers.Contracts.Requests
{
    public class AuthenticateUserRequestContract
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}

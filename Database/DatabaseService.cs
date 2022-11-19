using buy_house.Controllers.Contracts.Requests;
using buy_house.Controllers.Contracts.Responses;
using buy_house.Database.Models;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

using UserDomain = buy_house.Database.Models.User;
using ItemDomain = buy_house.Database.Models.Item;

namespace buy_house.Database
{
    public class DatabaseService : IDatabaseService
    {
        private readonly BuyHouseDbContext _context;
        private readonly IHostingEnvironment _hostingEnvironment;

        public DatabaseService(
            BuyHouseDbContext buyHouseDbContext,
            IHostingEnvironment hostingEnvironment)
        {
            _context = buyHouseDbContext;
            _hostingEnvironment = hostingEnvironment;
        }

        public List<UserDomain> GetAllUsers()
        {
            return _context.Users.ToList();
        }

        public List<Item> GetAllItems(GetAllItemsFilteredRequestContract request)
        {
            var allItems = _context.Items.AsEnumerable();
            allItems = allItems.Where(item => string.IsNullOrEmpty(request.Title) || item.Title.Contains(request.Title));
            allItems = allItems.Where(item => string.IsNullOrEmpty(request.Location) || item.Address.Contains(request.Location));
            allItems = allItems.Where(item => request.PriceMin == null || item.Price >= request.PriceMin);
            allItems = allItems.Where(item => (request.PriceMax == null || request.PriceMax == 0) || item.Price <= request.PriceMax);
            return allItems.ToList();
        }

        public Item GetItemById(int id)
        {
            return _context.Items.FirstOrDefault(item => item.Id == id);
        }

        public RegisterUserResponseContract RegisterUser(RegisterUserRequestContract request)
        {
            UserDomain newUser = new UserDomain
            {
                Name = request.Name,
                Email = request.Email,
                Password = hashPassword(request.Password)
            };

            _context.Users.Add(newUser);
            _context.SaveChanges();

            RegisterUserResponseContract response = new RegisterUserResponseContract
            {
                ResponseCode = 200,
                ResponseBody = newUser
            };
            return response;
        }

        public AuthenticateUserResponseContract AuthenticateUser(AuthenticateUserRequestContract request)
        {
            UserDomain existingUser = _context.Users.FirstOrDefault(user => user.Email.Equals(request.Email) && user.Password.Equals(request.Password));

            AuthenticateUserResponseContract response;
            if (existingUser == null)
            {
                response = new AuthenticateUserResponseContract
                {
                    ResponseCode = 400,
                    ResponseBody = new {
                        Message = $"User {request.Email} was not found, or password doesn't match."
                    }
                };
            } else
            {
                response = new AuthenticateUserResponseContract
                {
                    ResponseCode = 200,
                    ResponseBody = new {
                        Message = $"User {request.Email} was successfully authenticated.",
                        Id = existingUser.Id,
                        Email = existingUser.Email
                    }
                };
            }

            return response;
        }

        public AddItemResponseContract AddItem(AddItemRequestContract request)
        {
            try
            {
                string imageName = $"{Guid.NewGuid()}.jpg";
                string publicLocation = Path.Combine("images\\items", imageName);
                string solutionLocation = Path.Combine("ClientApp\\public", publicLocation);
                string imageFullPath = Path.Combine(Directory.GetCurrentDirectory(), solutionLocation);
                using (Stream stream = new FileStream(imageFullPath, FileMode.Create))
                {
                    request.Image.CopyTo(stream);
                }

                ItemDomain newItem = new ItemDomain
                {
                    UserId = request.UserId,
                    Title = request.Title,
                    Price = request.Price,
                    Address = request.Address,
                    Date = DateTime.Now,
                    Description = request.Description,
                    ImageName = imageName
                };

                _context.Items.Add(newItem);
                _context.SaveChanges();

                return new AddItemResponseContract
                {
                    ResponseCode = 200,
                    ResponseBody = newItem
                };
            }
            catch (Exception e)
            {

            }

            return new AddItemResponseContract
            {
                ResponseCode = 500,
                ResponseBody = new
                {
                    Message = "Error occured while saving image."
                }
            };
        }

        private string hashPassword(string password)
        {
            return password;
        }
    }
}

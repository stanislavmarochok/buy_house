using buy_house.Controllers.Contracts.Requests;
using buy_house.Controllers.Contracts.Responses;
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

        public DatabaseService(
            BuyHouseDbContext buyHouseDbContext)
        {
            _context = buyHouseDbContext;
        }

        public List<UserDomain> GetAllUsers()
        {
            return _context.Users.ToList();
        }

        public ResponseContract GetAllItems(GetAllItemsFilteredRequestContract request)
        {
            IEnumerable<ItemDomain> allItems = _context.Items.AsEnumerable();
            allItems = allItems.Where(item => request.UserId == null || item.UserId == request.UserId);
            allItems = allItems.Where(item => string.IsNullOrEmpty(request.Title) || item.Title.Contains(request.Title));
            allItems = allItems.Where(item => string.IsNullOrEmpty(request.Location) || item.Address.Contains(request.Location));
            allItems = allItems.Where(item => request.PriceMin == null || item.Price >= request.PriceMin);
            allItems = allItems.Where(item => (request.PriceMax == null || request.PriceMax == 0) || item.Price <= request.PriceMax);

            int allItemsCount = allItems.Count();

            allItems = allItems.Skip(request.ItemsPerPage * request.Page).Take(request.ItemsPerPage);

            ResponseContract responseContract = new ResponseContract
            {
                ResponseCode = 200,
                ResponseBody = new
                {
                    PagesCount = (int)Math.Floor((double)allItemsCount / request.ItemsPerPage),
                    Items = allItems.ToList()
                }
            };

            return responseContract;
        }

        public ItemDomain GetItemById(int id)
        {
            return _context.Items.FirstOrDefault(item => item.Id == id);
        }

        public ResponseContract RegisterUser(RegisterUserRequestContract request)
        {
            UserDomain newUser = new UserDomain
            {
                Name = request.Name,
                Email = request.Email,
                Password = hashPassword(request.Password)
            };

            _context.Users.Add(newUser);
            _context.SaveChanges();

            ResponseContract response = new ResponseContract
            {
                ResponseCode = 200,
                ResponseBody = newUser
            };
            return response;
        }

        public ResponseContract AuthenticateUser(AuthenticateUserRequestContract request)
        {
            UserDomain existingUser = _context.Users.FirstOrDefault(user => user.Email.Equals(request.Email) && user.Password.Equals(request.Password));

            ResponseContract response;
            if (existingUser == null)
            {
                response = new ResponseContract
                {
                    ResponseCode = 400,
                    ResponseBody = new {
                        Message = $"User {request.Email} was not found, or password doesn't match."
                    }
                };
            } else
            {
                response = new ResponseContract
                {
                    ResponseCode = 200,
                    ResponseBody = new {
                        Message = $"User {request.Email} was successfully authenticated.",
                        Id = existingUser.Id,
                        Email = existingUser.Email,
                        Name = existingUser.Name
                    }
                };
            }

            return response;
        }

        public ResponseContract AddItem(AddItemRequestContract request)
        {
            const string publicLocationDirectory = "images\\items";
            try
            {
                string imageName = "no-image.jpg";
                bool shouldCreateNewImage = request.Image != null;
                if (shouldCreateNewImage)
                {
                    imageName = $"{Guid.NewGuid()}.jpg";
                    string publicLocation = Path.Combine(publicLocationDirectory, imageName);
                    string solutionLocation = Path.Combine("ClientApp\\public", publicLocation);
                    string imageFullPath = Path.Combine(Directory.GetCurrentDirectory(), solutionLocation);
                    using (Stream stream = new FileStream(imageFullPath, FileMode.Create))
                    {
                        request.Image.CopyTo(stream);
                    }
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

                return new ResponseContract
                {
                    ResponseCode = 200,
                    ResponseBody = newItem
                };
            }
            catch (Exception e)
            {

            }

            return new ResponseContract
            {
                ResponseCode = 500,
                ResponseBody = new
                {
                    Message = "Error occured while saving image."
                }
            };
        }

        public ResponseContract UpdateItem(UpdateItemRequestContract request)
        {
            const string publicLocationDirectory = "images\\items";
            try
            {
                string imageName = "no-image.jpg";
                bool shouldCreateNewImage = request.Image != null;
                if (shouldCreateNewImage)
                {
                    imageName = $"{Guid.NewGuid()}.jpg";
                    string publicLocation = Path.Combine(publicLocationDirectory, imageName);
                    string solutionLocation = Path.Combine("ClientApp\\public", publicLocation);
                    string imageFullPath = Path.Combine(Directory.GetCurrentDirectory(), solutionLocation);
                    using (Stream stream = new FileStream(imageFullPath, FileMode.Create))
                    {
                        request.Image.CopyTo(stream);
                    }
                }

                ItemDomain updatableItem = _context.Items.FirstOrDefault(item => item.Id == request.Id);
                if (updatableItem == null)
                {
                    return new ResponseContract
                    {
                        ResponseCode = 400,
                        ResponseBody = new
                        {
                            Message = $"Item with Id {request.Id} doesn't exist."
                        }
                    };
                }

                if (shouldCreateNewImage)
                {
                    // remote the old image
                    imageName = $"{updatableItem.ImageName}";
                    string publicLocation = Path.Combine(publicLocationDirectory, imageName);
                    string solutionLocation = Path.Combine("ClientApp\\public", publicLocation);
                    string oldImageFullPath = Path.Combine(Directory.GetCurrentDirectory(), solutionLocation);
                    Directory.Delete(oldImageFullPath);
                }

                updatableItem.Title = request.Title;
                updatableItem.Price = request.Price;
                updatableItem.Address = request.Address;
                updatableItem.Date = DateTime.Now;
                updatableItem.Description = request.Description;
                updatableItem.ImageName = imageName;

                _context.SaveChanges();

                return new ResponseContract
                {
                    ResponseCode = 200,
                    ResponseBody = updatableItem
                };
            }
            catch (Exception e)
            {

            }

            return new ResponseContract
            {
                ResponseCode = 500,
                ResponseBody = new
                {
                    Message = "Error occured while updating image."
                }
            };
        }

        private string hashPassword(string password)
        {
            return password;
        }
    }
}

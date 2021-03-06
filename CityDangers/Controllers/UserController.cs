using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.WindowsAzure.Storage.Table;
using Models;
using Repositories;

namespace CityDangers.Controllers
{
    [ApiController]
    [Route("/api/user")]
    public class UserController : Controller
    {
        private IUserRepository _usersRepository;
        public UserController(IUserRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Post([FromBody] UserRegister user_test)
        {
            var user = new UserEntity(user_test.city, user_test.username);
            user.firstName = user_test.firstName;
            user.lastName = user_test.lastName;
            user.email = user_test.email;
            user.password = user_test.password;
            user.points = 0;
            try
            {

                await _usersRepository.InsertNewUser(user);
                return Ok("success");
   
            }
            catch (System.Exception e)
            {
                Console.WriteLine("Error: {0}", e);
                return BadRequest(new {message = "failure"});
                
            } 
                    
        }

        [HttpPost("updatepoints")]
        public async Task UpdateUserPoints(Username user_test)
        {
            await _usersRepository.UpdateUserPoints(user_test.userstring);
        }

        [HttpPost("getuser")]
        public async Task<JsonResult> GetUser(Username user_test)
        {
            var user = new UserEntity();
            user = await _usersRepository.GetUser(user_test.userstring);
            return Json(user);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Post(UserLogin user_login)
        {  
            string _getpass = await _usersRepository.GetUserPass(user_login.username);
            if( _getpass == null)
              return BadRequest(new {message = "login failed"});
            else
            {
              if(_getpass != user_login.password)
                return BadRequest(new {message = "login failed"});
              else
                return Ok(new {message = "login success"});
            }
              
            
        }

        

    }
}

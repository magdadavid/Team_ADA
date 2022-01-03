using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

public interface IUserRepository
{
    Task InsertNewUser(UserEntity user);
    Task<string> GetUserPass(string username);
}
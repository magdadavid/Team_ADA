using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

public interface IUserRepository
{
    Task InsertNewUser(UserEntity user);
    Task<string> GetUserPass(string username);
    Task<List<UserEntity>> GetAllUsers();
    Task<UserEntity> GetUser(string username);
    Task UpdateUserPoints(string username);
}
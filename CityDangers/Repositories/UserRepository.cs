using System;
using System.Collections.Generic;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using Models;
using Newtonsoft.Json;

namespace Repositories
{
    public class UsersRepository : IUserRepository
    {
        private string _connectionString;

        private CloudTableClient _tableClient;

        private CloudTable _usersTable;

        public UsersRepository(IConfiguration configuration)
        {
            _connectionString = "DefaultEndpointsProtocol=https;AccountName=citydangers;AccountKey=kQMvolJOXTP+31blMJ/B14XTP2mjfCPcK171gcJ2tMOJlqa3+MiVouS/OiKQWaLzTnxQ6CJE5pPyGMD0ScYRyw==;EndpointSuffix=core.windows.net";

            Task.Run(async () => { await InitializeTable(); }).GetAwaiter().GetResult();
        }

        public async Task<List<UserEntity>> GetAllUsers()
        {
            var users = new List<UserEntity>();

            TableQuery<UserEntity> query = new TableQuery<UserEntity>(); 

            TableContinuationToken token = null;
            do
            {
                TableQuerySegment<UserEntity> resultSegment = await _usersTable.ExecuteQuerySegmentedAsync(query, token);
                token = resultSegment.ContinuationToken;

                users.AddRange(resultSegment.Results);

            } while (token != null);

            return users;
        }
        public async Task InsertNewUser(UserEntity user)
        {
            var insertOperation = TableOperation.Insert(user);
            await _usersTable.ExecuteAsync(insertOperation);
            
        }

        public async Task<UserEntity> GetUser(string username)
        {
            
            TableQuery<UserEntity> query = new TableQuery<UserEntity>();

            TableContinuationToken token = null;
            do
            {
            TableQuerySegment<UserEntity> resultSegment = await _usersTable.ExecuteQuerySegmentedAsync(query, token);
            token = resultSegment.ContinuationToken;

            foreach (UserEntity entity in resultSegment.Results)
            {
                if(entity.RowKey == username)
                    return entity;
            }
            }while (token != null);
             
            return null;
             

           
        }

        public async Task UpdateUserPoints(string username)
        {
            var user = new UserEntity();
            TableQuery<UserEntity> query = new TableQuery<UserEntity>();

            TableContinuationToken token = null;
            do
            {
            TableQuerySegment<UserEntity> resultSegment = await _usersTable.ExecuteQuerySegmentedAsync(query, token);
            token = resultSegment.ContinuationToken;

            foreach (UserEntity entity in resultSegment.Results)
            {
                if(entity.RowKey == username)
                   user = entity; 
            }
            }while (token != null);
            user.points += 10;
            var editOperation = TableOperation.Merge(user);
            try{
                await _usersTable.ExecuteAsync(editOperation);
            }
            catch (StorageException e)
            {
                Console.WriteLine("{0}", e);
            }


        }

        public async Task<string> GetUserPass(string _username)
        {
            
        
            TableQuery<UserEntity> query = new TableQuery<UserEntity>();

            TableContinuationToken token = null;
            do
            {
            TableQuerySegment<UserEntity> resultSegment = await _usersTable.ExecuteQuerySegmentedAsync(query, token);
            token = resultSegment.ContinuationToken;

            foreach (UserEntity entity in resultSegment.Results)
            {
                if(entity.RowKey == _username)
                    return entity.password;
            }
            }while (token != null);
             
            return null;
        }

        public async Task EditUser(UserEntity student)
        {
            
        }

        private async Task InitializeTable()
        {
            var account = CloudStorageAccount.Parse(_connectionString);
            _tableClient = account.CreateCloudTableClient();

            _usersTable = _tableClient.GetTableReference("users");

            await _usersTable.CreateIfNotExistsAsync();

        }

    }
}
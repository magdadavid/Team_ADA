using Microsoft.WindowsAzure.Storage.Table;

namespace Models{

    public class UserEntity : TableEntity
    {
        public UserEntity(string city, string username)
        {
            this.PartitionKey = city;
            this.RowKey = username;
        }
        public UserEntity(){}
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public long points {get; set;}

    }
}
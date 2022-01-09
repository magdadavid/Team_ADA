using Microsoft.WindowsAzure.Storage.Table;

namespace Models{

    public class UserRegister
    {
        public UserRegister(){}
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string city { get; set; }
        public string email { get; set; }
        public string username { get; set; }
        public string password { get; set; }

    }
}
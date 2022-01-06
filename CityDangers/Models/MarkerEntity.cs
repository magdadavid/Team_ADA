using Microsoft.WindowsAzure.Storage.Table;

namespace Models{

    public class MarkerEntity : TableEntity
    {
        public MarkerEntity(string username, string date)
        {
            this.PartitionKey = username;
            this.RowKey = date;
        }
        public MarkerEntity(){}
        public double latitude { get; set; }
        public double longitude { get; set; }
        public string message { get; set; }

    }
}
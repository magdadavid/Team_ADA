using Microsoft.WindowsAzure.Storage.Table;

namespace Models{

    public class MetricsEntity : TableEntity
    {
        public MetricsEntity(string city, string username)
        {
            this.PartitionKey = city;
            this.RowKey = username;
        }
        public MetricsEntity(){}
        public int totalmarkers { get; set; }
        public int confmarkers { get; set; }
        public int unconfmarkers { get; set; }
      

    }
}
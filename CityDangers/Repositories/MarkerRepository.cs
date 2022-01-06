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
    public class MarkerRepository : IMarkerRepository
    {
        private string _connectionString;

        private CloudTableClient _tableClient;

        private CloudTable _markersTable;

        public MarkerRepository(IConfiguration configuration)
        {
            _connectionString = "DefaultEndpointsProtocol=https;AccountName=citydangers;AccountKey=kQMvolJOXTP+31blMJ/B14XTP2mjfCPcK171gcJ2tMOJlqa3+MiVouS/OiKQWaLzTnxQ6CJE5pPyGMD0ScYRyw==;EndpointSuffix=core.windows.net";

            Task.Run(async () => { await InitializeTable(); }).GetAwaiter().GetResult();
        }

        public async Task<List<MarkerEntity>> GetAllMarkers()
        {
            var markers = new List<MarkerEntity>();

            TableQuery<MarkerEntity> query = new TableQuery<MarkerEntity>(); 

            TableContinuationToken token = null;
            do
            {
                TableQuerySegment<MarkerEntity> resultSegment = await _markersTable.ExecuteQuerySegmentedAsync(query, token);
                token = resultSegment.ContinuationToken;

                markers.AddRange(resultSegment.Results);

            } while (token != null);

            return markers;
        }
        public async Task InsertNewMarker(MarkerEntity marker)
        {
            var insertOperation = TableOperation.Insert(marker);
            await _markersTable.ExecuteAsync(insertOperation);   
        }

        public async Task DeleteMarker(string pKey, string rKey)
        {
            var entity = new DynamicTableEntity(pKey, rKey) {ETag = "*"};
            await _markersTable.ExecuteAsync(TableOperation.Delete(entity));
        }

        public async Task<List<MarkerEntity>> GetMarkersByUser(string user)
        {
            var markers = new List<MarkerEntity>();

            TableQuery<MarkerEntity> query = new TableQuery<MarkerEntity>(); 

            TableContinuationToken token = null;
            do
            {
                TableQuerySegment<MarkerEntity> resultSegment = await _markersTable.ExecuteQuerySegmentedAsync(query, token);
                token = resultSegment.ContinuationToken;
                foreach (MarkerEntity entity in resultSegment.Results)
                {
                    if(entity.PartitionKey == user)
                       markers.Add(entity);
                }
                
            } while (token != null);

            return markers;

        }

        

        private async Task InitializeTable()
        {
            var account = CloudStorageAccount.Parse(_connectionString);
            _tableClient = account.CreateCloudTableClient();

            _markersTable = _tableClient.GetTableReference("markers");

            await _markersTable.CreateIfNotExistsAsync();

        }

    }
}
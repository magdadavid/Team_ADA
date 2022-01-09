using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using Models;

namespace BackgroundWorker
{
    class Program
    {
        private static CloudTableClient tableClient;
        private static CloudTable usersTable, markersTable, metricsTable;

        private static int totalmarkers, confmarkers, unconfmarkers;
        static void Main(string[] args)
        {
             Task.Run(async () => { await Initialize(); })
                .GetAwaiter()
                .GetResult();
        }

        static async Task Initialize()
        {
            string connectionString = "DefaultEndpointsProtocol=https;AccountName=citydangers;AccountKey=kQMvolJOXTP+31blMJ/B14XTP2mjfCPcK171gcJ2tMOJlqa3+MiVouS/OiKQWaLzTnxQ6CJE5pPyGMD0ScYRyw==;EndpointSuffix=core.windows.net";
            var account = CloudStorageAccount.Parse(connectionString);
            tableClient = account.CreateCloudTableClient();

            usersTable = tableClient.GetTableReference("users");
            markersTable = tableClient.GetTableReference("markers");
            metricsTable = tableClient.GetTableReference("metrics");

            await usersTable.CreateIfNotExistsAsync();
            await markersTable.CreateIfNotExistsAsync();
            await metricsTable.CreateIfNotExistsAsync();

            await AddMetrics();


        }

        private static async Task AddMetrics()
        {
            var users = new List<UserEntity>();

            TableQuery<UserEntity> query = new TableQuery<UserEntity>(); 

            TableContinuationToken token = null;
            do
            {
                TableQuerySegment<UserEntity> resultSegment = await usersTable.ExecuteQuerySegmentedAsync(query, token);
                token = resultSegment.ContinuationToken;

                foreach (UserEntity entity in resultSegment.Results)
                {
                    
                    await CalculateMetrics(entity.RowKey);
                    await InsertMetric(entity.PartitionKey, entity.RowKey, totalmarkers, confmarkers, unconfmarkers);
                  
                }

            } while (token != null);

            
        }

        private static async Task CalculateMetrics(string username)
        {
            var markers = new List<MarkerEntity>();

            TableQuery<MarkerEntity> query = new TableQuery<MarkerEntity>(); 

            TableContinuationToken token = null;

            totalmarkers = 0;
            confmarkers = 0;
            unconfmarkers = 0;

            do
            {
                TableQuerySegment<MarkerEntity> resultSegment = await markersTable.ExecuteQuerySegmentedAsync(query, token);
                token = resultSegment.ContinuationToken;

                foreach (MarkerEntity entity in resultSegment.Results)
                {
                    if(entity.PartitionKey == username)
                    {
                       if(entity.confirmed == true)
                          confmarkers++;
                       else if(entity.confirmed == false)
                          unconfmarkers++;
                       totalmarkers++;        
                    }
                }

            } while (token != null);

        }

        private static async Task InsertMetric(string city, string username, int total, int conf, int unconf)
        {
            var _metric = new MetricsEntity(city, username);
            _metric.totalmarkers = total;
            _metric.confmarkers = conf;
            _metric.unconfmarkers = unconf;
        
            var insertOperation = TableOperation.InsertOrMerge(_metric);
            await metricsTable.ExecuteAsync(insertOperation);


        }
    }
}

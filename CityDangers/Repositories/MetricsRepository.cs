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
    public class MetricsRepository : IMetricsRepository
    {
        private string _connectionString;

        private CloudTableClient _tableClient;

        private CloudTable _metricsTable;

        public MetricsRepository(IConfiguration configuration)
        {
            _connectionString = "DefaultEndpointsProtocol=https;AccountName=citydangers;AccountKey=kQMvolJOXTP+31blMJ/B14XTP2mjfCPcK171gcJ2tMOJlqa3+MiVouS/OiKQWaLzTnxQ6CJE5pPyGMD0ScYRyw==;EndpointSuffix=core.windows.net";

            Task.Run(async () => { await InitializeTable(); }).GetAwaiter().GetResult();
        }

        public async Task<MetricsEntity> GetMetricByUser(string username)
        {
            TableQuery<MetricsEntity> query = new TableQuery<MetricsEntity>();

            TableContinuationToken token = null;
            do
            {
            TableQuerySegment<MetricsEntity> resultSegment = await _metricsTable.ExecuteQuerySegmentedAsync(query, token);
            token = resultSegment.ContinuationToken;

            foreach (MetricsEntity entity in resultSegment.Results)
            {
                if(entity.RowKey == username)
                    return entity;
            }
            }while (token != null);
             
            return null;
            

        }

        private async Task InitializeTable()
        {
            var account = CloudStorageAccount.Parse(_connectionString);
            _tableClient = account.CreateCloudTableClient();

            _metricsTable = _tableClient.GetTableReference("metrics");

            await _metricsTable.CreateIfNotExistsAsync();

        }

    }
}
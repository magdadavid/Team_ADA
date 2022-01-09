using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

public interface IMetricsRepository
{
    
    Task<MetricsEntity> GetMetricByUser(string username);
    
}
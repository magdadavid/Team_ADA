using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.WindowsAzure.Storage.Table;
using Models;
using Repositories;

namespace CityDangers.Controllers
{
    [ApiController]
    [Route("/api/metrics")]
    public class MetricsController : Controller
    {
        private IMetricsRepository _metricsRepository;
        public MetricsController(IMetricsRepository metricsRepository)
        {
            _metricsRepository = metricsRepository;
        }

        [HttpPost("getusermetrics")]
        public async Task<IActionResult> GetUserMetrics(Username user_test)
        {
            var userMetrics = new MetricsEntity();
            userMetrics = await _metricsRepository.GetMetricByUser(user_test.userstring);
            return Json(userMetrics);


        }

    }
}
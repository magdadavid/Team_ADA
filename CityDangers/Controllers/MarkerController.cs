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
    [Route("/api/marker")]
    public class MarkerController : Controller
    {
        private IMarkerRepository _markerRepository;
        public MarkerController(IMarkerRepository markerRepository)
        {
            _markerRepository = markerRepository;
        }

        [HttpPost("addmarker")]
        public async Task<IActionResult> PostMarker(Marker marker_test)
        {
            var marker = new MarkerEntity(marker_test.markeruser, marker_test.markerdate);
            marker.latitude = marker_test.markerlat;
            marker.longitude = marker_test.markerlong;
            marker.message = marker_test.markermess;
            
            try
            {

                await _markerRepository.InsertNewMarker(marker);
                return Ok("success");
   
            }
            catch (System.Exception e)
            {
                Console.WriteLine("Error: {0}", e);
                return BadRequest(new {message = "failure"});
                
            } 

            
                    
        }
        [HttpPost("getbyuser")]
        public async Task<JsonResult> GetMarkerByUser(Username user_test)
        {
              var markers = new List<MarkerEntity>();
              markers = await _markerRepository.GetMarkersByUser(user_test.userstring);
              return Json(markers);
        }

        [HttpPost("delete")]
        public async Task<IActionResult> DeleteMarker(Marker marker_test)
        {
            try
            {
                await _markerRepository.DeleteMarker(marker_test.markeruser, marker_test.markerdate);
                return Ok("success");
            }
            catch (System.Exception e)
            {
                Console.WriteLine("{0}", e);
                return BadRequest(new {message = "failure"});
            }
        }

        [HttpGet("getall")]
        public async Task<JsonResult> GetAllMarkers()
        {
             var markers = new List<MarkerEntity>();
             markers = await _markerRepository.GetAllMarkers();
             return Json(markers);
        }

    }
}
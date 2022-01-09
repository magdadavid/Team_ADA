using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

public interface IMarkerRepository
{
        Task<List<MarkerEntity>> GetAllMarkers();
        Task InsertNewMarker(MarkerEntity marker);
        Task<List<MarkerEntity>> GetMarkersByUser(string user);
        Task DeleteMarker(string pKey, string rKey);
        Task ConfirmMarker(string username, string date);
}     
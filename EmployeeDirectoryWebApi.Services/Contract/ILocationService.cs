using EmployeeDirectoryWebApi.Models;

namespace EmployeeDirectoryWebApi.Services.Contract
{
    public interface ILocationService
    {
        List<Location> GetLocations();
        string? GetLocationName(int id);
    }
}
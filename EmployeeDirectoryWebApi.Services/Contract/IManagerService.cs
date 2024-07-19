using EmployeeDirectoryWebApi.Models;

namespace EmployeeDirectoryWebApi.Services.Contract
{
    public interface IManagerService
    {
        string? GetManagerName(int id);
        List<Manager> GetManagers();
    }
}
using EmployeeDirectoryWebApi.Data.Models;

namespace EmployeeDirectoryWebApi.Data.Contract
{
    public interface IManagerRepositary
    {
        List<Manager> GetManagers();
        string? GetMangerNameById(int id);
    }
}
using EmployeeDirectoryWebApi.Models;

namespace EmployeeDirectoryWebApi.Services.Contract
{
    public interface IDepartmentService
    {
        List<Department> GetDepartments();
        string? GetDepartmentName(int id);
        Department? GetDepartmentById(int id);
    }
}
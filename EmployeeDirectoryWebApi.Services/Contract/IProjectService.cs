using EmployeeDirectoryWebApi.Models;

namespace EmployeeDirectoryWebApi.Services.Contract
{
    public interface IProjectService
    {
        string? GetProjectName(int? id);
        List<Project> GetProjects();
    }
}
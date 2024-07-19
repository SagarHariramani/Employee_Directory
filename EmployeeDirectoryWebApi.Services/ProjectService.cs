using AutoMapper;
using EmployeeDirectoryWebApi.Data.Contract;
using EmployeeDirectoryWebApi.Models;
using EmployeeDirectoryWebApi.Services.Contract;

namespace EmployeeDirectoryWebApi.Services
{
    public class ProjectService : IProjectService
    {
        readonly IMapper _mapper;
        readonly IGenericRepositary<Data.Models.Project> _genericRepositary;
        public ProjectService(IMapper mapper, IGenericRepositary<Data.Models.Project> project)
        {
            _mapper = mapper;
            _genericRepositary = project;
        }
        public List<Project> GetProjects()
        {
            var projects = _mapper.Map<List<Data.Models.Project>, List<Models.Project>>(_genericRepositary.GetData());
            return projects;
        }
        public string? GetProjectName(int? id)
        {
            return _genericRepositary.GetNameById(id);
        }
    }
}

using AutoMapper;
using EmployeeDirectoryWebApi.Data.Contract;
using EmployeeDirectoryWebApi.Models;
using EmployeeDirectoryWebApi.Services.Contract;

namespace EmployeeDirectoryWebApi.Services
{
    public class DepartmentService : IDepartmentService
    {
        readonly IGenericRepositary<Data.Models.Department> _genericRepositary;
        readonly IMapper _mapper;
        public DepartmentService(IMapper mapper, IGenericRepositary<Data.Models.Department> genericRepositary)
        {
            _mapper = mapper;
            _genericRepositary = genericRepositary;
        }
        public List<Department> GetDepartments()
        {
            var departments = _mapper.Map<List<Data.Models.Department>, List<Models.Department>>(_genericRepositary.GetData());
            return departments;
        }
        public string? GetDepartmentName(int id)
        {
            return _genericRepositary.GetNameById(id);
        }
        public Department? GetDepartmentById(int id)
        {
            var department = _mapper.Map<Data.Models.Department, Models.Department>(_genericRepositary.GetDataById(id)!);
            return department;
        }
    }
}

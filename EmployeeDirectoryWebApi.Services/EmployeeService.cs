using AutoMapper;
using EmployeeDirectoryWebApi.Data.Contract;
using EmployeeDirectoryWebApi.Models;
using EmployeeDirectoryWebApi.Services.Contract;

namespace EmployeeDirectoryWebApi.Services
{

    public class EmployeeService : IEmployeeService
    {
        readonly IEmployeeRepositary _employeeHandler;
        readonly IMapper _mapper;
        public EmployeeService(IEmployeeRepositary employeeHandler, IMapper mapper)
        {
            _employeeHandler = employeeHandler;
            _mapper = mapper;
        }

        public void AddEmployee(Employee emp)
        {
            var employee = _mapper.Map<Models.Employee, Data.Models.Employee>(emp);
            _employeeHandler.AddEmployee(employee);
        }
        //public void EditEmployee<T>(string empId, Enum fieldName, T fieldInputData)
        //{
        //    _employeeHandler.Update(empId, fieldName, fieldInputData);
        //}
        public void EditEmployee(int id,Employee emp)
        {
            var employee = _mapper.Map<Models.Employee, Data.Models.Employee>(emp);
            _employeeHandler.UpdateEmployee(id, employee);
        }
        public void DeleteEmployee(int employeeId)
        {
            _employeeHandler.Delete(employeeId);
        }
        public Employee? GetEmployeeById(int empId)
        {
            var emp = _mapper.Map<Data.Models.Employee, Models.Employee>(_employeeHandler.GetEmployeeById(empId)!);
            return emp;
        }
        public List<Employee> GetEmployee()
        {
            var employee = _mapper.Map<List<Data.Models.Employee>, List<Models.Employee>>(_employeeHandler.GetEmployees());
            return employee;
        }
        public List<Employee> GetUnassignedEmployees()
        {
            var employee = _mapper.Map<List<Data.Models.Employee>, List<Models.Employee>>(_employeeHandler.GetUnassignedEmployees());
            return employee;
        }
    }
}

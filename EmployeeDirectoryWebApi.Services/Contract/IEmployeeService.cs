using EmployeeDirectoryWebApi.Models;

namespace EmployeeDirectoryWebApi.Services.Contract
{
    public interface IEmployeeService
    {
        void AddEmployee(Employee employee);
        //void EditEmployee<T>(string empId, Enum fieldName, T fieldInputData);
        void EditEmployee(int id, Employee emp);
        void DeleteEmployee(int employeeId);
        Employee? GetEmployeeById(int employeeId);
        List<Employee> GetEmployee();
        List<Employee> GetUnassignedEmployees();
    }
}

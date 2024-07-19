using EmployeeDirectoryWebApi.Data.Models;

namespace EmployeeDirectoryWebApi.Data.Contract
{
    public interface IEmployeeRepositary
    {
        void AddEmployee(Employee employee);
        List<Employee> GetEmployees();
        List<Employee> GetUnassignedEmployees();
        Employee? GetEmployeeById(int empId);
        void Update<T>(string empId, Enum fieldName, T fieldInputData);
        void UpdateEmployee(int empId, Employee employee);
        void Delete(int empId);

    }
}
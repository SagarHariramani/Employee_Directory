using EmployeeDirectoryWebApi.Data.Contract;
using EmployeeDirectoryWebApi.Data.Models;

namespace EmployeeDirectoryWebApi.Data.Repositary
{
    public class EmployeeRepositary : IEmployeeRepositary
    {
        public void AddEmployee(Employee employee)
        {
            using (var context = new SagarEmployeeDirectoryDbContext())
            {
                employee.Status ="Active";
                
                employee.CreatedOn = DateTime.UtcNow;
                employee.CreatedBy = "System";
                context.Employees.Add(employee);
                context.SaveChanges();
            }
        }
        public List<Employee> GetEmployees()
        {
            using (var context = new SagarEmployeeDirectoryDbContext())
            {
                List<Employee> employees = context.Employees.Where(e => e.IsDeleted != true).ToList();
                return employees;
            }
        }

        public List<Employee> GetUnassignedEmployees()
        {
            using(var context=new SagarEmployeeDirectoryDbContext())
            {
                List<Employee> employees = context.Employees.Where(e => e.RoleId == null).ToList();
                return employees;
            }
        }

        public Employee? GetEmployeeById(int empId)
        {
            using (var context = new SagarEmployeeDirectoryDbContext())
            {
                Employee? emp = context.Employees.FirstOrDefault(e => e.Id == empId && !e.IsDeleted);
                return emp;
            }
        }
        public void Update<T>(string empId, Enum fieldName, T fieldInputData)
        {
            using (var context = new SagarEmployeeDirectoryDbContext())
            {
                Employee emp = context.Employees.FirstOrDefault(e => e.EmpId == empId && !e.IsDeleted)!;
                var propertyInfo = typeof(Employee).GetProperty(fieldName.ToString())!;
                propertyInfo.SetValue(emp, fieldInputData);
                emp.UpdatedOn = DateTime.UtcNow;
                emp.UpdatedBy = "System";
                context.SaveChanges();
            }
        }
        public void UpdateEmployee(int  empId, Employee employee)
        {
            using(var context = new SagarEmployeeDirectoryDbContext())
            {
                Employee emp = context.Employees.FirstOrDefault(e => e.Id == empId && !e.IsDeleted)!;
                if (emp != null)
                {
                    emp.EmpId=employee.EmpId;
                    emp.FirstName = employee.FirstName;
                    emp.LastName = employee.LastName;
                    emp.Dob=employee.Dob;
                    emp.Email = employee.Email;
                    emp.PhoneNo = employee.PhoneNo;
                    emp.JoiningDate=employee.JoiningDate;
                    emp.RoleId=employee.RoleId;
                    emp.ManagerId=employee.ManagerId;
                    emp.ProjectId=employee.ProjectId;
                    emp.Status=employee.Status;
                    emp.IsDeleted=employee.IsDeleted;
                    emp.UpdatedOn = DateTime.UtcNow;
                    emp.UpdatedBy = "System";
                    emp.ProfilePicture=employee.ProfilePicture;
                    context.SaveChanges();
                }
                else
                {
                    throw new Exception("Employee with EmployeeId:{empId}Not Found!");
                }
                

            }
        }
        public void Delete(int empId)
        {
            using (var context = new SagarEmployeeDirectoryDbContext())
            {
                Employee emp = context.Employees.FirstOrDefault(e => e.Id == empId && !e.IsDeleted)!;
                emp.IsDeleted = true;
                context.SaveChanges();
            }
        }
    }
}


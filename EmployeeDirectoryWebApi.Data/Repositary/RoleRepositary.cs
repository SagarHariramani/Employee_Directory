using EmployeeDirectoryWebApi.Data.Contract;
using EmployeeDirectoryWebApi.Data.Models;

namespace EmployeeDirectoryWebApi.Data.Repositary
{
    public class RoleRepositary : IRoleRepositary
    {
        public void AddRole(Role role)
        {
            using (var context = new SagarEmployeeDirectoryDbContext())
            {
                context.Roles.Add(role);
                context.SaveChanges();
            }
        }
        public List<Role> GetRoles()
        {
            using (var context = new SagarEmployeeDirectoryDbContext())
            {
                List<Role> roles = context.Roles.ToList();
                return roles;
            }
        }
        public void Update(int roleId, string fieldName, string fieldInputData)
        {
            using (var context = new SagarEmployeeDirectoryDbContext())
            {
                Role role = context.Roles.FirstOrDefault(e => e.Id == roleId)!;
                var propertyInfo = typeof(Role).GetProperty(fieldName.ToString())!;
                propertyInfo.SetValue(role, fieldInputData);
                context.SaveChanges();
            }
        }
        public int GetRoleCount()
        {
            int count;
            using (var context = new SagarEmployeeDirectoryDbContext())
            {
                count = context.Roles.Count();
                return count;
            }
        }
        public Role? GetRoleById(int roleId)
        {
            Role? roleDetail;
            using (var context = new SagarEmployeeDirectoryDbContext())
            {
                roleDetail = context.Roles.FirstOrDefault(r => r.Id == roleId);
                return roleDetail;
            }
        }
        public int? GetRoleId(string roleName, int location, int department)
        {
            int? roleId;
            using (var context = new SagarEmployeeDirectoryDbContext())
            {
                if (roleName == "" || location == 0 || location == 0)
                {
                    roleId = null;
                    return roleId;
                }
                else
                {
                    roleId = context.Roles.FirstOrDefault(e => e.Name == roleName && e.LocationId == location && e.DepartmentId == department)!.Id;
                    return roleId;
                }
            }

        }
        public void Delete(int roleId)
        {
            using (var Context = new SagarEmployeeDirectoryDbContext())
            {
                Role role = Context.Roles.FirstOrDefault(e => e.Id == roleId)!;
                Context.Roles.Remove(role);
                Context.SaveChanges();
            }
        }
    }

}

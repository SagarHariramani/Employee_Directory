using AutoMapper;
using EmployeeDirectoryWebApi.Data.Contract;
using EmployeeDirectoryWebApi.Models;
using EmployeeDirectoryWebApi.Services.Contract;
namespace EmployeeDirectoryWebApi.Services
{
    public class RoleService : IRoleService
    {
        readonly IRoleRepositary _roleHandler;
        readonly IMapper _mapper;
        public RoleService(IRoleRepositary roleHandler, IMapper mapper)
        {
            _roleHandler = roleHandler;
            _mapper = mapper;
        }
        public void AddRole(Role role)
        {
            var role1 = _mapper.Map<Models.Role, Data.Models.Role>(role);
            _roleHandler.AddRole(role1);
        }
        public int? GetRoleId(string roleName, int location, int department)
        {
            return _roleHandler.GetRoleId(roleName, location, department);
        }
        public int GetRoleCount()
        {
            return _roleHandler.GetRoleCount();
        }
        public Role? GetRoleById(int roleId)
        {
            Role role = _mapper.Map<Data.Models.Role, Models.Role>(_roleHandler.GetRoleById(roleId)!);
            return role;
        }
        public List<Role> GetRoles()
        {
            var role = _mapper.Map<List<Data.Models.Role>, List<Models.Role>>(_roleHandler.GetRoles());
            return role;
        }


    }
}

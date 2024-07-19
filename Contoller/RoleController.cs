
using EmployeeDirectoryWebApi.Common;
using EmployeeDirectoryWebApi.Models;
using EmployeeDirectoryWebApi.Services.Contract;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeDirectoryWebApi.Controller
{
    [Route("/api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        readonly IRoleService _roleService;
        readonly IDepartmentService _departmentService;
        readonly ILocationService _locationService;
        public RoleController(IRoleService roleService, ILocationService locationService, IDepartmentService departmentService)
        {
            this._roleService = roleService;
            this._departmentService = departmentService;
            this._locationService = locationService;
        }
        
        [HttpPost]
        [ProducesResponseType(204)]
        public IActionResult Add(Role role)
        {
            if (role == null)
            {
                return BadRequest(ModelState);
            }
            _roleService.AddRole(role);
            return Ok(new { message = "Successfully Added Role" });
        }
        [HttpGet(ApiRoutes.roleCount)]
        [ProducesResponseType(200, Type = typeof(int))]
        public IActionResult GetRoleCount()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(_roleService.GetRoleCount());
        }
        [HttpGet("{roleId}")]
        [ProducesResponseType(200, Type = typeof(Role))]
        public IActionResult GetDataById(int roleId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (roleId <= 0)
            {
                return Ok(null);
            }
            else
            {
                return Ok(_roleService.GetRoleById(roleId));

            }
        }
        
        [HttpGet]
        [ProducesResponseType(200,Type=typeof(List<Role>))]
        public IActionResult GetRoles()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(_roleService.GetRoles());
        }
        [HttpGet(ApiRoutes.department)]
        [ProducesResponseType(200,Type=typeof(List<Department>))]
        public IActionResult GetDepartments()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(_departmentService.GetDepartments());
        }
        [HttpGet(ApiRoutes.location)]
        [ProducesResponseType(200, Type = typeof(List<Location>))]
        public IActionResult GetLocations()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(_locationService.GetLocations());
        }
        [HttpGet(ApiRoutes.locationName+"/{Id}")]
        [ProducesResponseType(200, Type = typeof(string))]
        public IActionResult GetLocationNameById(int Id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (Id<=0)
            {
                return Ok(null);
            }
            return Ok(_locationService.GetLocationName(Id));
        }
        [HttpGet(ApiRoutes.departmentName + "/{Id}")]
        [ProducesResponseType(200, Type = typeof(string))]
        public IActionResult GetDepartmentNameById(int Id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (Id <= 0)
            {
                return Ok(null);
            }
            return Ok(_departmentService.GetDepartmentName(Id));
        }
        [HttpGet(ApiRoutes.department + "{Id}")]
        [ProducesResponseType(200, Type = typeof(Department))]
        public IActionResult GetDepartmentById(int Id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (Id <= 0)
            {
                return Ok(null);
            }
            return Ok(_departmentService.GetDepartmentById(Id));
        }

    }
}

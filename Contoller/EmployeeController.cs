using EmployeeDirectoryWebApi.Models;
using EmployeeDirectoryWebApi.Services.Contract;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeDirectoryWebApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        
        readonly IEmployeeService _employeeService;
        readonly IManagerService _managerService;
        readonly IProjectService _projectService;
        public EmployeeController(IEmployeeService employeeService, IManagerService managerService, IProjectService projectService)
        {
            this._employeeService = employeeService;
            this._managerService = managerService;
            this._projectService = projectService;
        }
        
        [HttpGet("{empId}")]
        [ProducesResponseType(200,Type=typeof(Employee))]
        public IActionResult GetDataById(int empId)
        {
            Employee employeeData = _employeeService.GetEmployeeById(empId)!;
            if (employeeData==null)
            {
                return NotFound();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            return Ok(employeeData);
        }
        [HttpPost]
        [ProducesResponseType(204)]
        public IActionResult Add(Employee employee)
        {
            if (employee == null)
            {
                return BadRequest(ModelState);
            }
            _employeeService.AddEmployee(employee);
            return Ok(new{message= "SuccessFully Added Employee"});
        }
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(List<Employee>))]
        public IActionResult GetEmployees()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(_employeeService.GetEmployee());
        }

        [HttpGet("Unassigned")]
        [ProducesResponseType(200,Type=typeof(List<Employee>))]
        public IActionResult GetUnassignedEmployees()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(_employeeService.GetUnassignedEmployees());
        }

        [HttpDelete("Delete/{employeeId}")]
        [ProducesResponseType(204)]
        public IActionResult Delete(int employeeId)
        {
            if (employeeId == 0)
            {
                return BadRequest(ModelState);
            }
            _employeeService.DeleteEmployee(employeeId);
            return Ok(new{message= "Deleted SuccessFully"});

        }
        [HttpPut("Edit/{empId}")]
        [ProducesResponseType(204)]
        public IActionResult Edit(int empId, Employee employee)
        {
            if (empId == 0 || employee == null )
            {
                return BadRequest(ModelState);
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _employeeService.EditEmployee(empId,employee);
            return Ok(new{message= "Edited Successfully"});
        }

        [HttpGet(ApiRoutes.manager)]
        [ProducesResponseType(200, Type = typeof(List<Manager>))]
        public IActionResult GetMangers()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(_managerService.GetManagers());
        }
        [HttpGet(ApiRoutes.project)]
        [ProducesResponseType(200, Type = typeof(List<Project>))]
        public IActionResult GetProjects()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(_projectService.GetProjects());
        }
        [HttpGet(ApiRoutes.managerName+"/{id}")]
        [ProducesResponseType(200)]
        public IActionResult GetManagerName(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            string? managerName= _managerService.GetManagerName(id);
            if (managerName == null)
            {
                return NotFound();
            }
            return Ok(new { managerName });
        }
        [HttpGet(ApiRoutes.projectName + "/{id}")]
        [ProducesResponseType(200, Type = typeof(string))]
        public IActionResult? GetProjectName(int? id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            string? projectName= _projectService.GetProjectName(id);
            if (projectName == null)
            {
                return Ok(null);
            }
            return Ok(projectName);
        }


    }
}

using AutoMapper;
using EmployeeDirectoryWebApi.Data.Contract;
using EmployeeDirectoryWebApi.Models;
using EmployeeDirectoryWebApi.Services.Contract;

namespace EmployeeDirectoryWebApi.Services
{
    public class ManagerService : IManagerService
    {
        readonly IManagerRepositary _managerHandler;
        readonly IMapper _mapper;

        public ManagerService(IManagerRepositary managerHandler, IMapper mapper)
        {
            _managerHandler = managerHandler;
            _mapper = mapper;
        }
        public List<Manager> GetManagers()
        {
            var managers = _mapper.Map<List<Data.Models.Manager>, List<Models.Manager>>(_managerHandler.GetManagers());
            return managers;
        }
        public string? GetManagerName(int id)
        {
            return _managerHandler.GetMangerNameById(id);
        }
    }
}

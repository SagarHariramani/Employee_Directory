using AutoMapper;
using EmployeeDirectoryWebApi.Data.Contract;
using EmployeeDirectoryWebApi.Models;
using EmployeeDirectoryWebApi.Services.Contract;

namespace EmployeeDirectoryWebApi.Services
{
    public class LocationService : ILocationService
    {
        readonly IMapper _mapper;
        readonly IGenericRepositary<Data.Models.Location> _genericRepositary;
        public LocationService(IMapper mapper, IGenericRepositary<Data.Models.Location> genericRepositary)
        {
            _mapper = mapper;
            _genericRepositary = genericRepositary;
        }
        public List<Location> GetLocations()
        {
            var locations = _mapper.Map<List<Data.Models.Location>, List<Models.Location>>(_genericRepositary.GetData());
            return locations;

        }
        public string? GetLocationName(int id)
        {
            return _genericRepositary.GetNameById(id);
        }
    }
}

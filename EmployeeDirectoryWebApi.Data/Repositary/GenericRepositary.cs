using EmployeeDirectoryWebApi.Data.Contract;
using EmployeeDirectoryWebApi.Data.Models;

namespace EmployeeDirectoryWebApi.Data.Repositary
{
    public class GenericRepositary<T> : IGenericRepositary<T> where T : class
    {


        public List<T> GetData()
        {
            using (var context = new SagarEmployeeDirectoryDbContext())
            {
                return context.Set<T>().ToList();
            }
        }
        public T? GetDataById(int id)
        {
            using (var context = new SagarEmployeeDirectoryDbContext())
            {
                var entity = context.Set<T>().Find(id);
                return entity;
            }
        }

        public string? GetNameById(int? id)
        {
            using (var context = new SagarEmployeeDirectoryDbContext())
            {
                if (id == null)
                {
                    return null;
                }
                var entity = context.Set<T>().Find(id);
                if (entity != null)
                {
                    var name = typeof(T).GetProperty("Name");
                    if (name != null)
                    {
                        return name.GetValue(entity) as string;
                    }
                }
                return null;
            }
        }

    }
}

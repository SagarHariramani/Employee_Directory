namespace EmployeeDirectoryWebApi.Data.Contract
{
    public interface IGenericRepositary<T> where T : class
    {
        T? GetDataById(int id);
        List<T> GetData();
        string? GetNameById(int? id);
    }
}
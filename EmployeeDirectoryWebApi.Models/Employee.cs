namespace EmployeeDirectoryWebApi.Models
{

    public class Employee
    {
        public int id { get; set; }
        public string EmpId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateOnly Dob { get; set; }
        public string PhoneNo { get; set; }
        public DateOnly JoiningDate { get; set; }
        public int ManagerId { get; set; }
        public int? ProjectId { get; set; }
        public bool IsDeleted { get; set; }
        public int? RoleId { get; set; }
        public string Status { get; set; }
        public string? ProfilePicture {  get; set; }

    }
}

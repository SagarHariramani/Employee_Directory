using System;
using System.Collections.Generic;

namespace EmployeeDirectoryWebApi.Data.Models;

public partial class Employee
{
    public int Id { get; set; }

    public string EmpId { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string? LastName { get; set; }

    public string? Email { get; set; }

    public DateOnly Dob { get; set; }

    public string? PhoneNo { get; set; }

    public DateOnly? JoiningDate { get; set; }

    public int? ProjectId { get; set; }

    public int? RoleId { get; set; }

    public bool IsDeleted { get; set; }

    public int ManagerId { get; set; }

    public DateTime CreatedOn { get; set; }

    public string CreatedBy { get; set; } = null!;

    public DateTime? UpdatedOn { get; set; }

    public string? UpdatedBy { get; set; }

    public string Status { get; set; } = null!;

    public string? ProfilePicture { get; set; }

    public virtual Manager Manager { get; set; } = null!;

    public virtual ICollection<Manager> Managers { get; set; } = new List<Manager>();

    public virtual Project? Project { get; set; }

    public virtual Role? Role { get; set; }
}

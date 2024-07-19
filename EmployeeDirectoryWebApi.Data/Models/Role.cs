using System;
using System.Collections.Generic;

namespace EmployeeDirectoryWebApi.Data.Models;

public partial class Role
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int LocationId { get; set; }

    public int? DepartmentId { get; set; }

    public string Description { get; set; } = null!;

    public virtual Department? Department { get; set; }

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();

    public virtual Location Location { get; set; } = null!;
}

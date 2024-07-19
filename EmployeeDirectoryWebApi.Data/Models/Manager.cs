using System;
using System.Collections.Generic;

namespace EmployeeDirectoryWebApi.Data.Models;

public partial class Manager
{
    public int Id { get; set; }

    public int EmployeeId { get; set; }

    public virtual Employee Employee { get; set; } = null!;

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();
}

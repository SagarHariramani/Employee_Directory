using System;
using System.Collections.Generic;

namespace EmployeeDirectoryWebApi.Data.Models;

public partial class Department
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Role> Roles { get; set; } = new List<Role>();
}

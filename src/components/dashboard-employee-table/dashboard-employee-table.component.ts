import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, output, viewChild } from '@angular/core';
import { Employee } from '../../Models/employee';
import { Role } from '../../Models/role';
import { Department } from '../../Models/department';
import { Location } from '../../Models/location';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-employee-table',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './dashboard-employee-table.component.html',
  styleUrl: './dashboard-employee-table.component.css'
})
export class DashboardEmployeeTableComponent {
  @Output() deleteEmployeeEvent = new EventEmitter<number>();
  @Input() employees!: Employee[];
  @Input() roles!: Role[];
  @Input() locations!: Location[];
  @Input() departments!: Department[];
  @Input() filteredEmployees!: Employee[];
  @Input() databaseOrderedEmployees!: Employee[];
  isEllipsisDropdown: boolean = false;
  selectedEmployeeId: number | null = null;
  sortOrder: { [key: string]: string } = {}
  isSelectAll: boolean = false;
  isEmployeeSelected: boolean = false;

  

  getRoleInfo(roleId: number): Role | null {
    let role = this.roles.find(x => x.id == roleId);
    if (role) {
      return role;
    } else {
      return null;
    }
  }
  getRoleName(roleId: number): string | null {
    let role = this.getRoleInfo(roleId);
    if (role) {
      return role.name;
    } else {
      return null;
    }
  }
  getLocationName(roleId: number): string | null {
    let role = this.getRoleInfo(roleId);
    if (role) {
      let locationId = role.locationId;
      let location = this.locations.find(x => x.id == locationId);
      if (location) {
        return location.name;
      } else {
        return null;
      }
    } else {
      return null;
    }

  }
  getDepartmentName(roleId: number) {
    let role = this.getRoleInfo(roleId);
    if (role) {
      let departmentId = role.departmentId;
      let department = this.departments.find(x => x.id == departmentId);
      if (!department) {
        return null;
      } else {
        return department.name;
      }
    } else {
      return null;
    }
  }

  deleteEmployee(empId: number) {
    this.deleteEmployeeEvent.emit(empId);
  }

  toggleEllipsisDropdown(empId: number) {
    if (this.selectedEmployeeId === empId) {
      this.selectedEmployeeId = null;
    } else {
      this.selectedEmployeeId = empId;
    }
  }
  sortUser(): void {
    let sortedEmployeeByName = this.toggleSortOrder('firstName', this.sortOrder) as Employee[];
    this.displayEmployeesDetails(sortedEmployeeByName);
  };
  sortLoction(): void {
    let sortedEmployeeByLocation = this.toggleSortOrder('locationId', this.sortOrder) as Employee[];
    this.displayEmployeesDetails(sortedEmployeeByLocation);
  };
  sortDepartment(): void {
    let sortedEmployeeByDepartment = this.toggleSortOrder('departmentId', this.sortOrder) as Employee[];
    this.displayEmployeesDetails(sortedEmployeeByDepartment);
  };
  sortRole(): void {
    let sortedEmployeeByTitle = this.toggleSortOrder('title', this.sortOrder) as Employee[];
    this.displayEmployeesDetails(sortedEmployeeByTitle);
  };
  sortEmpId(): void {
    let sortedEmployeeByEmpId = this.toggleSortOrder('empId', this.sortOrder) as Employee[];
    this.displayEmployeesDetails(sortedEmployeeByEmpId);
  };
  sortStatus(): void {
    let sortedEmployeeByStatus = this.toggleSortOrder('status', this.sortOrder) as Employee[];
    this.displayEmployeesDetails(sortedEmployeeByStatus);
  };
  sortJoinDate(): void {
    let sortedEmployeeByJoinDate = this.toggleSortOrder('joiningDate', this.sortOrder) as Employee[];
    this.displayEmployeesDetails(sortedEmployeeByJoinDate);
  };
  displayEmployeesDetails(employees: Employee[]): void {
    this.filteredEmployees = employees;
  }
  toggleSortOrder(property: string, sortOrder: { [key: string]: string }): Employee[] {
    if (sortOrder[property] === 'asc') {
      sortOrder[property] = 'desc';
    } else if (sortOrder[property] === 'desc') {
      sortOrder[property] = 'original';
    } else {
      sortOrder[property] = 'asc';
    }
    if (sortOrder[property] === 'original') {
      let databaseOrderedEmployees: Employee[] = [...this.databaseOrderedEmployees];
      console.log(databaseOrderedEmployees)
      return databaseOrderedEmployees;
    } else {
      let sortedEmployees: Employee[] = [...this.filteredEmployees];
      sortedEmployees = this.sortEmployeesByProperties(property, sortOrder[property], sortedEmployees);
      return sortedEmployees;
    }
  }
  sortEmployeesByProperties(property: string, sortOrder: string, filteredEmployees: Employee[]): Employee[] {
    const rolesData: Role[] = this.roles;

    filteredEmployees.sort((a: any, b: any): number => {
      if (property === "joinDate") {
        const aDate: Date = new Date(a[property]);
        const bDate: Date = new Date(b[property]);
        if (sortOrder === 'desc') {
          return bDate.getTime() - aDate.getTime(); // Reverse order for descending
        } else {
          return aDate.getTime() - bDate.getTime(); // Default to ascending
        }
      } else if (property === "locationId" || property === "departmentId" || property === "title") {
        if (a.roleId && b.roleId) {
          const aRole: Role = rolesData.find((role: Role) => role.id === a.roleId)!;
          const bRole: Role = rolesData.find((role: Role) => role.id === b.roleId)!;
          if (property === "locationId") {
            const aLocation: Location | undefined = this.locations.find((location: Location) => location.id === aRole.locationId);
            const bLocation: Location | undefined = this.locations.find((location: Location) => location.id === bRole.locationId);
            if (aLocation && bLocation) {
              const comparison: number = aLocation.name.localeCompare(bLocation.name);
              return sortOrder === 'desc' ? -comparison : comparison;
            } else {
              return 0; // Handle case where location not found, though ideally it should not happen
            }
          } else if (property === "departmentId") {
            const aDepartment: Department | undefined = this.departments.find((department: Department) => department.id === aRole.departmentId);
            const bDepartment: Department | undefined = this.departments.find((department: Department) => department.id === bRole.departmentId);
            if (aDepartment && bDepartment) {
              const comparison: number = aDepartment.name.localeCompare(bDepartment.name);
              return sortOrder === 'desc' ? -comparison : comparison;
            } else {
              return 0; // Handle case where department not found, though ideally it should not happen
            }
          } else if (property === "title") {
            const comparison: number = aRole.name.localeCompare(bRole.name);
            return sortOrder === 'desc' ? -comparison : comparison;
          }
        }
        else {
          return 0; // Handle case where roleId is null for either a or b
        }
      } else {
        const comparison: number = a[property].localeCompare(b[property]);
        return sortOrder === 'desc' ? -comparison : comparison;
      }

      return 0;
    });

    return filteredEmployees;
  }
  selectAllEmployees(): void {
    this.isSelectAll = !this.isSelectAll;
    this.isEmployeeSelected = this.isSelectAll;
  }
  selectEmployee(): void {
    this.isEmployeeSelected = !this.isEmployeeSelected;
  }


}

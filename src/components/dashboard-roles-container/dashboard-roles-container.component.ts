import { Component, Input } from '@angular/core';
import { Location } from '../../Models/location';
import { Role } from '../../Models/role';
import { Department } from '../../Models/department';
import { CommonModule } from '@angular/common';
import { Employee } from '../../Models/employee';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-roles-container',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './dashboard-roles-container.component.html',
  styleUrl: './dashboard-roles-container.component.css'
})
export class DashboardRolesContainerComponent {
  @Input() employees: Employee[] = [];
  @Input() roles: Role[] = [];
  @Input() filteredRole: Role[] = [];
  @Input() location: Location[] = [];
  @Input() department: Department[] = [];
  topThreeEmployees: string[] = [];

  

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
      let location = this.location.find(x => x.id == locationId);
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
      let department = this.department.find(x => x.id == departmentId);
      if (!department) {
        return null;
      } else {
        return department.name;
      }
    } else {
      return null;
    }
  }
  getEmployeeCount(roleId: number) {
    return this.employees.filter(x => x.roleId == roleId).length;
  }
  getEmployeeList(roleId: number) {
    return this.employees.filter(x => x.roleId == roleId);
  }
  getTopThreeEmployees(roleId: number): string[] {
    const filteredEmployees = this.employees.filter(employee => employee.roleId === roleId);
    const topThreeEmployees = filteredEmployees.slice(0, 3).map(employee => employee.profilePicture);
    return topThreeEmployees;
  }
}

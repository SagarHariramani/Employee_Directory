import { Component } from '@angular/core';
import { RoleActionComponent } from '../role-action/role-action.component';
import { FilterBarComponent } from '../filter-bar/filter-bar.component';
import { DashboardRolesContainerComponent } from '../dashboard-roles-container/dashboard-roles-container.component';
import { HttpService } from '../../services/http/http.service';
import { Role } from '../../Models/role';
import { Location } from '../../Models/location';
import { Department } from '../../Models/department';
import { Employee } from '../../Models/employee';

@Component({
  selector: 'app-dashboard-role',
  standalone: true,
  imports: [RoleActionComponent,FilterBarComponent,DashboardRolesContainerComponent],
  templateUrl: './dashboard-role.component.html',
  styleUrl: './dashboard-role.component.css'
})
export class DashboardRoleComponent {
  employees:Employee[]=[];
  roles:Role[]=[];
  filteredRole:Role[]=[];
  location:Location[]=[];
  department:Department[]=[];
  selectedLocation:string[]|null=null;
  selectedDepartment:string[]|null=null;
  constructor(private http: HttpService) { 
    this.getAllEmployees();
    this.getRoles();
    this.getLocations();
    this.getDepartments();
  }
  getAllEmployees() {
    this.http.getAllEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
    });
  }
  getRoles(){
    this.http.getRoles().subscribe((data:Role[])=>{
      this.filteredRole=data;
      this.roles=data;
    });
  }
  getLocations(){
    this.http.getLocations().subscribe((data:Location[])=>{
      this.location=data;
    });
  }
  getDepartments(){
    this.http.getDepartments().subscribe((data:Department[])=>{
      this.department=data;
    });
  }
  filterRoleByLocation(location:string[]|null){
    if (location) {
      this.selectedLocation = location;
      this.filteredRole = this.filteredRole.filter((role: Role) => {
        if (!role) {
          return false;
        } else {
          let location = this.location.find(x => x.id === role!.locationId);
          if (location && this.selectedLocation!.includes(location.name)) {
            return true;
          } else {
            return false;
          }
        }
      });
    }else{
      this.selectedLocation=null;
      this.filteredRole=this.roles;
    }
  }
  filterRoleByDepartment(department:string[]|null){
    if (department) {
      this.selectedDepartment = department;
      this.filteredRole = this.filteredRole.filter((role: Role) => {
        if (!role) {
          return false;
        } else {
          let department = this.department.find(x => x.id === role!.departmentId);
          if (department && this.selectedDepartment!.includes(department.name)) {
            return true;
          } else {
            return false;
          }
        }
      });
    }else{
      this.selectedDepartment=null;
      this.filteredRole=this.roles;
    }
  }
}

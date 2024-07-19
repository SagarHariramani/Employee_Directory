import { Component } from '@angular/core';
import { EmployeeActionComponent } from '../employee-action/employee-action.component';
import { FiltersComponent } from '../filters/filters.component';
import { DashboardEmployeeTableComponent } from '../dashboard-employee-table/dashboard-employee-table.component';
import { Employee } from '../../Models/employee';
import { Role } from '../../Models/role';
import { Location } from '../../Models/location';
import { Department } from '../../Models/department';
import { HttpService } from '../../services/http/http.service';

@Component({
  selector: 'app-dashboard-employee',
  standalone: true,
  imports: [EmployeeActionComponent,FiltersComponent,DashboardEmployeeTableComponent],
  templateUrl: './dashboard-employee.component.html',
  styleUrl: './dashboard-employee.component.css'
})
export class DashboardEmployeeComponent {
  isFilterBarActive:boolean=false;
  isAlphabeticalFilterActive:boolean=false;
  selectedAlphabet:string|null=null;
  selectedStatus:string[]|null=null;
  selectedLocations:string[]|null=null;
  selectedDepartments:string[]|null=null;
  employees:Employee[]=[];
  filteredEmployees:Employee[]=[];
  databaseOrderedEmployees:Employee[]=[];
  roles:Role[]=[];
  locations:Location[]=[];
  department:Department[]=[];
  constructor(private http:HttpService){
    this.getAllEmployees();
    this.getRoles();
    this.getLocations();
    this.getDepartments();
  } 
  getAllEmployees() {
    this.http.getAllEmployees().subscribe((data: Employee[]) => {
      this.filteredEmployees =data;
      this.databaseOrderedEmployees=[...this.filteredEmployees]
      this.employees = data;
    });
  }
  getRoles(){
    this.http.getRoles().subscribe((data:Role[])=>{
      this.roles=data;
    });
  }
  getLocations(){
    this.http.getLocations().subscribe((data:Location[])=>{
      this.locations=data;
    });
  }
  getDepartments(){
    this.http.getDepartments().subscribe((data:Department[])=>{
      this.department=data;
    });
  }
  deleteEmployee(id:number){
    this.http.deleteEmployee(id).subscribe({
      next:()=>{
        console.log('Employee deleted successfully!');
        this.getAllEmployees();
      },
      error:error=>{
        console.error('There was an error!',error);
      }
    });
  }
  isFilterBar(isActive:boolean){
    this.isFilterBarActive=isActive;
  }
  isAlphabeticalFilter(isActive:boolean){
    this.isAlphabeticalFilterActive=isActive;
  }

  filterEmployeeByAlphabet(alphabet:string|null){
    if(alphabet){
      this.selectedAlphabet=alphabet;
      this.filteredEmployees=this.filteredEmployees.filter((employee:Employee)=>{
      return employee.firstName.charAt(0)===alphabet;
    });
    }
    else{
      this.selectedAlphabet=null; 
      this.getAllEmployees();
      this.filteredEmployees=this.employees;
    }
    this.databaseOrderedEmployees=[...this.filteredEmployees];
  };
  filterEmployeeByStatus(status:string[]|null){
    if(status){
      this.selectedStatus=status;
      this.filteredEmployees=this.filteredEmployees.filter((employee:Employee)=>{
        return status.includes(employee.status);
      });
      this.databaseOrderedEmployees=[...this.filteredEmployees];
    }
   
  }
  filterEmployeeByLocation(locations: string[]|null) {
    if (locations) {
      this.selectedLocations = locations;
      this.filteredEmployees = this.filteredEmployees.filter((employee: Employee) => {
        let role = this.roles.find((role: Role) => {
          return role.id === employee.roleId;
        });
        if (!role) {
          return false;
        } else {
          let location = this.locations.find(x => x.id === role!.locationId);
          if (location && this.selectedLocations!.includes(location.name)) {
            return true;
          } else {
            return false;
          }
        }
      });
    }
    else {
      this.selectedLocations = null;
      this.filteredEmployees = this.employees;
    }
    this.databaseOrderedEmployees = [...this.filteredEmployees];
  }
  
  filterEmployeeByDepartment(departments:string[]|null){
    if(departments){
      this.selectedDepartments=departments;
      this.filteredEmployees=this.filteredEmployees.filter((employee:Employee)=>{
        let role=this.roles.find((role:Role)=>{
          return role.id===employee.roleId;
        });
        if (!role) {
          return false;
        }else{
          let department=this.department.find(x=>x.id===role!.departmentId);
          if (department && this.selectedDepartments!.includes(department.name)) {
            return true;
          }else{
            return false;
          }
        }
      });
    }else{
      this.selectedDepartments=null;
      this.filteredEmployees=this.employees;
    }
    this.databaseOrderedEmployees=[...this.filteredEmployees];
  }
  
}

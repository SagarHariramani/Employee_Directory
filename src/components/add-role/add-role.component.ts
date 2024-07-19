import { Component } from '@angular/core';
import { Location } from '../../Models/location';
import { Department } from '../../Models/department';
import { HttpService } from '../../services/http/http.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../Models/employee';
import { Role } from '../../Models/role';

@Component({
  selector: 'app-add-role',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddRoleComponent {
  unAssignedEmployees: Employee[] = [];
  locations: Location[] = [];
  departments: Department[] = [];
  isEmployeeListVisible: boolean = false;
  newRole:FormGroup = new FormGroup({
    name:new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]),
    locationId:new FormControl(0,[Validators.required]),
    departmentId:new FormControl(0,[Validators.required]),
    description:new FormControl(''),
  });
  constructor(private http:HttpService) {
    this.getAllLocations();
    this.getAllDepartments();
  }
  getUnAssignedEmployees(){
    this.http.getUnAssignedEmployees().subscribe((data:Employee[])=>{
      this.unAssignedEmployees=data;
    });
  }
  getAllLocations(){
    this.http.getLocations().subscribe((data:Location[])=>{
      this.locations=data;
    });
  }
  getAllDepartments(){
    this.http.getDepartments().subscribe((data:Department[])=>{
      this.departments=data;
    });
  }
  Console(){
    console.log(this.newRole.value);
  }
  addRole() {
    this.http.postRole(this.newRole.value).subscribe({
      next: () => {
        console.log('Role added successfully!');
        this.newRole.reset(
          {
            name: '',
            locationId: 0,
            departmentId: 0,
            description: ''
          }
        );
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }
  toggleEmployeeList(){
    this.getUnAssignedEmployees();
    this.isEmployeeListVisible=!this.isEmployeeListVisible;
  }
}

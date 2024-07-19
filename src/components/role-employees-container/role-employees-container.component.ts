import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../../Models/employee';
import { Role } from '../../Models/role';
import { Location } from '../../Models/location';
import { Department } from '../../Models/department';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../services/http/http.service';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-role-employees-container',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './role-employees-container.component.html',
  styleUrl: './role-employees-container.component.css'
})
export class RoleEmployeesContainerComponent {
  roleId: number=0;
  employees: Employee[] = [];
  roles:Role[]=[];
  locations:Location[]=[];
  department:Department[]=[];

  constructor(private http:HttpService , private _router:Router){
    this._router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.roleId = parseInt(this._router.url.split('/')[3]);
        this.fetchData();
      }
    })
  } 

  fetchData(){
    this.getRoles();
    this.getAllEmployees();
    this.getLocations();
    this.getDepartments();
  }
  getAllEmployees() {
    this.http.getAllEmployees().subscribe(async(data: Employee[]) => {
      this.employees = data.filter((employee:Employee)=>employee.roleId===this.roleId);
    });
  }
  getRoles(){
    this.http.getRoles().subscribe(async(data:Role[])=>{
      this.roles= data.filter((role:Role)=>role.id==this.roleId);
    });
  } 
  getLocations(){
    this.http.getLocations().subscribe(async(data:Location[])=>{
      if(this.roles.length>0){
        this.locations=data.filter((location:Location)=>location.id===this.roles[0].locationId);
      }
    });
  }
  getDepartments(){
    this.http.getDepartments().subscribe(async(data:Department[])=>{
      if(this.roles.length>0){
        this.department=data.filter((department:Department)=>department.id===this.roles[0].departmentId);
      }
    });
  }
}



import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../Models/employee';
import { Role } from '../../Models/role';
import { Department } from '../../Models/department';
import { Location } from '../../Models/location';
import { Manager } from '../../Models/manager';
import { Project } from '../../Models/project';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl = 'https://localhost:7213/api/';

  constructor(private http: HttpClient) { }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}Employee/${id}`);
  }
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}Employee`);
  }
  getUnAssignedEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}Employee/UnAssigned`);
  }
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}Role`);
  }
  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.baseUrl}Role/Location`);
  }
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.baseUrl}Role/Department`);
  }
  getManager(): Observable<Manager[]> {
    return this.http.get<Manager[]>(`${this.baseUrl}Employee/Manager`);
  }
  getProject(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}Employee/Project`);
  }
  getManagerNameById(id: number): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}Employee/ManagerName/${id}`);
  }
  postEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}Employee`, employee);
  }
  EditEmployee(id:number,employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}Employee/Edit/${id}`, employee);
  }
  postRole(role: Role): Observable<Role> {
    return this.http.post<Role>(`${this.baseUrl}Role`, role);
  }
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}Employee/Delete/${id}`,{});
  }

}

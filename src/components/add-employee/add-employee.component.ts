import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { Location } from '../../Models/location';
import { Department } from '../../Models/department';
import { Role } from '../../Models/role';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Manager } from '../../Models/manager';
import { Project } from '../../Models/project';
import { Employee } from '../../Models/employee';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,RouterLink],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent{
  viewMode: boolean = false;
  editMode:boolean=false;
  employeeId: number = 0;
  title: string = 'Add Employee';
  currentRoute: string | undefined;
  roles: Role[] = [];
  employees: Employee[] = [];
  filteredRoles: Role[] = [];
  locations: Location[] = [];
  departments: Department[] = [];
  optionsDepartment: Department[] = [];
  managers: Manager[] = [];
  optionsManager: Manager[] = [];
  projects: Project[] = [];
  optionsProject: Project[] = [];
  imageBase64: string | null = null;
  Employee: FormGroup = new FormGroup({
    empId: new FormControl('', [Validators.required, Validators.pattern('^TZ\\d{4}$')]),
    firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
    lastName: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
    dob: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-zA-Z]{2,4}$')]),
    phoneNo: new FormControl('', [Validators.required, Validators.pattern('^\\d{10}$')]),
    joiningDate: new FormControl(''),
    roleId: new FormControl('0'),
    managerId: new FormControl('0'),
    projectId: new FormControl('0'),
    status: new FormControl('Active'),
    profilePicture: new FormControl(''),
    isDeleted: new FormControl(false)
  });
  locationForm: FormGroup = new FormGroup({
    locationId: new FormControl('0')
  });
  departmentForm: FormGroup = new FormGroup({
    departmentId: new FormControl('0')
  });


  constructor(private http: HttpService, private router: Router) {
    this.getRoles();
    this.getAllEmployees();
    this.getLocations();
    this.getDepartments();
    this.getManager();
    this.getProject();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        this.employeeId = parseInt(this.router.url.split('/')[3]);
        this.title = this.currentRoute?.split('/')[2];
        if (this.title == 'add-employee') {
          this.title = 'Add Employee';
        }
        else if (this.title == 'view-employee') {
          this.viewMode = true;
          this.title = 'View Employee';
          this.viewEmployee();
          this.disableFields();
        } else {
          this.title = 'Edit Employee';
          this.editMode=true;
          this.viewEmployee();
          
        }
      }
    });
  }

  
  viewEmployee() {
    if(this.currentRoute!.startsWith ('/employees/view-employee/')){
      this.getEmployeeById(this.employeeId);
    }
    if(this.currentRoute!.startsWith ('/employees/edit-employee/')){
      this.getEmployeeById(this.employeeId);
    }
  }
  getEmployeeById(id: number) {
    this.http.getEmployeeById(id).subscribe((data: Employee) => {
      this.Employee.get('empId')?.setValue(data.empId);
      this.Employee.get('firstName')?.setValue(data.firstName);
      this.Employee.get('lastName')?.setValue(data.lastName);
      this.Employee.get('dob')?.setValue(data.dob);
      this.Employee.get('email')?.setValue(data.email);
      this.Employee.get('phoneNo')?.setValue(data.phoneNo);
      this.Employee.get('joiningDate')?.setValue(data.joiningDate);
      this.roles=this.filteredRoles.filter((role)=>role.id==data.roleId);
      this.locationForm.get('locationId')?.setValue(this.roles[0].locationId);
      this.changeLocation();
      this.departmentForm.get('departmentId')?.setValue(this.roles[0].departmentId);
      this.Employee.get('roleId')?.setValue(data.roleId);
      this.Employee.get('managerId')?.setValue(data.managerId);
      this.Employee.get('projectId')?.setValue(data.projectId);
      this.imageBase64=data.profilePicture;
    });      
  }
  getAllEmployees(){
    this.http.getAllEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
    });
  }
  getRoles() {
    this.http.getRoles().subscribe((data: Role[]) => {
      this.filteredRoles = data;
    });
  }
  getLocations() {
    this.http.getLocations().subscribe((data: Location[]) => {
      this.locations = data;
    });
  }
  getDepartments() {
    this.http.getDepartments().subscribe((data: Department[]) => {
      this.optionsDepartment = data;
    });
  }
  getManager() {
    this.http.getManager().subscribe((data: Manager[]) => {
      this.managers = data;
    });
  }
  getProject() {
    this.http.getProject().subscribe((data: Project[]) => {
      this.projects = data;
    });
  }
  getManagerNameById(id: number) {
    let manager = this.managers.filter((manager) => manager.id == id);
    let employee = this.employees.filter((employee) => employee.id == manager[0].employeeId);
    return employee[0].firstName + ' ' + employee[0].lastName;
  }


  changeLocation() {
    this.departmentForm.get('departmentId')?.setValue('0');
    this.Employee.get('roleId')?.setValue('0');
    let dep: Department[] = [];
    let filteredRoles = [...this.filteredRoles]
    let departments = [...this.optionsDepartment]
    let roles = filteredRoles.filter((role) => role.locationId == this.locationForm.value.locationId);
    roles.forEach((role) => {
      let department = departments.filter((department) => department.id == role.departmentId);
      if (!dep.includes(department[0])) {
        dep.push(department[0]);
      }
    });
    this.departments = dep;
  }
  changeDepartment() {
    let roles: Role[] = [];
    this.Employee.get('roleId')?.setValue('0');
    let filteredRoles = [...this.filteredRoles];
    let filteredRolesByLocation = filteredRoles.filter((role) => role.locationId == this.locationForm.value.locationId);
    filteredRolesByLocation.forEach((role) => {
      if (role.departmentId == this.departmentForm.value.departmentId) {
        roles.push(role);
      }
    });
    this.roles = roles;

  }

  addEmployee() {
    this.Employee.get('profilePicture')?.setValue(this.imageBase64);
    this.Employee.get('roleId')?.value == '0' ? this.Employee.get('roleId')?.setValue(null) : this.Employee.get('roleId')?.setValue;
    this.http.postEmployee(this.Employee.value).subscribe({
      next: () => {
        console.log('Employee added successfully!');
        this.Employee.reset({
          empId: '',
          firstName: '',
          lastName: '',
          dob: '',
          email: '',
          phoneNo: '',
          joiningDate: '',
          roleId: '0',
          managerId: '0',
          projectId: '0',
          profilePicture: null
        });
        this.locationForm.reset({
          locationId: '0'
        });
        this.departmentForm.reset({
          departmentId: '0'
        });
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  updateEmployee() {
    this.Employee.get('profilePicture')?.setValue(this.imageBase64);
    this.Employee.get('roleId')?.value == '0' ? this.Employee.get('roleId')?.setValue(null) : this.Employee.get('roleId')?.setValue;
    this.http.EditEmployee(this.employeeId,this.Employee.value).subscribe({
      next: () => {
        console.log('Employee updated successfully!');
        // this.Employee.reset({
        //   empId: '',
        //   firstName: '',
        //   lastName: '',
        //   dob: '',
        //   email: '',
        //   phoneNo: '',
        //   joiningDate: '',
        //   roleId: '0',
        //   managerId: '0',
        //   projectId: '0',
        //   profilePicture: null
        // });
        // this.locationForm.reset({
        //   locationId: '0'
        // });
        // this.departmentForm.reset({
        //   departmentId: '0'
        // });
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
    }

  changeImage(input: any) {
    let reader: FileReader = new FileReader();
    let preview: string = '';

    if (input.target.files && input.target.files[0]) {
      reader.onload = (e) => {
        if (e.target) {
          const target = e.target as FileReader;
          if (typeof target.result === 'string') {
            preview = target.result;
            this.imageBase64 = preview;
          }
        }
      };

      reader.readAsDataURL(input.target.files[0]);
    }
  }
  disableFields() {
    this.Employee.get('empId')?.disable();
    this.Employee.get('firstName')?.disable();
    this.Employee.get('lastName')?.disable();
    this.Employee.get('dob')?.disable();
    this.Employee.get('email')?.disable();
    this.Employee.get('phoneNo')?.disable();
    this.Employee.get('joiningDate')?.disable();
    this.Employee.get('roleId')?.disable();
    this.locationForm.get('locationId')?.disable();
    this.departmentForm.get('departmentId')?.disable();
    this.Employee.get('managerId')?.disable();
    this.Employee.get('projectId')?.disable();
    this.Employee.get('profilePicture')?.disable();
  }
}

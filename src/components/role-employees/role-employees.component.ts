import { Component } from '@angular/core';
import { RoleEmployeesActionComponent } from '../role-employees-action/role-employees-action.component';
import { RoleEmployeesContainerComponent } from '../role-employees-container/role-employees-container.component';

@Component({
  selector: 'app-role-employees',
  standalone: true,
  imports: [RoleEmployeesActionComponent,RoleEmployeesContainerComponent],
  templateUrl: './role-employees.component.html',
  styleUrl: './role-employees.component.css'
})
export class RoleEmployeesComponent{
  
}

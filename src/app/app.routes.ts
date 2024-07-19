import { Routes } from '@angular/router';
import { DashboardEmployeeComponent } from '../components/dashboard-employee/dashboard-employee.component';
import { DashboardRoleComponent } from '../components/dashboard-role/dashboard-role.component';
import { RoleEmployeesComponent } from '../components/role-employees/role-employees.component';
import { AddEmployeeComponent } from '../components/add-employee/add-employee.component';
import { AddRoleComponent } from '../components/add-role/add-role.component';

export const routes: Routes = [
    {
        path: 'employees',
        component:DashboardEmployeeComponent
    },
    {
        path:'roles',
        component:DashboardRoleComponent
    },
    {
        path:'roles/roleid/:id',
        component:RoleEmployeesComponent
    },
    {
        path: 'employees/add-employee',
        component: AddEmployeeComponent
    },
    {
        path: 'roles/add-role',
        component: AddRoleComponent
    },
    {
        path:'employees/view-employee/:id',
        component:AddEmployeeComponent
    },
    {
        path:'employees/edit-employee/:id',
        component:AddEmployeeComponent
    }
];

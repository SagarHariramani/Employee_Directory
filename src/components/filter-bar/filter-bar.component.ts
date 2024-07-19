import { Component, EventEmitter, Output } from '@angular/core';
import { FilterOptionStatusDropdownComponent } from '../filter-option-status-dropdown/filter-option-status-dropdown.component';
import { FilterOptionLocationDropdownComponent } from '../filter-option-location-dropdown/filter-option-location-dropdown.component';
import { FilterOptionDepartmentDropdownComponent } from '../filter-option-department-dropdown/filter-option-department-dropdown.component';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule,FilterOptionStatusDropdownComponent,FilterOptionLocationDropdownComponent,FilterOptionDepartmentDropdownComponent],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.css'
})
export class FilterBarComponent{

  @Output() emitSelectedStatus = new EventEmitter<string[]|null>();
  @Output() emitSelectedLocation = new EventEmitter<string[]|null>();
  @Output() emitSelectedDepartment = new EventEmitter<string[]|null>();
  
  selectedStatus:string[]|null=null;
  selectedLocation:string[]|null=null;
  selectedDepartment:string[]|null=null;
  isFilterReset:boolean=false;
  currentRoute: string | undefined;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
          this.currentRoute = event.url;
      }
  });
  }
  
  
  selectedDepartments(departments:string[]) {
    this.selectedDepartment = departments;
  }
  selectedLocations(locations:string[]) {
    this.selectedLocation = locations;
  }
  selectedStatuses(statuses:string[]) {
    this.selectedStatus = statuses;
  }
  resetFilter(){
    this.isFilterReset = true;
    this.selectedDepartment =null;
    this.emitSelectedDepartment.emit(this.selectedDepartment);
    this.selectedLocation = null;
    this.emitSelectedLocation.emit(this.selectedLocation);
    this.selectedStatus = null;
    this.emitSelectedStatus.emit(this.selectedStatus);
  }

  applyFilter(){
    this.isFilterReset = false;
    if (this.selectedDepartment) {
    this.emitSelectedDepartment.emit(this.selectedDepartment);
    }
    if (this.selectedLocation) {
      this.emitSelectedLocation.emit(this.selectedLocation);
    }
    if (this.selectedStatus) {
      this.emitSelectedStatus.emit(this.selectedStatus);
    }
  }
  
}

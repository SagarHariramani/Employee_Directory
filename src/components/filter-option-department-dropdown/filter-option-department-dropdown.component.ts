import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter-option-department-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-option-department-dropdown.component.html',
  styleUrl: './filter-option-department-dropdown.component.css'
})
export class FilterOptionDepartmentDropdownComponent {
  @Input() isFilterReset:boolean=false;
  @Output() departmentSelected = new EventEmitter<string[]>();
  selectedDepartment:string[]=[];
  departments:any[]=[];
  isDropdownOpen:boolean=false;
  constructor(private http:HttpClient){
  }
  getAllDepartment() {
    this.http.get('https://localhost:7213/api/Role/Department').subscribe((data:any) => {
      this.departments = data;
    })
  }

  ngOnChanges() {
    if (this.isFilterReset) {
      this.selectedDepartment = [];
    }
  }
  toggleDropdown() {
    this.getAllDepartment();
    if (this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }else {
      this.isDropdownOpen = true;
    }
  }

  selectDepartment(department:string) {
    if(this.isFilterReset){
      this.selectedDepartment=[];
    }
    const index = this.selectedDepartment.indexOf(department);
    if (index > -1) {
        this.selectedDepartment.splice(index, 1);
    } else {
        this.selectedDepartment.push(department);
    }
    this.emitSelectedDepartment();
   
  }
  emitSelectedDepartment() {
    this.departmentSelected.emit(this.selectedDepartment);
  }

}

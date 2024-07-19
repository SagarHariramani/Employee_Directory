import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter-option-status-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-option-status-dropdown.component.html',
  styleUrl: './filter-option-status-dropdown.component.css'
})
export class FilterOptionStatusDropdownComponent{
  @Input() isFilterReset!:boolean;
  @Output() statusSelected = new EventEmitter<string[]>();
  selectedStatus:string[]=[];
  statuses:any[]=[];  
  isDropdownOpen:boolean=false;

  ngOnChanges() {
    if (this.isFilterReset) {
      this.selectedStatus = [];
    }
  }
  
  getAllStatuses() {
    this.statuses = [{id:1,name:'Active'},{id:2,name:'Inactive'}];
  }


  toggleDropdown() {
    this.getAllStatuses();
    if (this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }else {
      this.isDropdownOpen = true;
    }
    
  }
  selectStatus(status:string) {
    const index = this.selectedStatus.indexOf(status);
    if (index > -1) {
        this.selectedStatus.splice(index, 1);
    } else {
        this.selectedStatus.push(status);
    }
    this.emitSelectedStatus();
  }
  emitSelectedStatus() {
    this.statusSelected.emit(this.selectedStatus);
  }
}

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter-option-location-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-option-location-dropdown.component.html',
  styleUrl: './filter-option-location-dropdown.component.css'
})
export class FilterOptionLocationDropdownComponent {
  @Input() isFilterReset!:boolean;
  @Output() locationSelected = new EventEmitter<string[]>();
  selectedLocation:string[]=[];
  locations:any[]=[];
  isDropdownOpen:boolean=false;
  constructor(private http:HttpClient){
  }
  ngOnChanges() {
    if (this.isFilterReset) {
      this.selectedLocation = [];
    }
  }
  getAllLocations() {
    this.http.get('https://localhost:7213/api/Role/Location').subscribe((data:any) => {
      this.locations = data;
      
    })
  }
  
  toggleDropdown() {
    this.getAllLocations();
    if (this.isDropdownOpen) {
      this.isDropdownOpen = false;
      this.selectedLocation = [];
    }else {
      this.isDropdownOpen = true;
    }
  }
  
  selectLocation(location:string) {
    if (this.isFilterReset) {
      this.selectedLocation = [];
    }
    const index = this.selectedLocation.indexOf(location);
    if (index > -1) {
        this.selectedLocation.splice(index, 1);
    } else {
        this.selectedLocation.push(location);
    }
    this.emitSelectedLocation();
  }
  emitSelectedLocation() {
    this.locationSelected.emit(this.selectedLocation);
  }
  
  
}

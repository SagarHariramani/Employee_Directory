import { Component, EventEmitter, Output } from '@angular/core';
import { AlphabeticalFilterComponent } from '../alphabetical-filter/alphabetical-filter.component';
import { FilterBarComponent } from '../filter-bar/filter-bar.component';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [AlphabeticalFilterComponent,FilterBarComponent],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
  @Output() emitAlphabet= new EventEmitter<string|null>();
  @Output() emitStatus= new EventEmitter<string[]|null>();
  @Output() emitLocation= new EventEmitter<string[]|null>();
  @Output() emitDepartment= new EventEmitter<string[]|null>();
  @Output() isAlphabeticalFilterActive=new EventEmitter<boolean>();
  @Output() isFilterBarActive=new EventEmitter<boolean>();
  emittedAlphabet(alphabet:string|null){
    if(alphabet){
      this.isAlphabeticalFilterActive.emit(true);
    }
    this.emitAlphabet.emit(alphabet);
  }
  emittedStatus(status:string[]|null){
    if(status){
      this.isFilterBarActive.emit(true);
    }
    this.emitStatus.emit(status);
  }
  emittedLocation(location:string[]|null){
    if(location){
      this.isFilterBarActive.emit(true);
    }
    this.emitLocation.emit(location);
  }
  emittedDepartment(department:string[]|null){
    if(department){
      this.isFilterBarActive.emit(true);
    }
    this.emitDepartment.emit(department);
  }
  
}

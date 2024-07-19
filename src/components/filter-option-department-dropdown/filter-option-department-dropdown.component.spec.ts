import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterOptionDepartmentDropdownComponent } from './filter-option-department-dropdown.component';

describe('FilterOptionDepartmentDropdownComponent', () => {
  let component: FilterOptionDepartmentDropdownComponent;
  let fixture: ComponentFixture<FilterOptionDepartmentDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterOptionDepartmentDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterOptionDepartmentDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

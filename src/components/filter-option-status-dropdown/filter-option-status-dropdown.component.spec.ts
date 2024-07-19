import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterOptionStatusDropdownComponent } from './filter-option-status-dropdown.component';

describe('FilterOptionStatusDropdownComponent', () => {
  let component: FilterOptionStatusDropdownComponent;
  let fixture: ComponentFixture<FilterOptionStatusDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterOptionStatusDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterOptionStatusDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

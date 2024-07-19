import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterOptionLocationDropdownComponent } from './filter-option-location-dropdown.component';

describe('FilterOptionLocationDropdownComponent', () => {
  let component: FilterOptionLocationDropdownComponent;
  let fixture: ComponentFixture<FilterOptionLocationDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterOptionLocationDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterOptionLocationDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEmployeeTableComponent } from './dashboard-employee-table.component';

describe('DashboardEmployeeTableComponent', () => {
  let component: DashboardEmployeeTableComponent;
  let fixture: ComponentFixture<DashboardEmployeeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardEmployeeTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardEmployeeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleEmployeesActionComponent } from './role-employees-action.component';

describe('RoleEmployeesActionComponent', () => {
  let component: RoleEmployeesActionComponent;
  let fixture: ComponentFixture<RoleEmployeesActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleEmployeesActionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleEmployeesActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

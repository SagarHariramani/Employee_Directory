import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleEmployeesContainerComponent } from './role-employees-container.component';

describe('RoleEmployeesContainerComponent', () => {
  let component: RoleEmployeesContainerComponent;
  let fixture: ComponentFixture<RoleEmployeesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleEmployeesContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleEmployeesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRolesContainerComponent } from './dashboard-roles-container.component';

describe('DashboardRolesContainerComponent', () => {
  let component: DashboardRolesContainerComponent;
  let fixture: ComponentFixture<DashboardRolesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardRolesContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardRolesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

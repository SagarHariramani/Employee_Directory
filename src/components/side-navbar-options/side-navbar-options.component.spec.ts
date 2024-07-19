import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavbarOptionsComponent } from './side-navbar-options.component';

describe('SideNavbarOptionsComponent', () => {
  let component: SideNavbarOptionsComponent;
  let fixture: ComponentFixture<SideNavbarOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideNavbarOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideNavbarOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

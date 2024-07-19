import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAlertBoxComponent } from './update-alert-box.component';

describe('UpdateAlertBoxComponent', () => {
  let component: UpdateAlertBoxComponent;
  let fixture: ComponentFixture<UpdateAlertBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAlertBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAlertBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

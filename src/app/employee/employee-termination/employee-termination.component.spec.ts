import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTerminationComponent } from './employee-termination.component';

describe('EmployeeTerminationComponent', () => {
  let component: EmployeeTerminationComponent;
  let fixture: ComponentFixture<EmployeeTerminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeTerminationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeTerminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

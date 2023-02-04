import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HazardReportComponent } from './hazard-report.component';

describe('HazardReportComponent', () => {
  let component: HazardReportComponent;
  let fixture: ComponentFixture<HazardReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HazardReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HazardReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

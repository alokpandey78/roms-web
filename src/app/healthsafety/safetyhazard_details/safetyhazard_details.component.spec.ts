import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyhazardDetailsComponent } from './safetyhazard_details.component';

describe('HazardReportComponent', () => {
  let component: SafetyhazardDetailsComponent;
  let fixture: ComponentFixture<SafetyhazardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetyhazardDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SafetyhazardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

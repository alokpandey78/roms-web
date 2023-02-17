import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SafetyHazardComponent } from './safetyhazard.component';

describe('SafetyHazardComponent', () => {
  let component: SafetyHazardComponent;
  let fixture: ComponentFixture<SafetyHazardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetyHazardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SafetyHazardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

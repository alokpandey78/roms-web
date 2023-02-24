import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlantPrestartsComponent } from './plant-prestarts.component';

describe('PlantPrestartsComponent', () => {
  let component: PlantPrestartsComponent;
  let fixture: ComponentFixture<PlantPrestartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantPrestartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantPrestartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

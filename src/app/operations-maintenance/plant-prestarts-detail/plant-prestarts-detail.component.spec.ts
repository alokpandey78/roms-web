import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantPrestartsDetailComponent } from './plant-prestarts-detail.component';

describe('PlantPrestartsDetailComponent', () => {
  let component: PlantPrestartsDetailComponent;
  let fixture: ComponentFixture<PlantPrestartsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantPrestartsDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantPrestartsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

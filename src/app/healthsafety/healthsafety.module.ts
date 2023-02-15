import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HealthsafetyRoutes } from './healthsafety.routing';


import { HealthsafetyComponent } from './healthsafety.component';
import { SafetyhazardComponent } from './safetyhazard/safetyhazard.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HealthsafetyRoutes,
  ],
  declarations: [
    HealthsafetyComponent,
    SafetyhazardComponent
  ]
})
export class HealthsafetyModule { }

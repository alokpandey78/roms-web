import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HealthsafetyRoutes } from './healthsafety.routing';

import { HealthsafetyComponent } from './healthsafety.component';
import { SafetyHazardComponent } from './safetyhazard/safetyhazard.component';
import { SafetyhazardDetailsComponent } from './safetyhazard_details/safetyhazard_details.component';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HealthsafetyRoutes,
  ],
  declarations: [
    HealthsafetyComponent,
    SafetyHazardComponent,
    SafetyhazardDetailsComponent,
  ]
})
export class HealthsafetyModule { }

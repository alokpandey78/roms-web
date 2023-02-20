import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import {OperationsMaintenanceRoutes} from './operations-maintenance.routing';
import { OperationsMaintenanceComponent } from './operations-maintenance.component';
import { DailyPlantPrestartsComponent } from './daily-plant-prestarts/daily-plant-prestarts.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OperationsMaintenanceRoutes,
  ],
  declarations: [
    OperationsMaintenanceComponent, 
    DailyPlantPrestartsComponent]
})
export class OperationsMaintenanceModule { }

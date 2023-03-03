import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import {OperationsMaintenanceRoutes} from './operations-maintenance.routing';
import { OperationsMaintenanceComponent } from './operations-maintenance.component';
import { PlantPrestartsComponent } from './plant-prestarts/plant-prestarts.component';
import { PlantPrestartsDetailComponent } from './plant-prestarts-detail/plant-prestarts-detail.component';
import { InspectionListComponent } from './inspection-list/inspection-list.component';
import { InspectionAddComponent } from './inspection-add/inspection-add.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OperationsMaintenanceRoutes,
  ],
  declarations: [
    OperationsMaintenanceComponent, 
    PlantPrestartsComponent,
    PlantPrestartsDetailComponent,
    InspectionListComponent,
    InspectionAddComponent,
  ]
})
export class OperationsMaintenanceModule { }

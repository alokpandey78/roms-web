import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListComponent } from './client-list/client-list.component';
import {ClientRoutingModule } from './client.routing';
import { SharedModule } from '../shared/shared.module';
import { ClientAddComponent } from './client-add/client-add.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { AssetsListComponent } from './assets-list/assets-list.component';
import { AssetsAddComponent } from './assets-add/assets-add.component';
import { AttandanceComponent } from './attandance/attandance.component';
import { WorkOrderComponent } from './work-order/work-order.component';
import { AssetsViewComponent } from './assets-view/assets-view.component';



@NgModule({
  declarations: [
    ClientListComponent,
    ClientAddComponent,
    ProjectListComponent,
    ProjectAddComponent,
    AssetsListComponent,
    AssetsAddComponent,
    AttandanceComponent,
    WorkOrderComponent,
    AssetsViewComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }

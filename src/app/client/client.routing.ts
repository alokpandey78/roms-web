import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from '../layouts/full/full.component';
import { ClientAddComponent } from './client-add/client-add.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { AssetsListComponent } from './assets-list/assets-list.component';
import { AssetsAddComponent } from './assets-add/assets-add.component';
import { AssetsViewComponent } from './assets-view/assets-view.component';
import { AttandanceComponent } from './attandance/attandance.component';
import { WorkOrderComponent } from './work-order/work-order.component';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'client-list',
        component: ClientListComponent,
        data: {
          title: 'Client list',
          urls: [{ title: 'Dashboard', url: '/' }, { title: 'Operations' }],
        },
      },
      {
        path: 'client-add',
        component: ClientAddComponent,
        data: {
          title: 'Add Client',
          urls: [{ title: 'Dashboard', url: '/' }, { title: 'Operations' }],
        },
      },
      {
        path: 'project-add',
        component: ProjectAddComponent,
        data: {
          title: 'Add Project',
          urls: [{ title: 'Dashboard', url: '/' }, { title: 'Operations' }],
        },
      },
      {
        path: 'project-list',
        component: ProjectListComponent,
        data: {
          title: 'Project List',
          urls: [{ title: 'Dashboard', url: '/' }, { title: 'Operations' }],
        },
      },
      {
        path: 'assets-list',
        component: AssetsListComponent,
        data: {
          title: 'Assets List',
          urls: [{ title: 'Dashboard', url: '/' }, { title: 'Operations' }],
        },
      },
      {
        path: 'assets-add',
        component: AssetsAddComponent,
        data: {
          title: 'Add Asset ',
          urls: [{ title: 'Dashboard', url: '/' }, { title: 'Operations' }],
        },
      },
      {
        path: 'assets-view',
        component: AssetsViewComponent,
        data: {
          title: 'Assets',
          urls: [{ title: 'Dashboard', url: '/' }, { title: 'Operations' }],
        },
      },
     
 
      {
        path: 'attendance',
        component: AttandanceComponent,
        data: {
          title: 'Daily CheckIn',
          urls: [{ title: 'Dashboard', url: '/' }, { title: 'Operations' }],
        },
      },
      {
        path: 'work-order',
        component: WorkOrderComponent,
        data: {
          title: 'Work-Order',
          urls: [{ title: 'Dashboard', url: '/' }, { title: 'Operations' }],
        },
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}

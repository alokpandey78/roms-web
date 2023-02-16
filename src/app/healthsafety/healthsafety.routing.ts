import { Routes, RouterModule } from '@angular/router';
import { FullComponent } from '../layouts/full/full.component';
import { SafetyhazardComponent } from './safetyhazard/safetyhazard.component';
import { Safetytake5Component } from './safetytake5/safetytake5.component';
import { HazardReportComponent } from '../healthsafety/hazard-report/hazard-report.component';
import { HazardComponent } from './hazard/hazard.component';
const routes: Routes = [
  { 
    path : '',
    component: FullComponent,
    children: [
      { path: 'safety-hazard', component: SafetyhazardComponent,
      data: {
        title: 'Safety Hazard ',
        urls: [{ title: 'Dashboard', url: '/' }, { title: 'Safety Hazard' }],
      } }
      ,
      {
        path: 'safety-hazard-details', component: HazardReportComponent,
        data: {
          title: 'Safety Hazard Details',
          urls: [{ title: 'Dashboard', url: '/' }, { title: 'Operations' }],
        }
      },
      { path: 'safety-take5', component: Safetytake5Component,
      data: {
        title: 'Safety Take 5 ',
        urls: [{ title: 'Dashboard', url: '/' }, { title: 'Safety Take 5' }],
      } },
      {
        path: 'hazardold',
        component: HazardComponent,
        data: {
          title: 'Not to be used',
          urls: [{ title: 'Dashboard', url: '/' }, { title: 'Operations' }],
        },
      }
    ]
   },
];

export const HealthsafetyRoutes = RouterModule.forChild(routes);

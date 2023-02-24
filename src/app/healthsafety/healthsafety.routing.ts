import { Routes, RouterModule } from '@angular/router';
import { FullComponent } from '../layouts/full/full.component';
import { SafetyhazardDetailsComponent } from './safetyhazard_details/safetyhazard_details.component';
import { Safetytake5Component } from './safetytake5/safetytake5.component';
import { DhyComponentComponent } from './dhyComponent/dhyComponent.component';
import { SafetyHazardComponent } from './safetyhazard/safetyhazard.component';

const routes: Routes = [
  { 
    path : '', 
    component: FullComponent,
    children: [
      { path: 'safety-hazard', component: SafetyHazardComponent,
      data: {
        title: 'Safety Hazard ',
        urls: [{ title: 'Health and Safety', url: '/' }, { title: 'Safety Hazard' }],
      } }
      ,
      {
        path: 'safety-hazard-details', component: SafetyhazardDetailsComponent,
        data: {
          title: 'Safety Hazard Details',
          urls: [{ title: 'Safety Hazard', url: '/healthsafety/safety-hazard' }, { title: 'Health and Safety' }],
        }
      },
      { path: 'safety-take5', component: Safetytake5Component,
      data: {
        title: 'Safety Take 5 ',
        urls: [{ title: 'Dashboard', url: '/' }, { title: 'Safety Take 5' }],
      } },
    ]
   },
];

export const HealthsafetyRoutes = RouterModule.forChild(routes);

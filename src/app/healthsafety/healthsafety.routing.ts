import { Routes, RouterModule } from '@angular/router';
import { FullComponent } from '../layouts/full/full.component';
import {SafetyhazardComponent} from './safetyhazard/safetyhazard.component';

const routes: Routes = [
  { 
    path : '',
    component: FullComponent,
    children: [
      { path: 'safety-hazard', component: SafetyhazardComponent,
      data: {
        title: 'Safety Hazard ',
        urls: [{ title: 'Dashboard', url: '/' }, { title: 'Safety Hazard' }],
      } },
    ]
   },
];

export const HealthsafetyRoutes = RouterModule.forChild(routes);

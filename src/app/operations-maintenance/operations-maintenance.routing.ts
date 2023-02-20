import { Routes, RouterModule } from '@angular/router';
import { FullComponent } from '../layouts/full/full.component';

import { OperationsMaintenanceComponent } from './operations-maintenance.component';
import { DailyPlantPrestartsComponent } from './daily-plant-prestarts/daily-plant-prestarts.component';
const routes: Routes = [
  { 

    
    path : '', 
    component: FullComponent,
    children: [
      {
        path: 'daily-plant-prestarts', component: DailyPlantPrestartsComponent,
        data: {
          title: 'Daily Plant Prestarts',
          urls: [{ title: 'Operations Maintenance', url: '/' }, { title: 'Operations' }],
        }
      },
    ]
   },
];

export const OperationsMaintenanceRoutes = RouterModule.forChild(routes);

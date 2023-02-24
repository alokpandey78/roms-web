import { Routes, RouterModule } from '@angular/router';
import { FullComponent } from '../layouts/full/full.component';

import { OperationsMaintenanceComponent } from './operations-maintenance.component';
import { PlantPrestartsComponent } from './plant-prestarts/plant-prestarts.component';
const routes: Routes = [
  { 

    
    path : '', 
    component: FullComponent,
    children: [
      {
        path: 'plant-prestarts', component: PlantPrestartsComponent,
        data: {
          title: 'Plant Prestarts',
          urls: [{ title: 'Operations Maintenance', url: '/' }, { title: 'Operations' }],
        }
      },
    ]
   },
];

export const OperationsMaintenanceRoutes = RouterModule.forChild(routes);

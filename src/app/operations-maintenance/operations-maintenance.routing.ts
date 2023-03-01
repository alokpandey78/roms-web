import { Routes, RouterModule } from '@angular/router';
import { FullComponent } from '../layouts/full/full.component';

import { OperationsMaintenanceComponent } from './operations-maintenance.component';
import { PlantPrestartsComponent } from './plant-prestarts/plant-prestarts.component';
import { PlantPrestartsDetailComponent } from './plant-prestarts-detail/plant-prestarts-detail.component';
import { InspectionListComponent } from './inspection-list/inspection-list.component';

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
      {
        path: 'plant-prestarts/prestart', component: PlantPrestartsDetailComponent,
        data: {
          title: 'Prestart Report',
          urls: [{ title: 'Plant Prestarts', url: '/operations-maintenance/plant-prestarts' }, { title: 'Operations Maintenance Prestarts' }],
        }
      },
      {
        path: 'inspection-list',
        component: InspectionListComponent,
        data: {
          title: 'Inspection List',
          urls: [{ title: 'Dashboard', url: '/' }, { title: 'Operations' }],
        },
      },
    ]
   },
];

export const OperationsMaintenanceRoutes = RouterModule.forChild(routes);

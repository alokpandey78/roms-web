import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AppBlankComponent } from './layouts/blank/blank.component';
import { AuthGuard } from './core/_helpers';

export const AppRoutes: Routes = [
  {
    path: '',
    component: AppBlankComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      },
      // {
      //   path: '',
      //   redirectTo: '/dashboards/dashboard1',
      //   pathMatch: 'full',
      // },
      {
        path: 'dashboard',
        redirectTo: '/dashboards/dashboard1',
        pathMatch: 'full',
      },
      {
        path: 'dashboards',
        loadChildren: () =>
          import('./dashboards/dashboards.module').then((m) => m.DashboardsModule),
      },
      {
        path: 'employee',
        loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'leave',
        loadChildren: () => import('./leave-management/leave-management.module').then(m => m.LeaveManagementModule),
        canActivate: [AuthGuard]
      },
      // {
      //   path: 'material',
      //   loadChildren: () =>
      //     import('./material-component/material.module').then((m) => m.MaterialComponentsModule),
      // },
      // {
      //   path: 'apps',
      //   loadChildren: () => import('./apps/apps.module').then((m) => m.AppsModule),
      // },
      // {
      //   path: 'forms',
      //   loadChildren: () => import('./forms/forms.module').then((m) => m.FormModule),
      // },
      // {
      //   path: 'tables',
      //   loadChildren: () => import('./tables/tables.module').then((m) => m.TablesModule),
      // },
      // {
      //   path: 'tree',
      //   loadChildren: () => import('./tree/tree.module').then((m) => m.TreeModule),
      // },
      // {
      //   path: 'datatables',
      //   loadChildren: () =>
      //     import('./datatables/datatables.module').then((m) => m.DataTablesModule),
      // },
      // {
      //   path: 'pages',
      //   loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
      // },
      // {
      //   path: 'widgets',
      //   loadChildren: () => import('./widgets/widgets.module').then((m) => m.WidgetsModule),
      // },
      // {
      //   path: 'charts',
      //   loadChildren: () => import('./charts/chartslib.module').then((m) => m.ChartslibModule),
      // },
      // {
      //   path: 'multi',
      //   loadChildren: () => import('./multi-dropdown/multi-dd.module').then((m) => m.MultiModule),
      // },
    ],
  },
  // {
  //   path: '',
  //   component: AppBlankComponent,
  //   children: [
  //     {
  //       path: 'authentication',
  //       loadChildren: () =>
  //         import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
  //     },
  //   ],
  // },
  {
    path: '**',
    redirectTo: 'authentication/404',
  },
];

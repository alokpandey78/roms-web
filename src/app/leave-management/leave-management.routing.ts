import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullComponent } from '../layouts/full/full.component';
import { LeaveApplyFormComponent } from './leave-apply-form/leave-apply-form.component';
import { LeaveRequestListComponent } from './leave-request-list/leave-request-list.component';
import { LeaveReportComponent } from './leave-report/leave-report.component';
const routes: Routes = [
    {
        path: '',
        component: FullComponent,
        children: [
            {
                path: 'apply-leave', component: LeaveApplyFormComponent, pathMatch: 'full',
                data: {
                    title: 'Personal Leave Request',
                    urls: [{ title: 'Dashboard', url: '/leave/apply-leave' }, { title: 'Personal' }],
                }
            },
            {
                path: 'leave-request', component: LeaveRequestListComponent,
                data: {
                    title: 'My Staff Leave Requests',
                    urls: [{ title: 'Dashboard', url: '/' }, { title: 'My Staff' }],
                }
            },
            {
                path: 'leavelistall', component: LeaveReportComponent,
                data: {
                  title: 'All Leaves',
                  urls: [{ title: 'People & Culture', url: '/' }, { title: 'Staff Leaves' }],
                }
              }, 
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LeaveManagementRoutingModule { }

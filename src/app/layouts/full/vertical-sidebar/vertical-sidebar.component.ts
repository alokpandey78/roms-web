import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  Output,
  EventEmitter,
  Input,
  OnInit,
} from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import { Menu } from 'src/app/shared/menu-items/horizontal-menu-items';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vertical-sidebar',
  templateUrl: './vertical-sidebar.component.html',
  styleUrls: [],
})
export class VerticalAppSidebarComponent implements OnInit, OnDestroy {
  public config: PerfectScrollbarConfigInterface = {};
  mobileQuery: MediaQueryList;

  @Input() showClass: boolean = false;
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _mobileQueryListener: () => void;
  status = true;
  showMenu = '';
  itemSelect: number[] = [];
  parentIndex = 0;
  childIndex = 0;
  user: any = {};
  userPermissions: any = {};
  menuItems: Menu[] = [];
  baseUrl: string = environment.apiUrl;
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  subclickEvent(): void {
    this.status = true;
  }
  scrollToTop(): void {
    document.querySelector('.page-wrapper')?.scroll({
      top: 0,
      left: 0,
    });
  }

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthenticationService,
    private router: Router, // public menuItems: MenuItems,
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    console.log(this.user, '');
    this.userPermissions = this.authService.getUserPermission()?.menus;
    //console.log(this.userPermissions, 'this.userPermissions');

    let menuItem: Menu[] = [];

    menuItem.push({ state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' });

    if (this.userPermissions) {
      menuItem.push({
        state: '',
        name: 'Personal & My Staff',
        type: 'saperator',
        icon: 'av_timer',
      });
      //condition for menu of operatins
      if (this.userPermissions.operations && this.userPermissions.operations.length > 0) {
        let subMenu = [];
        if (this.userPermissions.operations.includes('assets')) {
          subMenu.push({ state: 'coming-soon', name: 'Assets', type: 'link', icon: 'commute' });
        }
        if (this.userPermissions.operations.includes('inspection')) {
          subMenu.push({
            state: 'coming-soon',
            name: 'Inspection',
            type: 'link',
            icon: 'description',
          });
        }
        // if (this.userPermissions.operations.includes('inspection')) {
        // subMenu.push({
        //   displayName: 'People', iconName: '', route: '/', children: [
        //     {
        //       displayName: 'Transfer', iconName: '', route: '/employee/transfer'
        //     }
        //   ]
        // });
        // }
        // menuItem.push({ state: 'operation', name: 'Operation', type: 'sub', icon: 'commute', children: subMenu });
      }

      //condition for menu of timeoff
      if (this.userPermissions.timeoff && this.userPermissions.timeoff.length > 0) {
        let subMenu = [];
        if (this.userPermissions.timeoff.includes('applyleave')) {
          subMenu.push({
            state: 'leave/apply-leave',
            name: 'Request leave',
            type: 'link',
            icon: '',
          });
          // subMenu.push({ displayName: 'My Leaves', iconName: '', route: '/leave' });
          // subMenu.push({
          //   state: 'employee/resignation',
          //   name: 'Resignation',
          //   type: 'link',
          //   icon: 'timer',
          // });
        }
        if (this.userPermissions.timeoff.includes('history')) {
          // subMenu.push({ state: 'coming-soon', name: 'Holidays', type: 'link', icon: '' });
          // subMenu.push({ displayName: 'Holidays', iconName: '', route: '/' });
        }
        menuItem.push({
          state: 'personal',
          name: 'Personal',
          type: 'sub',
          icon: 'perm_contact_calendar',
          children: subMenu,
          // badge: [{ type: 'warning', value: 'new' }],
        });
      }

      //condition for menu of my staff
      if (this.userPermissions.dashboard && this.userPermissions.dashboard.length > 0) {
        let subMenu: any = [];
        if (this.userPermissions.dashboard.includes('mystaff')) {
          subMenu.push({
            state: 'leave/leave-request',
            name: 'Leave Request',
            type: 'link',
            icon: 'account_box',
          });
          subMenu.push({
            state: 'employee/resignation-list',
            name: 'Resignations',
            type: 'link',
            icon: 'timer',
          });
        }
        // if (this.userPermissions.timeoff.includes('history')) {
        //   subMenu.push({ displayName: 'Holidays', iconName: '', route: '/' });
        // }
        menuItem.push({
          state: 'staff',
          name: 'My Staff',
          type: 'sub',
          icon: 'people',
          children: subMenu,
        });
      }

      menuItem.push({
        state: '',
        name: 'People & Culture',
        type: 'saperator',
        icon: 'av_timer',
      });
      if (this.userPermissions.reports && this.userPermissions.reports.length > 0) {
        let subMenu: any = [];

        if (this.userPermissions.reports.includes('add_user')) {
          subMenu.push({
            state: '/employee/employee-list',
            name: 'Employees',
            type: 'link',
            icon: 'account_box',
          });
        }

        if (this.userPermissions.reports.includes('add_user')) {
          subMenu.push({
            state: 'registration/list',
            name: 'Registrations',
            type: 'link',
            icon: 'account_box',
            badge: [{ type: 'warning', value: 'new' }],
          });
        }

        if (this.userPermissions.reports.includes('add_user')) {
          subMenu.push({
            state: '/employee/onboarding-list',
            name: 'Onboarding',
            type: 'link',
            icon: 'account_box',
          });

          if (this.userPermissions.reports.includes('leave_export')) {
            subMenu.push({
              state: 'leave/leavelistall',
              name: 'Leave',
              type: 'link',
              icon: 'account_box',
            });
          }

          if (this.userPermissions.reports.includes('resign_export')) {
            subMenu.push({
              state: 'employee/resignation',
              name: 'Resignations',
              type: 'link',
              icon: 'account_box',
            });
          }

          // if (this.userPermissions.reports.includes('add_user')) {
          //   subMenu.push({
          //     state: 'transfer/list',
          //     name: 'Transfer',
          //     type: 'link',
          //     icon: 'account_box',
          //     badge: [{ type: 'warning', value: 'new' }],
          //   });

          // }
        }

        // if (this.userPermissions.reports.includes('leave_export')) {
        //   subMenu.push({ displayName: 'Holidays', iconName: '', route: '/' });
        // }
        menuItem.push({
          state: 'report',
          name: 'People & Culture',
          type: 'sub',
          icon: 'people',
          children: subMenu,
        });
      }

      menuItem.push({
        state: '',
        name: 'Operations',
        type: 'saperator',
        icon: 'av_timer',
        badge: [{ type: 'warning', value: 'new' }],
      });
      if (this.userPermissions.reports && this.userPermissions.reports.length > 0) {
        let subMenu: any = [];
        if (this.userPermissions.reports.includes('add_user')) {
          subMenu.push({
            state: '/registration/job-recommend',
            name: 'Demand Board',
            type: 'link',
            icon: 'account_box',
          });

          subMenu.push({
            state: '/registration/recommendation-list',
            name: 'Candidates',
            type: 'link',
            icon: 'account_box',
          });

          subMenu.push({
            state: '/registration/transfer-list',
            name: 'Internal Transfers',
            type: 'link',
            icon: 'account_box',
          });
        }
        menuItem.push({
          state: 'report',
          name: 'Staff Movements',
          type: 'sub',
          icon: 'assessment',
          children: subMenu,
        });
      }
      if (this.userPermissions.reports && this.userPermissions.reports.length > 0) {
        if (this.userPermissions.operations && this.userPermissions.operations.length > 0) {
          let subMenu = [];
          subMenu.push({
            state: '/client/assets-list',
            name: 'Assets',
            type: 'link',
            icon: 'commute',
          });
          subMenu.push({
            state: '/operations-maintenance/plant-prestarts',
            name: 'Plant PreStart',
            type: 'link',
            icon: 'commute',
          });   
          subMenu.push({
            state: '/client/attendance',
            name: 'Daily CheckIn',
            type: 'link',
            icon: 'commute',
          });        
          menuItem.push({
            state: 'operation',
            name: 'Operations',
            type: 'sub',
            icon: 'commute',
            children: subMenu,
            // badge: [{ type: 'warning', value: 'new' }],
          });
        }
        
      }
      if (this.userPermissions.reports && this.userPermissions.reports.length > 0) {
        if (this.userPermissions.operations && this.userPermissions.operations.length > 0) {
          let subMenu = [];
          
          subMenu.push({
            state: '/healthsafety/safety-hazard',
            name: 'Safety Hazards',
            type: 'link',
            icon: 'commute',
          }); 
      
          menuItem.push({
            state: 'operation',
            name: 'Safety',
            type: 'sub',
            icon: 'security',
            children: subMenu,
            badge: [{ type: 'warning', value: 'new' }],
          });
          
        }
        
      }

      menuItem.push({
        state: '',
        name: 'Coming soon',
        type: 'saperator',
        icon: 'av_timer',
      });

      if (this.userPermissions.reports && this.userPermissions.reports.length > 0) {
        if (this.userPermissions.operations && this.userPermissions.operations.length > 0) {
          let subMenu = [];     
          // subMenu.push({
          //   state: '/client/hazard',
          //   name: 'Hazard',
          //   type: 'link',
          //   icon: 'account_box',
          // });
          subMenu.push({
            state: '/client/client-list',
            name: 'Client',
            type: 'link',
            icon: 'account_box',
          });

          subMenu.push({
            state: '/client/project-list',
            name: 'Projects',
            type: 'link',
            icon: 'account_box',
          });
          
          subMenu.push({
            state: '/healthsafety/safety-hazard',
            name: 'Hazard Reporting',
            type: 'link',
            icon: 'commute',
          });  
          subMenu.push({
            state: '/client/prestart',
            name: 'Prestart Legacy',
            type: 'link',
            icon: 'commute',
          });
          menuItem.push({
            state: 'operation',
            name: 'Work Order',
            type: 'sub',
            icon: 'commute',
            children: subMenu,
          });
        }
      }
    }

    console.log(menuItem);
    this.menuItems = menuItem;
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  getRoute(url: string) {
    // this.router.navigate([url]);
    return `/${url.replace(/%/g, '/')}`;
  }
  handleNotify() {
    if (window.innerWidth < 1024) {
      this.notify.emit(!this.showClass);
    }
  }
}

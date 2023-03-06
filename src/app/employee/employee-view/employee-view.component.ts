import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, EmployeeService } from 'src/app/core/services';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { CustomMessage } from 'src/app/custom-message';
import { FormGroup } from '@angular/forms';
import { Globals } from 'src/app/globals';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css'],
})
export class EmployeeViewComponent implements OnInit {
  globals: Globals;
  panelOpenState = false;
  step = 0;
  record: any;
  data: any;
  user: any;
  managerdata: any;
  test: string = 'hello';
  id: string = '';
  currentAddress: any;
  setmngrdata: any;
  postalAddress: any;
  residentialAddress: any;
  isEditEnable: boolean = false;
  emergencyContactMain: any = null;
  otherEmergencyContact: any = null;
  primaryLicence: any = null;
  otherLicence: any = null;
  primaryBank: any = null;
  otherBank: any = null;
  primaryTfn: any = null;
  primarySuperAnnuation: any = null;
  otherSuperAnnuation: any = null;
  primaryMembership: any = null;
  paymentFrequency: string = '';
  type: string = 'personal';
  tabIndex: number = 0;
  tabIndexList: any = [
    'personal',
    'emergency',
    'licence',
    'payroll',
    'leaves',
    'membership',
    'employment',
  ];
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router,
    private alertService: AlertService,
    private authService: AuthenticationService,
    global: Globals,
  ) {
    this.globals = global;
    this.user = this.authService.getCurrentUser();

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.activatedRoute.queryParams.subscribe((params: any) => {
      // console.log(params);
      if (params['type']) {
        this.type = params['type'];
        if (this.tabIndexList.includes(this.type)) {
          this.tabIndex = this.tabIndexList.indexOf(this.type);
        }
      } else {
        this.type = 'personal';
      }
      if (params['id']) {
        this.id = params['id'];
        this.employeeService.getByIdPersonalInfo(params['id']).subscribe(
          (result: any) => {
            console.log(this.user);
            this.record = result;
            if (this.record && this.record.address) {
              console.log(this.record);
              this.currentAddress = this.record.address.find((elem: any) => elem.type == 2);
              this.postalAddress = this.record.address.find((elem: any) => elem.type == 1);
              this.residentialAddress = this.record.address.find((elem: any) => elem.type == 1);
              this.emergencyContactMain =
                this.record.emergencyContact && this.record.emergencyContact.length > 0
                  ? this.record.emergencyContact[0]
                  : null;
              this.otherEmergencyContact =
                this.record.emergencyContact && this.record.emergencyContact.length > 1
                  ? this.record.emergencyContact[1]
                  : null;

              this.primaryLicence =
                this.record.licence && this.record.licence.length > 0
                  ? this.record.licence[0]
                  : null;
              this.otherLicence =
                this.record.licence && this.record.licence.length > 1
                  ? this.record.licence[1]
                  : null;

              this.primaryBank =
                this.record.bankingDetails && this.record.bankingDetails.length > 0
                  ? this.record.bankingDetails[0]
                  : null;
              this.otherBank =
                this.record.bankingDetails && this.record.bankingDetails.length > 1
                  ? this.record.bankingDetails[1]
                  : null;

              this.primaryTfn =
                this.record.tfn && this.record.tfn.length > 0 ? this.record.tfn[0] : null;

              this.primarySuperAnnuation =
                this.record.superannuation && this.record.superannuation.length > 0
                  ? this.record.superannuation[this.record.superannuation.length - 1]
                  : null;
              if (
                this.record.superannuation.length >= 1 &&
                this.record.superannuation[0] &&
                this.record.superannuation[0].abn
              ) {
                this.primarySuperAnnuation = this.record.superannuation[0];
              } else if (
                this.record.superannuation.length >= 2 &&
                this.record.superannuation[1] &&
                this.record.superannuation[1].abn
              ) {
                this.primarySuperAnnuation = this.record.superannuation[1];
              } else if (this.record.superannuation.length > 0) {
                this.primarySuperAnnuation = {
                  fundType: 3,
                  usi: this.globals.defaultUsi,
                  abn: this.globals.defaultAbn,
                };
              }

              this.otherSuperAnnuation =
                this.record.superannuation && this.record.superannuation.length > 1
                  ? this.record.superannuation[1]
                  : null;
              // this.primarySuperAnnuation = this.otherSuperAnnuation ? this.otherSuperAnnuation : this.otherSuperAnnuation;

              this.primaryMembership =
                this.record.membership && this.record.membership.length > 0
                  ? this.record.membership[0]
                  : null;
              this.paymentFrequency =
                this.record?.personal?.paymentFrequency == 'w'
                  ? 'Weekly'
                  : this.record?.personal?.paymentFrequency == 'm'
                  ? 'Monthly'
                  : 'Fortnightly';
            }
            console.log(result);
          },
          (error: any) => {
            this.alertService.openSnackBar(CustomMessage.recordNotFound);
            this.router.navigate(['/dashboard']);
          },
        );
      } else {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  ngOnInit(): void {
    this.getmanager();
  }

  redirect() {
    console.log(this.user);
    if (this.user.id == this.id) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate(['/employee/profile'], { queryParams: { id: this.id } });
    }
  }
  public getmanager() {
    this.employeeService.getManagerdata().subscribe((mdata) => {
      this.managerdata = mdata;
    });
  }

  setmanager(mid: string) {
    this.setmngrdata = {
      employeeIds: this.user.id,
      managerId: mid,
    };

    this.employeeService.setmanagerdata(this.setmngrdata).subscribe();
  }
}

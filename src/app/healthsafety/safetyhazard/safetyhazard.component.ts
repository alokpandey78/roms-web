import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { environment } from 'src/environments/environment';

import { AuthenticationService } from 'src/app/core/services/auth.service';
import { HealthsafetyService } from '../../core/services/healthsafety.service';
import { EmployeeService } from 'src/app/core/services';

//utilities
import { ViewOptions } from 'src/app/_models';
import { Utils } from 'src/app/core/_helpers/util';
import { DatePipe } from '@angular/common';
import { first } from 'rxjs';
import * as moment from 'moment';
import { saveAs } from 'file-saver';

// Anguluar MAterial
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatTooltipDefaultOptions,
  TooltipPosition,
} from '@angular/material/tooltip';
import { UntypedFormControl } from '@angular/forms';

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 1000,
  touchendHideDelay: 1000,
};

@Component({
  selector: 'app-safetyhazard',
  templateUrl: './safetyhazard.component.html',
  styleUrls: ['./safetyhazard.component.css'],
  providers: [{ provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }],
})
export class SafetyHazardComponent implements OnInit, OnChanges {
  user:any;
  globals: Globals;
  displayedColumns: string[] = ['Reported','reportedBy','hazard','address','risk','supervisor'];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatSort, { static: false }) sort: MatSort = Object.create(null);
  pagesize = 10;
  pageNo = 0;
  pageSize = 10;
  totalRecords: number = 0;
  paginator:any={
    pageIndex:this.pageNo,
    pageSize:this.pageSize
  }



  search: string = '';
  startDate: Date = new Date(new Date().setMonth(new Date().getMonth() - 1));
  endDate: Date = new Date(new Date().setDate(new Date().getDate() + 1));
  status: any = 0;
  selectedId: string = '';
  baseUrl: string = environment.apiUrl;

  //
  severity: string ='';
  managerId: any = '';
  managers: any = [];
  employeeId : any = '';
  employees: any = [];
  matStartDate : Date = new Date(new Date().setMonth(new Date().getMonth() - 1));
  matEndDate : Date = new Date();
  //

    // tooltips
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new UntypedFormControl(this.positionOptions[0]);
  showDelay = new UntypedFormControl(500);
  hideDelay = new UntypedFormControl(20);
  disabled = new UntypedFormControl(false);
  message = new UntypedFormControl('message');
  position1 = new UntypedFormControl(this.positionOptions[0]);
    //end of tooltips
  constructor(
    public util: Utils,
    globals: Globals,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private employeeService: EmployeeService,
    private healthsafetyService: HealthsafetyService,
    private router: Router
  ) {
    this.user=this.authService.getCurrentUser();
    this.globals = globals;
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.searchManager({ target: { value: '' } });
    this.searchEmployee({ target: { value: '' } });
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams['id']) {
        this.selectedId = queryParams['id'];
      }
    });
  }

  ngOnInit(): void {
    this.refresh(this.getDefaultOptions());
  }
  ngOnChanges(changes: SimpleChanges): void {
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  refresh(options: ViewOptions, isScrolled: boolean = false) {
    let startDate = this.matStartDate? moment(new Date(new Date(this.matStartDate).setHours(0, 0, 0, 0)).toUTCString()).format('DD/MM/YYYY hh:mm:ss'): '';
    let endDate = this.matEndDate? moment(new Date(new Date(this.matEndDate).setHours(23, 59, 59, 59)).toUTCString()).format('DD/MM/YYYY hh:mm:ss'): '';
    this.managerId= this.managerId == 'all' ? '' : this.managerId;
    let payload = {
      searchText: `${this.search}`,
      severity : `${this.severity}`,
      manager : this.managerId,
      employee : this.employeeId,
      reportFromDate: startDate,
      reportToDate: endDate,
    }

    this.healthsafetyService
      .getHazardListFilter({options, payload})
      .pipe(first())
      .subscribe((result: any) => {
        this.totalRecords = result.totalElement;
        let data: any = [];
        for (let i = 0; i < result.data.length; i++) {
          // this. result.data[i].description)
          let convertedDesc = result.data[i].description ?? 'No description provided';
          let convertedLoc = result.data[i].address ?? 'No description provided';

          let convertedStartDate = this.datePipe.transform(result.data[i].createDate, 'dd/MM/yyyy hh:mm:ss');
          data.push({
            ...result.data[i],
            convertedStartDate: convertedStartDate,
            convertedDesc: convertedDesc,
            convertedLoc: convertedLoc,
          });
        }
        if (isScrolled == true) {
          this.dataSource.data = [...this.dataSource.data, ...data];
        } else {
        this.dataSource.data = data;
         }
      });
  }

  getDefaultOptions() {
    let obj = this.paginator;
    let sort = this.sort;
    let pageSize = obj != undefined ? (obj.pageIndex == null ? 1 : obj.pageIndex + 1) : 1;
    console.log(obj);

    const options: ViewOptions = {
      sortField: sort !== undefined ? sort.active : 'hazard',
      sortDirection: sort !== undefined ? sort.direction : 'asc',
      // page: (obj != undefined ? (obj.pageIndex == null ? 1 : obj.pageIndex + 1) : 1),
      page: pageSize - 1,
      search: '',
      query: '',
      pageSize:
        obj != undefined ? (obj.pageSize == null ? this.pagesize : obj.pageSize) : this.pagesize,
    };

    return options;
  }

  applyFilter(isTextSearch: boolean = false): void {
    this.paginator.pageIndex=0;
    this.paginator.pageSize=10;
    this.search = this.search.trim(); // Remove whitespace
    this.search = this.search.toLowerCase(); // Datasource defaults to lowercase matches
    if (isTextSearch) {
      this.pageNo = 0;
      this.totalRecords = 0;
      this.paginator.firstPage();
    }
    this.refresh(this.getDefaultOptions());
  }

  searchManager(event: any) {
    this.employeeService.searchHiringManager(event.target.value).subscribe((result: any) => {
      this.managers = result;
    });
  }

  searchEmployee(event: any) {
     this.employeeService.searchHiringManager(event.target.value).subscribe((result: any) => {
       this.employees = result;
     });

      // this.employeeService.getEmployeeList(
      //             {sortField:'',sortDirection: '', page:0,search: '',query: '',pageSize:10},
      //             {searchText:'',frequency:'wfm',empStatus:0 }).subscribe((result: any) => {
      //     this.employees = result;
      // });
  }
  onTableScroll(e: any) {
    const tableViewHeight = e.target.offsetHeight; // viewport: ~500px
    const tableScrollHeight = e.target.scrollHeight; // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled
    const buffer = 10;
    const limit = tableScrollHeight - tableViewHeight - buffer;
    if (scrollLocation > limit) {
      if (this.dataSource.data.length < this.totalRecords) {
        this.paginator.pageIndex = this.paginator.pageIndex + 1;
        this.paginator.pageSize = this.paginator.pageSize;
        this.refresh(this.getDefaultOptions(), true);
      }


    }
  }
  exportCsv() {
    let csvArray: any = [
      'create_date, hazard_no,reported_date,hazard_desc,address,riskLevel, manualAddressFlag,rectifyFlag,reportedBy,Supervisro\r\n',];

    for (let i = 0; i < this.dataSource.data.length; i++) {
      let item = this.dataSource.data[i];
      let row: string = `${item?.reportedBy}\r\n`;
      csvArray.push(row);
    }
    let fileName = `SafetyHazard${new Date().getTime()}.csv`;
    var blob = new Blob(csvArray, { type: 'text/csv' });
    saveAs(blob, fileName);
  }
}

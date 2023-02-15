import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Globals} from 'src/app/globals';
import { ActivatedRoute } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {  OnChanges, SimpleChanges } from '@angular/core';


import { AuthenticationService } from 'src/app/core/services/auth.service';
import { HealthsafetyService } from '../services/healthsafety.service';


//utilities 
import { saveAs } from 'file-saver';
import { ViewOptions } from 'src/app/_models';
import { Utils } from 'src/app/core/_helpers/util';
import { DatePipe } from '@angular/common';
import { first } from 'rxjs';


// Angluar MAterial
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UntypedFormControl } from '@angular/forms';
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatTooltipDefaultOptions,
  TooltipPosition,
} from '@angular/material/tooltip';
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
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class SafetyhazardComponent implements OnInit, OnChanges {
  globals: Globals;
  user: any;
  totalRecords: number = 0;
  googleMapLink : string = 'https://www.google.com/maps/search/';
  displayedColumns: string[] = ['Reported','reportedBy','hazard','address','risk','supervisor'];
    //'select',  //'icon',
  totalData: any = [];
  search: string = ''; //by default 0 for pending list
  severity: string ='';
  manager: string ='';
  employee : string ='';
  matEndDate : string ='';
  matStartDate : string ='';

  pageNo = 0;
  pageSize = 10;
  paginator:any={
    pageIndex:this.pageNo,
    pageSize:this.pageSize
  }
  hazardData: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatSort, { static: false })   sort: MatSort = Object.create(null);

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
    private healthsafetyService: HealthsafetyService,

    ) { 
      this.globals = globals;
      this.user = this.authService.getCurrentUser();
    }

  ngOnInit():void {
    this.refreshHazard(this.getDefaultOptions());

  }

  ngOnChanges(changes: SimpleChanges): void { }

  applyFilter(isTextSearch: boolean = false): void {
    this.paginator.pageIndex=0;
    this.paginator.pageSize=10;
    //this.getAllHazardList();
    if (isTextSearch) {
      this.hazardData.filter = this.search;
    } else {
      let data = this.totalData;
      this.refreshHazard(this.getDefaultOptions());
    }
  }

  getDefaultOptions() {
    let obj = this.paginator;
    let pageSize = obj != undefined ? (obj.pageIndex == null ? 1 : obj.pageIndex + 1) : 1;
    let query ='' ;
    const options: ViewOptions = {
      sortField: this.sort !== undefined ? this.sort.active : 'risk',
      sortDirection: this.sort !== undefined ? this.sort.direction : 'asc',
      page: pageSize - 1,
      search: '',
      query: query,
      pageSize:
        obj != undefined ? (obj.pageSize == null ? this.pageSize : obj.pageSize) : this.pageSize,
    };
    return options;
  }

  onTableScroll(e: any) {
    const tableViewHeight = e.target.offsetHeight; // viewport: ~500px
    const tableScrollHeight = e.target.scrollHeight; // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled
    const buffer = 10;
    const limit = tableScrollHeight - tableViewHeight - buffer;
    if (scrollLocation > limit) {
      if (this.hazardData.data && (this.hazardData.data.length < this.totalRecords)) {
        this.paginator.pageIndex = this.paginator.pageIndex + 1;
        this.paginator.pageSize = this.paginator.pageSize + 10;
        this.refreshHazard(this.getDefaultOptions(), true);
      }
    }
  }
  /* end of  onTableScroll */
  refreshHazard(options: ViewOptions, isScrolled: boolean = false) {
    let queryData = {};
    let payload = {
      searchText: `${this.search}`,
      severity : `${this.severity}`,
      manager : `${this.manager}`,
      employee : `${this.employee}`,
      reportFromDate: `${this.matStartDate}`,
      reportToDate: `${this.matEndDate}`, 
    }
    console.log(payload);
    this.healthsafetyService
      .getHazardListFilter({ options, payload })
      .pipe(first())
      .subscribe((result: any) => {
        let data: any = [];
        data = result.data;
        if (isScrolled == true) {
          this.hazardData.data = [...this.hazardData.data, ...data];        
        } else {
          data = JSON.parse(JSON.stringify(data));
          this.totalData = data;
          let tempData = JSON.parse(JSON.stringify(data));
          this.hazardData.data = tempData.splice(0, 10);
         }
      });
  }
  exportCsv() {
    let csvArray: any = [
      'create_date, hazard_no,reported_date,hazard_desc,address,riskLevel, manualAddressFlag,rectifyFlag,reportedBy,Supervisro\r\n',];

    for (let i = 0; i < this.hazardData.data.length; i++) {
      let item = this.hazardData.data[i];
      let row: string = `${item?.reportedBy}\r\n`;
      csvArray.push(row);
    }
    let fileName = `SafetyHazard${new Date().getTime()}.csv`;
    var blob = new Blob(csvArray, { type: 'text/csv' });
    saveAs(blob, fileName);
  }
}






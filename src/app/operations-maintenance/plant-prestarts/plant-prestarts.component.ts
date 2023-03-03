import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { environment } from 'src/environments/environment';

import { AuthenticationService } from 'src/app/core/services/auth.service';
import { EmployeeService } from 'src/app/core/services';
import {AssetsService} from 'src/app/core/services/assets.service';

//utilities
import { ViewOptions } from 'src/app/_models';
import { Utils } from 'src/app/core/_helpers/util';
import { DatePipe } from '@angular/common';
import { first } from 'rxjs';
import * as moment from 'moment'; 
import { saveAs } from 'file-saver';
import { TemplateRef } from '@angular/core';

// Anguluar MAterial
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatTooltipDefaultOptions,
  TooltipPosition,
} from '@angular/material/tooltip';
import { UntypedFormControl } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 1000,
  touchendHideDelay: 1000,
};

@Component({
  selector: 'plant-prestarts',
  templateUrl: './plant-prestarts.component.html',
  styleUrls: ['./plant-prestarts.component.css'],
  providers: [{ provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }],
})
export class PlantPrestartsComponent implements OnInit, OnChanges {
  user:any;
  globals: Globals;
  displayedColumns: string[] = [
  'Date', 
   'Plant'  , 
   'Location',
  //  'No', 
   'Inspections',
   'operator',
   'device',
  ];
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
  startDate: Date = new Date(new Date().setDate(new Date().getDate() - 2));
  endDate: Date = new Date(new Date().setDate(new Date().getDate()+1));
  status: any = 0;
  baseUrl: string = environment.apiUrl;

  employeeId: string = '0';
  
    // prestart 
  assetClass: any = [];
  assetType: any = [];
  assetDefect: any = [];
  assetLocation: any = [];
  assetList: any = [];
  selectedAssetClassId: string ='';
  selectedAssetTypeId: string ='';
  selectedDefectsId: string ='';
  selectedLocationsId: string ='';
  selectedRecord: any = {};
  selectedId: string = '';
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
    private assetsService: AssetsService,
    private router: Router
  ) {
    this.user=this.authService.getCurrentUser(); 
    this.globals = globals;
    this.assetDefect = globals.defectType;
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.assetsService.getAllAssetsClass().subscribe((result: any) => {
      this.assetClass = result && result.data && result.data.length > 0 ? result.data : [];
    });
    this.assetsService.getAllAssetsType().subscribe((result: any) => {
      this.assetList = result && result.data && result.data.length > 0 ? result.data : [];
    });

    // this.assetsService.getAllLocationsType().subscribe((result: any) => {
    //   this.assetList = result && result.data && result.data.length > 0 ? result.data : [];
    // });
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
  }
  private getUTC(myDate: Date) {
    const now = new Date();
    return new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
  }
  getDefaultOptions() {
    let obj = this.paginator;
    let sort = this.sort;
    let startDate = this.startDate
    ? moment(new Date(this.startDate).toUTCString()).format('DD/MM/yyyy hh:mm:ss'): '';
    let endDate = this.endDate
    ? moment(new Date(this.endDate).toUTCString()).format('DD/MM/yyyy hh:mm:ss'): '';
    //let pageIndex = obj != undefined ? (obj.pageIndex == null ? 1 : obj.pageIndex + 1) : 1;
    let pageIndex = obj.pageIndex ?? 0;
    let pageSize = obj.pageSize ?? this.pagesize;
    let query ='assetClass='.concat(this.selectedAssetClassId).concat("&assetType=") .concat(this.selectedAssetTypeId).concat("&defectType=") .concat(this.selectedDefectsId).concat("&assetLocation=") .concat(this.selectedLocationsId).concat("&fromDate=") .concat(startDate).concat("&toDate=") .concat(endDate);
    const options: ViewOptions = {
      sortField: sort !== undefined ? sort.active : 'no',
      sortDirection: sort !== undefined ? sort.direction : 'desc',
      page: pageIndex ,
      pageSize:pageSize,
      search: '',
      query: query,
    };
    return options;
  }

  applyFilter(isTextSearch: boolean = false): void {
    let queryData = {
      assetClass: this.assetClass == 'all' ? '' : this.assetClass,
      assetType: this.assetType == 'all' ? '' : this.assetType,
      assetDefect: this.assetDefect == 'all' ? '' : this.assetDefect,
      assetLocation: this.assetLocation == 'all' ? '' : this.assetLocation,
      };
    this.paginator.pageIndex=0;
    this.paginator.pageSize=10;
    if (isTextSearch) {
      this.dataSource.filter = this.search;
    } else {
    this.refresh(this.getDefaultOptions());
  }
  }

  refresh(options: ViewOptions, isScrolled: boolean = false) {
    this.assetsService
    .getPrestartList(this.getDefaultOptions())
    .pipe(first())
    .subscribe((result: any) => {
      this.totalRecords = result.totalElement;
      let data: any = [];
      let convertedDevice = 'Others';
      for (let i = 0; i < result.data.length; i++) {
        let convertedStartDate = this.datePipe.transform(result.data[i].createDate, 'dd/MM/yyyy hh:mm:ss');
        let convertedLoc = result.data[i].prestartLocation=='' ?'No description provided':result.data[i].prestartLocation;
        if((result.data[i].deviceName).search('/Android/gi')>=0 ) {
            convertedDevice = 'Android';

        } else {
          if((result.data[i].deviceName).search('/iOS/gi') >= 0) {
            convertedDevice = 'iOS';
          }
        }


        data.push({
          ...result.data[i],
          convertedStartDate: convertedStartDate,
          convertedLoc:convertedLoc,
          convertedDevice:convertedDevice
        });
      }
      if(isScrolled){
        this.dataSource.data = [...this.dataSource.data, ...result.data];
      }else{
         this.dataSource.data = result.data;
      }
      this.totalRecords=result.totalElement;
    });
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
}

// if doing new one change refresh , change dispay field , change html ng_templates 

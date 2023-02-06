import { Component, OnInit } from '@angular/core';

import {  OnChanges, SimpleChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';
import { AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AlertService,AssetsService, EmployeeService } from 'src/app/core/services';
import { LeaveService } from 'src/app/core/services/leave.service';
import { Utils } from 'src/app/core/_helpers/util';
import { Globals } from 'src/app/globals';
import { ViewOptions } from 'src/app/_models';
import { saveAs } from 'file-saver';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { element } from 'protractor';

@Component({
  selector: 'app-hazard',
  templateUrl: './hazard.component.html',
  styleUrls: ['./hazard.component.scss']
})
export class HazardComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'icon',
    'date',
    'no',
    'hazard',
    'category',
    'location',
    'reportedBy',
    'rectifyOn',
    'by',
    'supervisor',
  ];
  pageNo = 0;
  pageSize = 10;
  totalRecords: number = 0;
  paginator:any={
    pageIndex:this.pageNo,
    pageSize:this.pageSize
  }
  @ViewChild(MatSort, { static: false }) sort: MatSort = Object.create(null);
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  constructor(private assetsService: AssetsService) { }

  ngOnInit(): void {
    this.getAllHazardList();
  }


  getAllHazardList() {
    this.assetsService.getHazardList(this.getDefaultOptions()).subscribe((result: any) => {
      this.dataSource.data = result.data;
      this.totalRecords=result.totalElement;
    });
  }
  getDefaultOptions() {
    let obj = this.paginator;
    let sort = this.sort;
    let pageSize = obj != undefined ? (obj.pageIndex == null ? 1 : obj.pageIndex + 1) : 1;
   let query ='class';
    const options: ViewOptions = {
      sortField: sort !== undefined ? sort.active : 'convertedRegistrationDate',
      sortDirection: sort !== undefined ? sort.direction : 'desc',
      // page: (obj != undefined ? (obj.pageIndex == null ? 1 : obj.pageIndex + 1) : 1),
      page: pageSize - 1,
      search: '',
      query: query,
      pageSize:
        obj != undefined ? (obj.pageSize == null ? this.pageSize : obj.pageSize) : this.pageSize,
    };
    return options;
  }
}

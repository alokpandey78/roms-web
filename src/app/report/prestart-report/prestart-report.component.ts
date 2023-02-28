
import { Component, OnInit,Input } from '@angular/core';
import { TemplateRef} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {  AssetsService } from 'src/app/core/services';
import { ImagePreviewDialog } from 'src/app/shared/image-preview-dialog/image-preview-dialog.component';
import { first } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Globals } from 'src/app/globals';


@Component({
  selector: 'app-prestart-report',
  templateUrl: './prestart-report.component.html',
  styleUrls: ['./prestart-report.component.scss']
})
export class PrestartReportComponent implements OnInit {
  @ViewChild('imageDialog,') imageDialog!: TemplateRef<any>;
  // globals: Globals;

  submitted: boolean = false;
  defectUrl: string= "";

  prestartList: any = [];
  category_a: any = [];
  category_b: any = [];
  category_c: any = [];
  a_issue_count: number =0;
  b_issue_count: number =0;
  c_issue_count: number =0;
  selectedRecord: any = {};
  id : string = '';
  prestartDetails : any = {};
  isEditEnable: boolean = true;
  generatedCode: boolean = false;
  prestartNo: string = '';
  globals: Globals;
  displayedColumns: string[] = [
    'icon',
    'name',
    'status',
    'comment',
    'media',
    // 'tickbox',

  ];

  // convertedStartDate: convertedStartDate,
  // employeeName: employeeName,

  dataSource_c: MatTableDataSource<any> = new MatTableDataSource<any>();
  dataSource_b: MatTableDataSource<any> = new MatTableDataSource<any>();
  dataSource_a: MatTableDataSource<any> = new MatTableDataSource<any>();
  panelOpenState = false;
  // step = 0;

  // setStep(index: number): void {
  //   this.step = index;
  // }

  // nextStep(): void {
  //   this.step++;
  // }

  // prevStep(): void {
  //   this.step--;
  // }
  constructor(
    private dialog: MatDialog,
    globals: Globals,
    private router: Router, private activatedRoute: ActivatedRoute,private assetsService: AssetsService

    ) {
      this.globals = globals;
    }

    ngOnInit(): void {
      this.activatedRoute.queryParams.subscribe(params => {
        this.id = params['id'];
      });
      this.getPrestartReportDetails();

    }
  getPrestartReportDetails(){
    this.assetsService.getPrestartDetails(this.id).pipe(first()).subscribe((result: any) => {
          this.prestartDetails = result.data;
          this.prestartNo = this.prestartDetails.prestartNo;
          let data: any [] = result.data.prestartDetails;
        for (let i = 0; i <data.length; i++) {
             if(data[i].item.itemCategory.code ==='c'){
               this.category_c.push(data[i]);
             }
          if(data[i].item.itemCategory.code ==='b'){
            this.category_b.push(data[i]);
          }
          if(data[i].item.itemCategory.code ==='a'){
            this.category_a.push(data[i]);
          }
        }
        this.dataSource_c.data = this.category_c;
        this.dataSource_b.data = this.category_b;
        this.dataSource_a.data = this.category_a;
        this.a_issue_count = this.dataSource_a.data.filter(obj => (obj.answer == 2 )).length;
        this.b_issue_count = this.dataSource_b.data.filter(obj => (obj.answer == 2 )).length;
        this.c_issue_count = this.dataSource_c.data.filter(obj => (obj.answer == 2 )).length;
    });
  }
  getData(data: any) {
    let final: any = [];
    for (let item in data) {
      // console.log(data[item])
      final.push(data[item])
    }
    return final;
  }

  openImageDialog(data: any) {
    // alert();
    // this.selectedImage = data;
    const dialogRef = this.dialog.open(ImagePreviewDialog, {
      width: 'auto',
      height: '45em',
      data: { selectedImage: data }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      // this.router.navigate(['/registration/list']);
      console.log('The dialog was closed');
    });
  }

  getCategoryissueCount(category : string){
    if(category === 'c'){
      return this.dataSource_c.data.filter(obj => (obj.answer == 2 )).length;
    }
    if(category === 'b'){
      return this.dataSource_b.data.filter(obj => (obj.answer == 2 )).length;
    }
    if(category === 'a'){
      return this.dataSource_a.data.filter(obj => (obj.answer == 2 )).length;
    }
  }


  // getDefaultOptions() {
  //   let obj = this.paginator;
  //   let sort = this.sort;
  //   let pageSize = obj != undefined ? (obj.pageIndex == null ? 1 : obj.pageIndex + 1) : 1;

  //   const options: ViewOptions = {
  //     sortField: sort !== undefined ? sort.active : 'fullName',
  //     sortDirection: sort !== undefined ? sort.direction : 'asc',
  //     // page: (obj != undefined ? (obj.pageIndex == null ? 1 : obj.pageIndex + 1) : 1),
  //     page: pageSize - 1,
  //     search: '',
  //     query: `empName=${this.search}`,
  //     pageSize:
  //       obj != undefined ? (obj.pageSize == null ? this.pageSize : obj.pageSize) : this.pageSize,
  //   };
  //   return options;
  // }

  // getStatus(status: any) {
  //   return this.globals.userApplicationStatus.find((elem: any) => {
  //     return elem.value == status;
  //   })?.name;
  // }

  // getStatusColor(status: any, isCheckbox: boolean = false) {
  //   let elem: any = this.globals.userApplicationStatus.find((elem: any) => {
  //     return elem.value == status;
  //   });
  //   return elem ? (isCheckbox == true ? elem.checkboxColorClass : elem.colorClass) : '';
  // }

  // applyFilter(isTextSearch: boolean = false): void {
  //   // console.log(this.search, 'search', this.startDate, 'startdate', this.endDate, 'enddate');
  //   this.search = this.search.trim(); // Remove whitespace
  //   this.search = this.search.toLowerCase(); // Datasource defaults to lowercase matches
  //   // this.dataSource.filter = this.search;
  //   if (isTextSearch) {
  //     this.pageNo = 0;
  //     this.totalRecords = 0;
  //     this.paginator.firstPage();
  //     // this.dataSource.paginator?.pageIndex[0]=;
  //   }
  //   // else {
  //   this.refresh(this.getDefaultOptions());
  //   // }
  // }

  viewDefect(url: string) {
    this.submitted = true;
    this.defectUrl = url;
    this.openDialog(url);
  }
  openDialog(url: string) {
    const dialogRef = this.dialog.open(this.imageDialog, {
      width: '55em',
      height: '43em'
     // data: { data: data },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      // this.router.navigate(['/registration/list']);
      // console.log('The dialog was closed');
    });
  }

}

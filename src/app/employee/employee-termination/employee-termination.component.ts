import { Component, OnInit,TemplateRef, ViewChild ,Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { AlertService, EmployeeService, JobService } from 'src/app/core/services';
import * as moment from 'moment';
import { CustomMessage } from 'src/app/custom-message';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-employee-termination',
  templateUrl: './employee-termination.component.html',
  styleUrls: ['./employee-termination.component.scss']
})
export class EmployeeTerminationComponent implements OnInit {
  @Input() record: any;
  @ViewChild('terminateDialog,') terminateDialog!: TemplateRef<any>;
  form: FormGroup;
  submitted: boolean = false;
  employeId : any;
  dateStartAt = new Date();
  selectedButton = 0;

  constructor(private dialog: MatDialog,private fb: FormBuilder,private authService: AuthenticationService,private alertService: AlertService,private route: ActivatedRoute ) {
    this.form = this.fb.group({
      // employeeId: new FormControl('', [Validators.required]),

      effectiveDate: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),

    });
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(param=>{ this.employeId =param.id})


  }

  setNow(){
    // console.log('Inside today');
    this.dateStartAt = new Date();
    this.form.controls.effectiveDate.setValue(this.dateStartAt);
    this.selectedButton = 0;
  }
  // setToday(){
  //   // console.log('Inside today');
  //   this.dateStartAt = new Date();
  //   this.form.controls.propsedStartDate.setValue(this.dateStartAt);
  //   this.selectedButton = 1;
  // }

  setTomorrow(){
    this.dateStartAt = new Date(new Date().setDate(new Date().getDate() + 1));
    this.form.controls.effectiveDate.setValue(this.dateStartAt);
    this.selectedButton = 2;
  }

  setNextMonday(){
    this.dateStartAt = new Date();
    this.dateStartAt.setDate(this.dateStartAt.getDate() + (((1 + 7 - this.dateStartAt.getDay()) % 7) || 7));
    this.form.controls.effectiveDate.setValue(this.dateStartAt);
    this.selectedButton = 3;
  }
  get f() {
    return this.form.controls;
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };

  // onClick() {
  //   this.submitted = true;
  //   this.openDialog({});
  // }
  onSubmit() {
    // alert('hii');
    this.submitted = true;
    // console.log('Client:',this.form.controls.description);
    // this.openDialog({});

    if (this.form.invalid) {
      this.alertService.openSnackBar(CustomMessage.invalidForm);
      return;
    }
    else{

      let payload = {
         "employeeId" : this.employeId,
        // "demandType" : this.form.controls.demandType.value,
        // "profileRole" : this.form.controls.demandTitle.value,
        "effectiveDate" : moment(this.form.controls.effectiveDate.value).format('DD/MM/YYYY'),
        "description" : this.form.controls.description.value,

      }
      // alert(payload);
      console.log('Payload:',JSON.stringify(payload));
      this.authService.terminateEmployee(JSON.stringify(payload)).subscribe((result) => {
        console.log('Demad return:',result);
        this.alertService.openSnackBar(CustomMessage.employeeTerminated,false);

      });
    }
  }
  openDialog(data: any) {
    const dialogRef = this.dialog.open(this.terminateDialog, {
      width: '30em',
      height: '18em',
      data: { data: data },
    });

    dialogRef.afterClosed().subscribe((result: any) => {

    });
  }
  cancel(){
    this.dialog.closeAll();
  }
}

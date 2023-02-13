import { Component, OnInit,Input } from '@angular/core';
import { TemplateRef} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JobService, AssetsService, AlertService, LeaveService } from 'src/app/core/services';
import { Globals } from 'src/app/globals';
import * as moment from 'moment';
import { Utils } from 'src/app/core/_helpers/util';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ImagePreviewDialog } from 'src/app/shared/image-preview-dialog/image-preview-dialog.component';
import { first } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/auth.service';

import { CustomMessage } from 'src/app/custom-message';
@Component({
  selector: 'app-assets-view',
  templateUrl: './assets-view.component.html',
  styleUrls: ['./assets-view.component.scss']
})
export class AssetsViewComponent implements OnInit {
  submitted: boolean = false;
  selectedRecord: any = {};
  id : string = '';
  assetDetails : any = {};
  qrCodeDownloadLink:any;
  isEditEnable: boolean = false;
  generatedCode: boolean = false;
  assetNo: string = '';
  globals: Globals;
  selectedFile: string = '';
  attachmentFile: any;
  @ViewChild('confirmationDialog') confirmationDialog!: TemplateRef<any>;
  // @ViewChild('employeeDetailDialog') employeeDetailDialog!: TemplateRef<any>;
  form: FormGroup;
 
  constructor(private dialog: MatDialog,globals: Globals, private fb: FormBuilder, private alertService: AlertService, public util: Utils, private leaveService: LeaveService,private activatedRoute: ActivatedRoute, private authService: AuthenticationService, private assetsService: AssetsService, private router: Router)
  {
    this.globals = globals;
    this.form = this.fb.group({
      assetNo: new FormControl('', [Validators.required, Validators.pattern(this.util.aplhaNumericeWithoutSpace)]),
      name: new FormControl('', [Validators.required]),
      assetClass: new FormControl('', [Validators.required, Validators.pattern(this.util.aplhaNumericeWithoutSpace)]),
      assetType: new FormControl('', [Validators.required, Validators.pattern(this.util.aplhaNumericeWithoutSpace)]),
      category: new FormControl('', [Validators.required, Validators.pattern(this.util.aplhaNumericeWithoutSpace)]),
      location: new FormControl('', [Validators.required, Validators.pattern(this.util.aplhaNumericeWithoutSpace)]),
      description: new FormControl('', [Validators.required]),
      make: new FormControl('', [Validators.required, Validators.pattern(this.util.aplhaNumericeWithoutSpace)]),
      model: new FormControl('', [Validators.required, Validators.pattern(this.util.aplhaNumericeWithoutSpace)]),
      yearOfMake: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern(this.util.intRegex)]),
      contryOfOrigin: new FormControl('', [Validators.required, Validators.pattern(this.util.aplhaNumericeWithoutSpace)]),
      currentRate: new FormControl('', [Validators.required, Validators.pattern(this.util.numericRegex)]),
      currentRateRider: new FormControl('', [Validators.required, Validators.pattern(this.util.numericRegex)]),
      allowWO: new FormControl(true, [Validators.required]),
      status: new FormControl('', [Validators.required]),
      retireAsset: new FormControl(false, [Validators.required]),
      ownership: new FormControl(false, [Validators.required]),
      strRetirementDate: new FormControl('', [Validators.required])
      // assetImageId
      // QrCodeId
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    this.getAssetsDetails();

  }
  /*ngAfterViewChecked() : void {
    this.generateQrcode();
  }*/
  getAssetsDetails(){
    this.assetsService.getDetailsAsset(this.id).pipe(first()).subscribe((result: any) => {
          this.assetDetails = result.data;
          this.assetNo = this.assetDetails.assetNo;
          this.form.setValue({
            assetNo:this.assetDetails.assetNo,
            name:this.assetDetails.name,
            assetType:this.assetDetails.assetType.name,
            assetClass:this.assetDetails.assetClass.id,
            category:this.assetDetails.assetCategory,
            location:this.assetDetails.location.description,
            description:this.assetDetails.description,
            make:this.assetDetails.make,
            model:this.assetDetails.model,
            yearOfMake:this.assetDetails.yearOfMake,
            contryOfOrigin:this.assetDetails.contryOfOrigin,
            currentRate:this.assetDetails.currentRate,
            currentRateRider:this.assetDetails.currentRateRider,
            allowWO:this.assetDetails.allowWO,
            status:this.assetDetails.status,
            retireAsset:this.assetDetails.retireAsset,
            ownership:this.assetDetails.ownership,
            strRetirementDate:this.assetDetails.retirementDate


          });
          console.log('Assets Details:',this.assetDetails);
        });
  }

  onChangeURL(event:any){
    this.qrCodeDownloadLink = event;
  }

  printqrcode(){
    const w = window.open();
if (w) {
  w.document.write('<img src="' + this.qrCodeDownloadLink.changingThisBreaksApplicationSecurity + '" onload="window.print();window.close()" />');
    w.focus(); // okay now
}
 
  }

  openImage(){
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(this.confirmationDialog, {
      width: '30em',
      height: '30em',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      // this.router.navigate(['/registration/list']);
      console.log('The dialog was closed');
    });
  }


  cancel(){
    
    this.dialog.closeAll();
  }

  get f() {
    return this.form.controls;
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };

  openImageDialog(data: any) {
    // alert();
    // this.selectedImage = data;
    const dialogRef = this.dialog.open(ImagePreviewDialog, {
      width: 'auto',
      height: '35em',
      data: { selectedImage: data }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      // this.router.navigate(['/registration/list']);
      // console.log('The dialog was closed');
    });
  }

  openFile(url: string) {

    window.open(url, '_blank');
  }





  onFileChange(event: any) {
    if (event !== null && event.target !== null && event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // console.log(file, 'file')
      let filename = file.type.toLowerCase();
      if (["image/jpeg", "image/png", "image/jpg", "application/pdf"].includes(filename) == true) {
        if (file.size <= 15000000) {
          var reader = new FileReader();
          reader.onload = (e: any) => {
            // console.log('Got here: ', e.target.result);
            let type = ["image/jpeg", "image/png", "image/jpg"].includes(filename) == true ? 'image' : 'pdf';
            this.selectedFile = e.target.result;

          }
          reader.readAsDataURL(file);
          this.attachmentFile = file;
          this.uploadPic();
        } else {
          this.alertService.openSnackBar(CustomMessage.invalidLeaveAttachmentSize);
        }
      } else {
        this.alertService.openSnackBar(CustomMessage.invalidLeaveAttachment);
      }
      return;
      // console.log(file, 'sd');
    }


  }

  uploadPic() {
    let data = new FormData();
    // data.append('leaveRequestId', id);
    // this.attachmentFile.map((elem: any) => {
    data.append('files', this.attachmentFile);
    // })
    console.log(this.attachmentFile, 'this.attachmentFilethis.attachmentFile')
    this.authService.uploadFile(data).subscribe(
      (res: any) => {
        if (res.status == "success") {
          this.attachmentFile = res.data.length > 0 ? res.data[0].id : null;
        }
        this.alertService.openSnackBar(CustomMessage.fileUploadError, false);
        // this.router.navigate(['/dashboard']);
      }, (error) => {
        this.alertService.openSnackBar(CustomMessage.fileUploadError, false);
        // this.alertService.openSnackBar(CustomMessage.leaveApplySuccess, false);
        // this.router.navigate(['/dashboard']);

        // this.alertService.openSnackBar(CustomMessage.error);
      },
    );
    // this.
    // console.log(id);
  }

  onSubmit() {
    console.log('in');
    this.submitted = true;
    if (this.form.invalid) {
      this.alertService.openSnackBar(CustomMessage.invalidForm);
      return;
    }

    let formValues = this.form.value;
    formValues['assetClassName'] = formValues.assetClass;
    formValues.assetClass = '';

    formValues['assetTypeName'] = formValues.assetType;
    formValues.assetType = '';

    formValues['categoryName'] = formValues.category;
    formValues.category = '';

    formValues['locationName'] = formValues.location;
    formValues.location = '';

    formValues.ownership = formValues.ownership == true ? 'owned' : 'rented';
    formValues.strRetirementDate = moment(formValues.strRetirementDate).utc().format('DD/MM/YYYY');
    formValues.assetImageId = this.attachmentFile;
    console.log(formValues);
    this.assetsService.save(formValues).subscribe(
      (res: any) => {
        console.log(res, 'res')
        if (res.status == 'success') {
          this.alertService.openSnackBar(CustomMessage.assetSuccess, false);
          this.router.navigate(['/dashboard']);
        } else {
          this.alertService.openSnackBar(CustomMessage.error);
        }
      },
      (error) => {
        this.alertService.openSnackBar(CustomMessage.error);
      },
    );

  }

  resetQr() {
this.generatedCode=false; 
  }

  generateQrcode() {
    if (this.form.controls['assetNo']!.value) {
      this.generatedCode = true;
    } else {
      this.alertService.openSnackBar('Please enter asset no to generate QR code.');
    }
  }
}

import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService, AssetsService, LeaveService } from 'src/app/core/services';
import { Utils } from 'src/app/core/_helpers/util';
import { CustomMessage } from 'src/app/custom-message';
import { Globals } from 'src/app/globals';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-assets-add',
  templateUrl: './assets-add.component.html',
  styleUrls: ['./assets-add.component.scss'],
})
export class AssetsAddComponent implements OnInit {
  globals: Globals;
  form: FormGroup;
  postdataaseet: any;
  assetType: any;
  assetCategory: any;
  projectLocation: any;
  submitted: boolean = false;
  currentDate: Date = new Date();
  selectedFile: string = '';
  qrCodeDownloadLink: any;
  attachmentFile: any;
  item: any = 1;
  status: any = 1;
  @ViewChild('confirmationDialog') confirmationDialog!: TemplateRef<any>;
  generatedCode: boolean = false;
  constructor(
    private dialog: MatDialog,
    globals: Globals,
    private fb: FormBuilder,
    private alertService: AlertService,
    public util: Utils,
    private leaveService: LeaveService,
    private authService: AuthenticationService,
    private assetsService: AssetsService,
    private router: Router,
  ) {
    this.globals = globals;
    this.form = this.fb.group({
      assetNo: new FormControl('', [
        Validators.required,
        Validators.pattern(this.util.aplhaNumericeWithoutSpace),
      ]),
      name: new FormControl('', [Validators.required]),
      assetClass: new FormControl('', [
        Validators.required,
        Validators.pattern(this.util.aplhaNumericeWithoutSpace),
      ]),
      assetType: new FormControl('', [
        Validators.required,
        Validators.pattern(this.util.aplhaNumericeWithoutSpace),
      ]),
      category: new FormControl('', [
        Validators.required,
        Validators.pattern(this.util.aplhaNumericeWithoutSpace),
      ]),
      location: new FormControl('', [
        Validators.required,
        Validators.pattern(this.util.aplhaNumericeWithoutSpace),
      ]),
      description: new FormControl('', [Validators.required]),
      make: new FormControl('', [
        Validators.required,
        Validators.pattern(this.util.aplhaNumericeWithoutSpace),
      ]),
      model: new FormControl('', [
        Validators.required,
        Validators.pattern(this.util.aplhaNumericeWithoutSpace),
      ]),
      yearOfMake: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern(this.util.intRegex),
      ]),
      contryOfOrigin: new FormControl('', [
        Validators.required,
        Validators.pattern(this.util.aplhaNumericeWithoutSpace),
      ]),
      currentRate: new FormControl('', [
        Validators.required,
        Validators.pattern(this.util.numericRegex),
      ]),
      currentRateRider: new FormControl('', [
        Validators.required,
        Validators.pattern(this.util.numericRegex),
      ]),
      allowWO: new FormControl(true, [Validators.required]),
      status: new FormControl('', [Validators.required]),
      retireAsset: new FormControl(false, [Validators.required]),
      ownership: new FormControl(false, [Validators.required]),
      strRetirementDate: new FormControl('', [Validators.required]),
      // assetImageId
      // QrCodeId
    });
  }

  get f() {
    return this.form.controls;
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };

  ngOnInit(): void {
    this.getAssetType();
    this.getAssetCategory();
    this.getProjectLocation();
  }

  onFileChange(event: any) {
    if (event !== null && event.target !== null && event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // console.log(file, 'file')
      let filename = file.type.toLowerCase();
      if (['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'].includes(filename) == true) {
        if (file.size <= 15000000) {
          var reader = new FileReader();
          reader.onload = (e: any) => {
            // console.log('Got here: ', e.target.result);
            let type =
              ['image/jpeg', 'image/png', 'image/jpg'].includes(filename) == true ? 'image' : 'pdf';
            this.selectedFile = e.target.result;
          };
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
    console.log(this.attachmentFile, 'this.attachmentFilethis.attachmentFile');
    this.authService.uploadFile(data).subscribe(
      (res: any) => {
        if (res.status == 'success') {
          this.attachmentFile = res.data.length > 0 ? res.data[0].id : null;
        }
        this.alertService.openSnackBar(CustomMessage.fileUploadError, false);
        // this.router.navigate(['/dashboard']);
      },
      (error) => {
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

    this.postdataaseet = {
      allowWO: true,
      name: formValues.name,
      assetClass: { id: formValues.assetClassName },
      assetType: { id: formValues.assetTypeName },
      assetCategory: { id: 123 },
      description: formValues.description,
      make: formValues.make,
      model: formValues.model,
      yearOfMake: formValues.yearOfMake,
      contryOfOrigin: formValues.contryOfOrigin,
      currentRate: formValues.currentRate,
      currentRateRider: formValues.currentRateRider,
      status: formValues.status,
      retireAsset: formValues.retireAsset,
      ownership: formValues.ownership,
      strRetirementDate: formValues,
    };
    console.log(this.postdataaseet);

    this.assetsService.save(formValues).subscribe(
      (res: any) => {
        console.log(res, 'res');
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
    this.generatedCode = false;
  }

  onChangeURL(event: any) {
    this.qrCodeDownloadLink = event;
  }

  printqrcode() {
    const w = window.open();
    if (w) {
      w.document.write(
        '<img src="' +
          this.qrCodeDownloadLink.changingThisBreaksApplicationSecurity +
          '" onload="window.print();window.close()" />',
      );
      w.focus(); // okay now
    }
  }

  openImage() {
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(this.confirmationDialog, {
      width: '32em',
      height: '22em',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      // this.router.navigate(['/registration/list']);
      console.log('The dialog was closed');
    });
  }

  cancel() {
    this.dialog.closeAll();
  }

  generateQrcode() {
    if (this.form.controls['assetNo']!.value) {
      this.generatedCode = true;
    } else {
      this.alertService.openSnackBar('Please enter asset no to generate QR code.');
    }
  }

  getAssetType() {
    this.assetsService.getAllAssetsType().subscribe((assetType) => {
      this.assetType = assetType;
    });
  }
  getAssetCategory() {
    this.assetsService.getAllAssetsCategory().subscribe((assetCategory) => {
      this.assetCategory = assetCategory;
    });
  }
  getProjectLocation() {
    this.assetsService.getAllLocations().subscribe((projectLocation) => {
      this.projectLocation = projectLocation;
    });
  }
}

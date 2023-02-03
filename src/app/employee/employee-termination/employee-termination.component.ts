import { Component, OnInit,TemplateRef, ViewChild  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-termination',
  templateUrl: './employee-termination.component.html',
  styleUrls: ['./employee-termination.component.scss']
})
export class EmployeeTerminationComponent implements OnInit {
  
  @ViewChild('terminateDialog,') terminateDialog!: TemplateRef<any>;
  submitted: boolean = false;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onClick() {
    this.submitted = true;
    this.openDialog({});
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

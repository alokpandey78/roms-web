import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Globals} from 'src/app/globals';
import { ActivatedRoute } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {  OnChanges, SimpleChanges } from '@angular/core';


import { AuthenticationService } from 'src/app/core/services/auth.service';
import { HealthsafetyService } from '../../core/services/healthsafety.service';
import { EmployeeService } from 'src/app/core/services';

//utilities
import { saveAs } from 'file-saver';
import { ViewOptions } from 'src/app/_models';
import { Utils } from 'src/app/core/_helpers/util';
import { DatePipe } from '@angular/common';
import { first } from 'rxjs';
import * as moment from 'moment';


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
  selector: 'app-dhyComponent',
  templateUrl: './dhyComponent.component.html',
  styleUrls: ['./dhyComponent.component.css']
})
export class DhyComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

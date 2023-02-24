import { Component, OnInit } from '@angular/core';
import { TemplateRef} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HealthsafetyService } from '../../core/services/healthsafety.service';
import { first } from 'rxjs';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-hazard-report',
  templateUrl: './safetyhazard_details.component.html',
  styleUrls: ['./safetyhazard_details.component.scss']
})
export class SafetyhazardDetailsComponent implements OnInit {
  submitted: boolean = false;
  selectedRecord: any = {};
  id : string = ''; 
  hazardDetails : any = {};
  globals: Globals;

  constructor(private dialog: MatDialog,
    private router: Router,globals: Globals, private activatedRoute: ActivatedRoute, private healthsafetyService: HealthsafetyService,) { this.globals = globals;}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    this.getHazardDetails();
  }


  getHazardDetails(){
    this.healthsafetyService.getHazardDetails(this.id).pipe(first())
        .subscribe((result: any) => {
          this.hazardDetails = result.data;
          console.log('Hazard Details:',this.hazardDetails);
        });
  }

}

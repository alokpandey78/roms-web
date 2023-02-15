import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ViewOptions } from "src/app/_models";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HealthsafetyService {

  constructor(private http: HttpClient) { 
    
  }
  getHazardList(options: ViewOptions) {
    return this.http.get<any>(`${environment.apiUrl}/v1/hazard?page=0&size=100&${options.query}`,);
  }

  getHazardListFilter({ options, payload }: { options: ViewOptions; payload: any; }){
    return this.http.get<any>(`${environment.apiUrl}/v1/hazard?page=${options.page}&size=${options.pageSize}&rishkLevel=${payload.severity}`);
}
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NonBillableService {

  backendUrl = 'http://localhost:4000';
  constructor(private http: HttpClient , private router: Router) { }

getNonBillableEmployeesDetails() {
  return this.http.get(`${this.backendUrl}/getNonBillableEmployeesDetails`);
}

getTechnologyNonBillableEmployeesDetails() {
  return this.http.get(`${this.backendUrl}/getTechnologyNonBillableEmployeesDetails`);
}

getNonBillableEmployeesExpDetails() {
  return this.http.get(`${this.backendUrl}/getNonBillableEmployeesExpDetails`);
}
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  // TargetInfo: any = [];


  backendUrl = 'http://localhost:4000';

  constructor(private http: HttpClient , private router: Router) {
    // this.getTargetInfoOfTheYear(); 
  }

  postBillableEmployeesPackageDetails(BillableEmployeesPackageDetails) {
    return this.http.post(`${this.backendUrl}/postBillableEmployeesPackageDetails`, BillableEmployeesPackageDetails);
  }

  getBillableEmployeesPackageDetails() {
    return this.http.get(`${this.backendUrl}/getBillableEmployeesPackageDetails`);
  }
  getBillableEmployeesRevenueDetails() {
    return this.http.get(`${this.backendUrl}/getBillableEmployeesRevenueDetails`);
  }

  getTargetInfoOfTheYear() {
  return this.http.get(`${this.backendUrl}/getTargetInfoOfTheYear`);
  }

}

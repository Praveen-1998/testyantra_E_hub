import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BillableEmployeesService {
  count: any;
  backendUrl = 'http://localhost:4000';
  constructor(private http: HttpClient) {
    this.getBillableEmployeesDetailsCount();
  }

stack: any;

  postBillableEmployeesDetails(BillableEmployeesDetails) {
    return this.http.post(`${this.backendUrl}/postBillableEmployeesDetails`, BillableEmployeesDetails);
  }

  getBillableEmployeesDetails() {
    return this.http.get(`${this.backendUrl}/getBillableEmployeesDetails`);
  }

  getBillableEmployeesDetailsCount() {
    return this.http.get(`${this.backendUrl}/getBillableEmployeesDetailsCount`);
  }
  getBillableEmployeesExpDetails() {
    return this.http.get(`${this.backendUrl}/getBillableEmployeesExpDetails`);
  }

  postBillableEmployeesPackageDetails(BillableEmployeesPackageDetails) {
    return this.http.post(`${this.backendUrl}/postBillableEmployeesPackageDetails`, BillableEmployeesPackageDetails);
  }
}

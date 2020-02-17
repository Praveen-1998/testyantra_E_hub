import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ShowimageService } from './showimage.service';



@Injectable({
  providedIn: 'root'
})
export class CreateEmployeeService {
  EmpDetails: any = [];
  empDetailsBasedOnStack: any = [];
  paidEmployeesWrtStack: any = [];


  uri = 'http://localhost:4000';

  constructor(private http: HttpClient , private router: Router , private showiImageService: ShowimageService ) {
    this.getEmployeesDetails();
  }


  postEmployeesDetails(details) {
    console.log(details, 'service');
    return this.http.post(`${this.uri}/postEmployeesDetails`, details);
  }

  getEmployeesDetails() {
     this.http.get(`${this.uri}/getEmployeesDetails`).subscribe(employeesDetails => {
      console.log(employeesDetails, ' praveenkumar');
      this.EmpDetails = employeesDetails;
    }, (err) => {
      console.log(err);
    }, () => {
      console.log('employees details got suuccessfully into service');
    });
  }

  getEmployeesDetailsWrtName(empName) {
    return this.http.get(`${this.uri}/getEmployeesDetailsWrtName/${empName}`);
  }

  deleteEmployeeDetailsWrtName(empName) {
    return this.http.delete(`${this.uri}/deleteEmployeesDetailsWrtName/${empName}`);
  }

  getEmployeeDetailsBasedOnStack(stackName) {
      this.http.get(`${this.uri}/getEmployeeDetailsBasedOnStack/${stackName}`).subscribe(nonEmployeesDetails => {
      console.log(nonEmployeesDetails, ' praveenkumar R');
      this.empDetailsBasedOnStack = nonEmployeesDetails;
      this.router.navigateByUrl('/nonBillableTable');
    }, (err) => {
      console.log(err);
    }, () => {
      console.log('employees details got suuccessfully into service');
    });

  }

  getEmployeeDetailsBasedOnExperience(exp) {
    this.http.get(`${this.uri}/getEmployeeDetailsBasedOnExp/${exp}`).subscribe(nonEmployeesDetails => {
    console.log(nonEmployeesDetails, ' praveenkumar R');
    this.empDetailsBasedOnStack = nonEmployeesDetails;
    this.router.navigateByUrl('/nonBillableTable');
  }, (err) => {
    console.log(err);
  }, () => {
    console.log('employees details got suuccessfully into service');
  });

}

getNonBillableEmployeeWrtStack(stack, status) {
  // console.log(stack, status );
  this.http.get(`${this.uri}/getPaidEmployeeWrtStack/${stack}/${status}`).subscribe(paidEmployeeWrtStack => {
    console.log(paidEmployeeWrtStack, ' praveenkumar R');
    this.paidEmployeesWrtStack = paidEmployeeWrtStack;
    this.router.navigateByUrl('/nonBillablePaidUnpaidTable');
  }, (err) => {
    console.log(err);
  }, () => {
    console.log('paid employees details with respect to stack got suuccessfully');
  });
}


}


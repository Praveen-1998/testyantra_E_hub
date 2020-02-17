import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CreateEmployeeService } from '../create-employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  constructor(public empService: CreateEmployeeService, private router: Router) {}

  postEmployeesDetails(form: NgForm) {
  console.log(form.value, 'ts file');
  this.empService.postEmployeesDetails(form.value).subscribe(empDetails => {
  console.log(empDetails);
  this.getEmployeeDetails();
  this.router.navigateByUrl('/clientsDetails');
  }, (err) => {
  console.log(err);
  }, () => {
    console.log('Employees Details posted Successfully');
  });
  }


  getEmployeeDetails() {
    this.empService.getEmployeesDetails();
  }

  ngOnInit() {
  }

}

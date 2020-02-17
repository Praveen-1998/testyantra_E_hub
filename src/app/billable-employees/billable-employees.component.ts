import { Component, OnInit } from '@angular/core';
import { BillableEmployeesService } from '../billable-employees.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientsDetailsService } from '../clients-details.service';
import { CreateEmployeeService } from '../create-employee.service';


@Component({
  selector: 'app-billable-employees',
  templateUrl: './billable-employees.component.html',
  styleUrls: ['./billable-employees.component.css']
})
export class BillableEmployeesComponent implements OnInit {
  // emp: any = [];

  employeeName: any;
  EmployeeDetails: any = [];

  // tslint:disable-next-line: max-line-length
  constructor( public empService: CreateEmployeeService, private billableEmployyesDetailsservice: BillableEmployeesService, private router: Router, private clientDetailsService: ClientsDetailsService) {
    this.getClientsDetails();
   }

  isNameSelected = true;
  clients: any = [];
  billableEmployeesDetails: any;

  ngOnInit() {
  }

    postBillableEmployeesDetails(form: NgForm) {
    console.log(form.value);
    this.billableEmployyesDetailsservice.postBillableEmployeesDetails(form.value).subscribe(BillableEmployeesDetails => {
      console.log(BillableEmployeesDetails);
      this.router.navigateByUrl('/billableEmployeesInfo');
      this.empService.deleteEmployeeDetailsWrtName(form.value.EmpName).subscribe(empdetails => {
        console.log(empdetails);
        this.empService.getEmployeesDetails();
      });
    },
    (err) => {
      console.log(err);
    }, () => {
      console.log('Billable Employees Details Posted Successfully');
    });
  }
  getClientsDetails() {
    this.clientDetailsService.getClientsDetails().subscribe(clientsDetails => {
      console.log(clientsDetails);
      this.clients = clientsDetails;
    }, err => {
      console.log(err);
    }, () => {
      console.log('Client Details got successfully');
    });
      }


      selectchange(args) {
        this.employeeName = args.target.value;
        // console.log(this.employeeName);
        this.empService.getEmployeesDetailsWrtName(this.employeeName).subscribe(empDetails => {
          // console.log('with respect to name', empDetails);
          this.EmployeeDetails = empDetails;
          this.isNameSelected = true;
        }, (err) => {
          console.log(err);
        }, () => {
          console.log('Employees Details Wrt Name got successfully');
        });
      }
}

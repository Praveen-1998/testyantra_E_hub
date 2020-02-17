import { Component, OnInit } from '@angular/core';
import { BillableEmployeesService } from '../billable-employees.service';
import * as $ from 'jquery';
import { NgForm } from '@angular/forms';
import { PackageService } from '../package.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billableemployeesinfo',
  templateUrl: './billableemployeesinfo.component.html',
  styleUrls: ['./billableemployeesinfo.component.css']
})
export class BillableemployeesinfoComponent implements OnInit {
  billEmployeesInfo: any = [];
  billableEmployeesDetailsList: any = [];
  billableEmployees = {
    _id: '',
    clientName: '',
    EmpName: '',
    rateCardByTyss: ''
  };


  constructor(private billableEmployeesService: BillableEmployeesService, private packageService: PackageService, private router: Router) {
    this.getBillableEmployeesInfo();
   }
  billableEmployeesDetails: any;
  items: any;
  getBillableEmployeesInfo() {
    this.billableEmployeesService.getBillableEmployeesDetails().subscribe(billableEmployeesDetails => {
      this.billableEmployeesDetails = billableEmployeesDetails;
    }, err => {
      console.log(err);
    }, () => {
      console.log('billableEmployeesDetails got Successfully');
    });
  }


  onChangePage(billEmployeesDetails: Array<any>) {
    this.billEmployeesInfo = billEmployeesDetails;
  }
  ngOnInit() {
    this.billableEmployeesDetailsList = Array(168).fill(0).map((x, i) => ({ id: (i + 1), name: `${i + 1}` }));
    $(document).ready(() => {
      $('.clickable-row').click(() => {
        window.location = $(this).data('href');
      });
    });
  }


  particularRow(data) {
    console.log(data);
    this.billableEmployees.clientName = data.clientName;
    this.billableEmployees.EmpName = data.EmpName;
    this.billableEmployees.rateCardByTyss = data.rateCard;

  }


  postBillableEmployeesPackageDetails(form: NgForm) {
    console.log(form.value);
    this.packageService.postBillableEmployeesPackageDetails(form.value).subscribe(BillableEmployeesDetails => {
      console.log(BillableEmployeesDetails);
      form.reset();
      this.router.navigateByUrl('/packageDetailsbillEmp');
    }, err => {
      console.log(err);
    }, () => {
      console.log('Billable Employees Package Posted Successfully');
    });
  }
}

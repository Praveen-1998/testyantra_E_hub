import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BillableEmployeesService } from '../billable-employees.service';
import { Router } from '@angular/router';
import { PackageService } from '../package.service';
import * as $ from 'jquery';
import { ShowimageService } from '../showimage.service';


@Component({
  selector: 'app-package-details-ofbill-emp',
  templateUrl: './package-details-ofbill-emp.component.html',
  styleUrls: ['./package-details-ofbill-emp.component.css']
})
export class PackageDetailsOfbillEmpComponent implements OnInit {

  private billableEmployeesPackageDetails: any = [];

  constructor(private billableEmployeesPackageDetailsservice: PackageService,
              private showImagService: ShowimageService, private router: Router) {
    this.getBillableEmployeesPackageInfo();
   }
  BillableEmployeesPackageDetails: any = [];


  getBillableEmployeesPackageInfo() {
    this.billableEmployeesPackageDetailsservice.getBillableEmployeesPackageDetails().subscribe(billableEmployeesPackageDetails => {
      this.BillableEmployeesPackageDetails = billableEmployeesPackageDetails;
    }, err => {
      console.log(err);
    }, () => {
      console.log('Billable Employees Package Details got Successfully');
    });
  }
  ngOnInit() {
    this.BillableEmployeesPackageDetails = Array(168).fill(0).map((x, i) => ({ id: (i + 1), name: `${i + 1}` }));
    $(document).ready(() => {
      $('.clickable-row').click(() => {
        window.location = $(this).data('href');
      });
    });
  }

  onChangePage(BillableEmployeesPackageDetails: Array<any>) {
    this.billableEmployeesPackageDetails = BillableEmployeesPackageDetails;
  }
}

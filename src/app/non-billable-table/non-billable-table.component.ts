import { Component, OnInit } from '@angular/core';
import { CreateEmployeeService } from '../create-employee.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-non-billable-table',
  templateUrl: './non-billable-table.component.html',
  styleUrls: ['./non-billable-table.component.css']
})
export class NonBillableTableComponent implements OnInit {
  empDetailsBasedOnStack: any[];
  NonBillableEmployeesPackageDetails: any = [];

  constructor(private employeeService: CreateEmployeeService, private router: Router) {
  }

  ngOnInit() {
    this.empDetailsBasedOnStack = Array(168).fill(0).map((x, i) => ({ id: (i + 1), name: `${i + 1}` }));
    $(document).ready(() => {
      $('.clickable-row').click(() => {
        window.location = $(this).data('href');
      });
    });
  }


  onChangePage(BillableEmployeesPackageDetails: Array<any>) {
    this.NonBillableEmployeesPackageDetails = BillableEmployeesPackageDetails;
  }
}

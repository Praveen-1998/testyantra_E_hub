import { Component, OnInit } from '@angular/core';
import { CreateEmployeeService } from '../create-employee.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-paid-unpaid-table',
  templateUrl: './paid-unpaid-table.component.html',
  styleUrls: ['./paid-unpaid-table.component.css']
})
export class PaidUnpaidTableComponent implements OnInit {
  empDetailsBasedOnStackAndStatus: any = [];
  NonBillableEmployeesPaidAndStatusDetails: any = [];
  constructor(private empService: CreateEmployeeService) { }

  ngOnInit() {
    this.empDetailsBasedOnStackAndStatus = Array(168).fill(0).map((x, i) => ({ id: (i + 1), name: `${i + 1}` }));
    $(document).ready(() => {
      $('.clickable-row').click(() => {
        window.location = $(this).data('href');
      });
    });
  }


  onChangePage(BillableEmployeesPackageDetails: Array<any>) {
    this.NonBillableEmployeesPaidAndStatusDetails = BillableEmployeesPackageDetails;
  }
}

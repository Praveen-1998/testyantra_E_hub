import { Component, OnInit } from '@angular/core';
import { ShowimageService } from '../showimage.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-billabletable',
  templateUrl: './billabletable.component.html',
  styleUrls: ['./billabletable.component.css']
})
export class BillabletableComponent implements OnInit {

  constructor(private showimageservice: ShowimageService) { }

  private EmpListDetails: any = [];


  onChangePage(EmpListDetails: Array<any>) {
    this.EmpListDetails = EmpListDetails;
  }

  ngOnInit() {
    this.showimageservice.billableEmpList = Array(168).fill(0).map((x, i) => ({ id: (i + 1), name: `${i + 1}` }));
    $(document).ready(() => {
      $('.clickable-row').click(() => {
        window.location = $(this).data('href');
      });
    });
  }
  }



import { Component, OnInit, ViewChild } from '@angular/core';
import { ShowimageService } from '../showimage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-clients-logo',
  templateUrl: './clients-logo.component.html',
  styleUrls: ['./clients-logo.component.css']
})
export class ClientsLogoComponent implements OnInit {
  billableEmpCount: any = [];
  images: any;


  BillableEmpCountwrtClient: any = [];

  count: any = [];
  constructor(private showimageservice: ShowimageService, private router: Router) {
    this.getBillableEmpCountwrtClient();
  }


  ngOnInit() {
    this.showimageservice.showImage()
    .subscribe((resultImagename) => {
      this.images = resultImagename.imagename;
    },
    (err) => {
      console.log(err);
    });
  }
  getBillableEmpCountwrtClient() {
    this.showimageservice.getBillableEmpCountwrtClient().subscribe(BillableEmpCountwrtClient => {
    console.log('billable' , BillableEmpCountwrtClient);
    this.BillableEmpCountwrtClient = BillableEmpCountwrtClient;
    console.log('billable2' , this.BillableEmpCountwrtClient);
  }, err => {
    console.log(err);
  }, () => {
    console.log('count of billable employees with respect to client');
  });
   }


   sendClientId(clientId) {
     console.log(clientId);
     this.showimageservice.getBillableEmpwrtClientIdIntoTable(clientId);
   }


   sendClientName(clientName, clientId, ClientName) {
     console.log(clientName, clientId, ClientName);
     this.showimageservice.getBillableEmpwrtClient(clientName , clientId, ClientName);
    }
}

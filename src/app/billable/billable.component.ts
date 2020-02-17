import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as Highcharts from 'highcharts';
import { BillableEmployeesService } from '../billable-employees.service';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { Router } from '@angular/router';
import { PieChart } from '@amcharts/amcharts4/charts';
import { getLocaleDayNames } from '@angular/common';
import { ShowimageService } from '../showimage.service';

@Component({
  selector: 'app-billable',
  templateUrl: './billable.component.html',
  styleUrls: ['./billable.component.css']
})

export class BillableComponent implements OnInit {
  constructor(private billableEmployeesService: BillableEmployeesService, private showImageService: ShowimageService
    , private router: Router) {
    this.getBillableEmployeesCount();
    this.getBillableEmpExpCount();
  }
  highcharts = Highcharts;


  // chart1
  javacount: any = [];
  datasciencecount: any = [];
  dotnetcount: any = [];
  meanstackcount: any = [];
  zeroyearcount: any = [];
  oneyearcount: any = [];
  twoyearcount: any = [];
  threeyearcount: any = [];
  billableEmpWrtExp: any = [];


  count: any = [];
  year: any = [];


  myComponentMethodForStack(name) {
    console.log(name);
    this.showImageService.getBillableEmpwrtTechnologyIntoTable(name);
  }

  myComponentMethodForExp(exp) {
    // console.log(exp);
    const experience = exp.split('');
    const onlyExp = experience[0];
    console.log(onlyExp);
    this.showImageService.getBillableEmployeesWithExp(onlyExp);
  }

  getBillableEmployeesCount() {
    //  let Name = [];
    //  this.billableEmployeesService.get(Name);
    const series = [];
    this.billableEmployeesService.getBillableEmployeesDetailsCount().subscribe(BillableEmployeesDetailsCount => {
      this.count = BillableEmployeesDetailsCount;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.count.length; i++) {
        series.push({
          name: this.count[i]._id.stack,
          y: this.count[i].count
        });
      }
      const chart = Highcharts.chart('container1', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'Technology Wise Billable Engineers',
          x: +20
        },
        legend: {
          shadow: false
        },
        tooltip: {
          pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
            ' <b>{point.y}</b><br/>'
        },
        series: [{
          type: 'pie',
          data: series,
          point: {
            events: {
              click: function (e) {
                const p = e.point.name;
                this.myComponentMethodForStack(p);
                //  this.router.nav
              }.bind(this)
            }
          }
        }],
        credits: {
          enabled: false
        },
      });

    }, err => {
      console.log(err);
    }, () => {
      console.log('Count Came into DashBoard');
    });
  }




  // chart2

  getBillableEmpExpCount() {
    const year = [];
    this.billableEmployeesService.getBillableEmployeesExpDetails().subscribe(ExpCount => {
      this.year = ExpCount;
      console.log(this.year);
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.year.length; i++) {
        year.push({
          year: this.year[i]._id.yearOfExperience + '  years',
          y: this.year[i].count
        });
      }
      const chart = Highcharts.chart('container2', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false
        },
        title: {
          text: 'Experience Wise  Billable Engineers',
          x: +15
        },
        tooltip: {
          pointFormat: '{series.data.year} {point.year}: {series.name}: <b>{point.y:.0f}</b>',
          shared: true
        },
        legend: {
          shadow: false
        },
        plotOptions: {
          pie: {
            dataLabels: {
              enabled: true,
              format: '<b>{point.year}</b> ({point.y:,.0f}) ',
              style: {
                fontWeight: 'bold',
                color: 'black'
              }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%'],
            size: '150%'
          }
        },
        series: [
          {
            type: 'pie',
            name: 'Number of Employees',
            innerSize: '50%',
            data: year,
            point: {
              events: {
                click: function (e) {
                  const p = e.point.year;
                  this.myComponentMethodForExp(p);
                }.bind(this)
              }
            }
          }
        ]
      });
    }, err => {
      console.log(err);
    }, () => {
      console.log('Experience count came into DashBoard');
    });
  }

  ngOnInit() {
  }
}



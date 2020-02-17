import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as Highcharts from 'highcharts';
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);
import Exporting from 'highcharts/modules/exporting';
import { NonBillableService } from '../non-billable.service';
import { CreateEmployeeService } from '../create-employee.service';
Exporting(Highcharts);

@Component({
  selector: 'app-non-billable',
  templateUrl: './non-billable.component.html',
  styleUrls: ['./non-billable.component.css']
})
export class NonBillableComponent implements OnInit {
  nonBillableEmployee: any = [];
  NonBillableEmployeesExpInfo: any = [];
  TechNonBillableEngineers: any = [];
  Paidname: any = [];
  PaidCount: any = 0;
  UnPaidname: any = [];
  UnPaidCount: any = 0;
  paidTechnology: any = [];
  paidTechnologyCount: any = [];
  UnPaidTechnology: any = [];
  UnPaidTechnologyCount = [];

  constructor(private nonbillableservice: NonBillableService, private empService: CreateEmployeeService) {
    this.getNonBillableEmployeesDetails();
    this.getTechnologyWiseNonBillableEmployeesDetails();
    this.getNonBillableEmpExpDetails();
  }
  highcharts = Highcharts;

  myComponentMethodForStack(stackName) {
    this.empService.getEmployeeDetailsBasedOnStack(stackName);
  }

  myComponentMethodForExperience(exp) {
    const experience = exp.split('');
    const onlyExp = experience[0];
    console.log(onlyExp);
    this.empService.getEmployeeDetailsBasedOnExperience(onlyExp);
  }

  getPaidEmpWrtStack(status, stack) {
    console.log(status, stack);
    this.empService.getNonBillableEmployeeWrtStack(status, stack);
  }
  getUnPaidEmpWrtStack(status, stack) {
    this.empService.getNonBillableEmployeeWrtStack(status, stack);
  }

  getNonBillableEmpExpDetails() {
    const year = [];
    this.nonbillableservice.getNonBillableEmployeesExpDetails().subscribe(NonBillableEmployeesExpDetails => {
      console.log(NonBillableEmployeesExpDetails);
      this.NonBillableEmployeesExpInfo = NonBillableEmployeesExpDetails;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.NonBillableEmployeesExpInfo.length; i++) {
        year.push({
          year: this.NonBillableEmployeesExpInfo[i]._id.yearOfExperience + '  years',
          y: this.NonBillableEmployeesExpInfo[i].count
        });
      }
      const chart = Highcharts.chart('container3', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false
        },
        title: {
          text: 'Experience Wise Non Billable Engineers',
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
                  console.log(p);
                  this.myComponentMethodForExperience(p);
                }.bind(this)
              }
            }
          }
        ]
      });
    }, err => {
      console.log(err);
    }, () => {
      console.log('Non Billable Employees Experience count came into DashBoard');
    });
  }


  // chart2


  getTechnologyWiseNonBillableEmployeesDetails() {
    const NonBillableEmployees = [];
    this.nonbillableservice.getTechnologyNonBillableEmployeesDetails().subscribe(TechnologyWiseNonBillableEmployeesDetails => {
      this.TechNonBillableEngineers = TechnologyWiseNonBillableEmployeesDetails;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.TechNonBillableEngineers.length; i++) {
        NonBillableEmployees.push({
          name: this.TechNonBillableEngineers[i]._id.technology,
          y: this.TechNonBillableEngineers[i].count
        });
      }
      const chart = Highcharts.chart('container2', {
        chart: {
          type: 'pie'
        },
        title: {
          text: 'Technology Wise Non Billable Engineers',
          x: +20
        },
        tooltip: {
          headerFormat: '',
          pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
            ' <b>{point.y}</b><br/>'
        },
        series: [{
          type: 'pie',
          data: NonBillableEmployees,
          point: {
            events: {
              click: function (e) {
                const p = e.point.name;
                // console.log(p);
                this.myComponentMethodForStack(p);
              }.bind(this)
            }
          }
        }],
      });
    }, err => {
      console.log(err);
    }, () => {
      console.log('Technology wise Non Billable Employees details came into dashboard');
    });
  }

  // chart1

  getNonBillableEmployeesDetails() {
    const UnPiadDetails = [];
    const PiadDetails = [];
    this.nonbillableservice.getNonBillableEmployeesDetails().subscribe(nonBillableEmployeeDetails => {
      this.nonBillableEmployee = nonBillableEmployeeDetails;
      console.log(this.nonBillableEmployee, ' this.nonBillableEmployee ');
      this.nonBillableEmployee.map(emp => {
        if (emp._id.status === 'Paid') {
          this.PaidCount = this.PaidCount + emp.count;
          this.Paidname = emp._id.status;
          PiadDetails.push({
            name: emp._id.technology,
            y: emp.count,
            status1: emp._id.status
          });
        } else {
          this.UnPaidCount = this.UnPaidCount + emp.count;
          this.UnPaidname = emp._id.status;
          UnPiadDetails.push({
            name: emp._id.technology,
            y: emp.count,
            status2: emp._id.status
          });

        }
      });
      console.log(this.nonBillableEmployee, 'this.nonBillableEmployeeDetails');
      const chart = Highcharts.chart('container1', {
        chart: {
          type: 'pie'
        },
        title: {
          text: 'Non-Billable Technology Wised Paid and Un-paid Engineers Strength'
        },
        accessibility: {
          announceNewData: {
            enabled: true
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          title: {
            text: 'Total Percentage Of Employees'
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: '{point.name}'
            }
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>'
        },
        series: [
          {
            type: 'pie',
            name: 'Category',
            data: [
              {
                name: this.Paidname,
                y: this.PaidCount,
                color: 'green',
                drilldown: this.Paidname
              },
              {
                name: this.UnPaidname,
                y: this.UnPaidCount,
                drilldown: this.UnPaidname
              }
            ]
          }
        ],
        drilldown: {
          series: [
            {
              name: this.Paidname,
              id: this.Paidname,
              type: 'column',
              data: PiadDetails,
              point: {
                events: {
                  click: function (e) {
                    const p = e.point.status1;
                    const p1 = e.point.name;
                    // console.log(p);
                    this.getPaidEmpWrtStack(p, p1);
                  }.bind(this)
                }
              }
            },
            {
              name: this.UnPaidname,
              id: this.UnPaidname,
              type: 'column',
              data: UnPiadDetails,
              point: {
                events: {
                  click: function (e) {
                    const p = e.point.status2;
                    const p1 = e.point.name;
                    console.log(p, p1);
                    this.getUnPaidEmpWrtStack(p, p1);
                  }.bind(this)
                }
              }
            },
          ]
        }
      });
    }, err => {
      console.log(err);
    }, () => {
      console.log('Non-Billable employees details got successsfully');
    });
  }


  ngOnInit() {
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { chart } from 'highcharts';
import * as Highcharts from 'highcharts';

import { NgZone } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { ShowimageService } from '../showimage.service';
import { Router } from '@angular/router';
import { BillableEmployeesService } from '../billable-employees.service';
import { PackageService } from '../package.service';
import { NonBillableService } from '../non-billable.service';
import { CreateEmployeeService } from '../create-employee.service';

am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-displayimage',
  templateUrl: './displayimage.component.html',
  styleUrls: ['./displayimage.component.css']
})
export class DisplayimageComponent implements OnInit {
  TechNonBillableEngineers: any = [];
  NonBillableEmployeesExpInfo: any = [];
  count: any = [];
  year: any = [];
  amount: any = [];
  images: any;
  private chart: am4charts.XYChart;
  dataSource: any = [];
  BillableEmployeesRevenueDetails: any;
  TargetInfo: any = [];
  // tslint:disable-next-line: max-line-length
  constructor(private nonbillableservice: NonBillableService, private showimageservice: ShowimageService, private empService: CreateEmployeeService,
              private billableEmployeesService: BillableEmployeesService, private revenueService: PackageService, private router: Router) {
    this.getBillableEmployeesCount();
    this.getBillableEmpExpCount();
    this.showimageservice.showImage();
    this.getOverallBillableEmpFresherAndExpList();
    this.getRevenueDetails();
    this.getTechnologyWiseNonBillableEmployeesDetails();
    this.getNonBillableEmpExpDetails();
    this.revenueService.getTargetInfoOfTheYear().subscribe(targetInfoOfTheYear => {
      this.TargetInfo = targetInfoOfTheYear;
      console.log(this.TargetInfo, 'this.targetifo');
      this.TargetInfo.map(revenueDetails => {
        this.amount = revenueDetails.totalAmount;
      });
      this.dataSource = {
        chart: {
          caption: 'Company Profit Indicator',
          subcaption: '2020',
          lowerlimit: '0',
          upperlimit: '50000000',
          showvalue: '1',
          theme: 'fusion'
        },
        colorrange: {
          color: [{
            minvalue: '0',
            maxvalue: '15000000',
            code: '#BB5D52 '
          },
          {
            minvalue: '150000000',
            maxvalue: '20000000',
            code: '#FFC533'
          },
          {
            minvalue: '20000000',
            maxvalue: '30000000',
            code: '#62B58F'
          }
          ]
        },
        dials: {
          dial: [{
            value: this.amount,
            tooltext: 'Current Profit Earned'
          }]
        },
        trendpoints: {
          point: [{
            startvalue: '40000000',
            displayvalue: 'Target',
            thickness: '2',
            color: '#E15A26',
            usemarker: '1',
            markerbordercolor: '#E15A26',
            markertooltext: '80%'
          }]
        }
      };
    }, err => {
      console.log(err);
    }, () => {
      console.log('Target Info of the year got');
    });
  }


  highcharts = Highcharts;

  myComponentMethodForStack(name) {
    console.log(name);
    this.showimageservice.getBillableEmpwrtTechnologyIntoTable(name);
  }

  myComponentMethodForExp(exp) {
    // console.log(exp);
    const experience = exp.split('');
    const onlyExp = experience[0];
    console.log(onlyExp);
    this.showimageservice.getBillableEmployeesWithExp(onlyExp);
  }

  myComponentMethodForNonBillStack(stackName) {
    this.empService.getEmployeeDetailsBasedOnStack(stackName);
  }
  myComponentMethodForNonBillExperience(exp) {
    const experience = exp.split('');
    const onlyExp = experience[0];
    console.log(onlyExp);
    this.empService.getEmployeeDetailsBasedOnExperience(onlyExp);
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
      const chart1 = Highcharts.chart('container3', {
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
                this.myComponentMethodForNonBillStack(p);
                console.log(p);
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


  // chart4
  getNonBillableEmpExpDetails() {
    const year = [];
    this.nonbillableservice.getNonBillableEmployeesExpDetails().subscribe(NonBillableEmployeesExpDetails => {
      this.NonBillableEmployeesExpInfo = NonBillableEmployeesExpDetails;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.NonBillableEmployeesExpInfo.length; i++) {
        year.push({
          year: this.NonBillableEmployeesExpInfo[i]._id.yearOfExperience + 'years',
          y: this.NonBillableEmployeesExpInfo[i].count
        });
      }
      const chart2 = Highcharts.chart('container4', {
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
                  this.myComponentMethodForNonBillExperience(p);
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


  // Revenue Chart

  getRevenueDetails() {
    const revenue = [];
    this.revenueService.getBillableEmployeesRevenueDetails().subscribe(billableEmployeesRevenueDetails => {
      // console.log('billableEmployeesRevenueDetails' , billableEmployeesRevenueDetails);
      this.BillableEmployeesRevenueDetails = billableEmployeesRevenueDetails;


      this.BillableEmployeesRevenueDetails.map(billableemployeesrevenueDetails => {
        revenue.push({
          year: billableemployeesrevenueDetails._id,
          value: billableemployeesrevenueDetails.Profit
        });
      });
      am4core.useTheme(am4themes_animated);
      // Themes end

      // Create chart instance
      const chart = am4core.create('chartdiv1', am4charts.XYChart);

      // Add data
      chart.data = revenue;

      // Populate data
      for (let i = 0; i < (chart.data.length - 1); i++) {
        chart.data[i].valueNext = chart.data[i + 1].value;
      }

      // Create axes
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = 'year';
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;

      // Create series
      const series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = 'value';
      series.dataFields.categoryX = 'year';
      // Add series for showing variance arrows
      const series2 = chart.series.push(new am4charts.ColumnSeries());
      series2.dataFields.valueY = 'valueNext';
      series2.dataFields.openValueY = 'value';
      series2.dataFields.categoryX = 'year';
      series2.columns.template.width = 1;
      series2.fill = am4core.color('#555');
      series2.stroke = am4core.color('#555');

      // Add a triangle for arrow tip
      const arrow = series2.bullets.push(new am4core.Triangle);
      arrow.width = 10;
      arrow.height = 10;
      arrow.horizontalCenter = 'middle';
      arrow.verticalCenter = 'top';
      arrow.dy = -1;

      // Set up a rotation adapter which would rotate the triangle if its a negative change
      arrow.adapter.add('rotation', (rotation, target) => {
        return getVariancePercent(target.dataItem) < 0 ? 180 : rotation;
      });

      // Set up a rotation adapter which adjusts Y position
      arrow.adapter.add('dy', (dy, target) => {
        return getVariancePercent(target.dataItem) < 0 ? 1 : dy;
      });

      // Add a label
      const label = series2.bullets.push(new am4core.Label);
      label.padding(10, 10, 10, 10);
      label.text = '';
      label.fill = am4core.color('#0c0');
      label.strokeWidth = 0;
      label.horizontalCenter = 'middle';
      label.verticalCenter = 'bottom';
      label.fontWeight = 'bolder';

      // Adapter for label text which calculates change in percent
      label.adapter.add('textOutput', (text, target) => {
        const percent = getVariancePercent(target.dataItem);
        return percent ? percent + '%' : text;
      });

      // Adapter which shifts the label if it's below the variance column
      label.adapter.add('verticalCenter', (center, target) => {
        return getVariancePercent(target.dataItem) < 0 ? 'top' : center;
      });

      // Adapter which changes color of label to red
      label.adapter.add('fill', (fill, target) => {
        return getVariancePercent(target.dataItem) < 0 ? am4core.color('#c00') : fill;
      });

      function getVariancePercent(dataItem) {
        if (dataItem) {
          const value = dataItem.valueY;
          const openValue = dataItem.openValueY;
          const change = value - openValue;
          return Math.round(change / openValue * 100);
        }
        return 0;
      }
    }, err => {
      console.log(err);
    }, () => {
      console.log('Billable employees package details got');
    });
  }




  ngAfterViewInit() {
    am4core.useTheme(am4themes_animated);
    // Themes end
    // Create chart instance
    const chart = am4core.create('profit', am4charts.RadarChart);

    // Add data
    chart.data = [{
      category: 'Profit',
      value: 40,
      full: 100
    }, {
      category: 'Cost',
      value: 20,
      full: 100
    }, {
      category: 'Revenue',
      value: 60,
      full: 100
    }];

    // Make chart not full circle
    chart.startAngle = -90;
    chart.endAngle = 180;
    chart.innerRadius = am4core.percent(20);

    // Set number format
    chart.numberFormatter.numberFormat = '#.#\'%\'';

    // Create axes
    const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis() as any);
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.grid.template.strokeOpacity = 0;
    categoryAxis.renderer.labels.template.horizontalCenter = 'right';
    categoryAxis.renderer.labels.template.fontWeight = 500;
    categoryAxis.renderer.labels.template.adapter.add('fill', (fill, target) => {
      return (target.dataItem.index >= 0) ? chart.colors.getIndex(target.dataItem.index) : fill;
    });
    categoryAxis.renderer.minGridDistance = 10;

    const valueAxis = chart.xAxes.push(new am4charts.ValueAxis() as any);
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.strictMinMax = true;

    // Create series
    const series1 = chart.series.push(new am4charts.RadarColumnSeries());
    series1.dataFields.valueX = 'full';
    series1.dataFields.categoryY = 'category';
    series1.clustered = false;
    series1.columns.template.fill = new am4core.InterfaceColorSet().getFor('alternativeBackground');
    series1.columns.template.fillOpacity = 0.08;
    // series1.columns.template.cornerRadiusTopLeft = 20;
    series1.columns.template.strokeWidth = 0;
    series1.columns.template.radarColumn.cornerRadius = 20;

    const series2 = chart.series.push(new am4charts.RadarColumnSeries());
    series2.dataFields.valueX = 'value';
    series2.dataFields.categoryY = 'category';
    series2.clustered = false;
    series2.columns.template.strokeWidth = 0;
    series2.columns.template.tooltipText = '{category}: [bold]{value}[/]';
    series2.columns.template.radarColumn.cornerRadius = 20;

    series2.columns.template.adapter.add('fill', (fill, target) => {
      return chart.colors.getIndex(target.dataItem.index);
    });

    // Add cursor
    chart.cursor = new am4charts.RadarCursor();
  }

  ngOnInit() {
    this.showimageservice.showImage()
      .subscribe((resultImagename) => {
        this.images = resultImagename.imagename;
        console.log(this.images);
      },
        (err) => {
          console.log(err);
        });
  }







  getBillableEmployeesCount() {
    const series = [];
    this.billableEmployeesService.getBillableEmployeesDetailsCount().subscribe(BillableEmployeesDetailsCount => {
      //  console.log(BillableEmployeesDetailsCount);
      this.count = BillableEmployeesDetailsCount;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.count.length; i++) {
        series.push({
          name: this.count[i]._id.stack,
          y: this.count[i].count
        });
      }
      console.log('series' + series[0]);
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
                console.log(p);
                this.myComponentMethodForStack(p);
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




  getBillableEmpExpCount() {
    const year = [];
    this.billableEmployeesService.getBillableEmployeesExpDetails().subscribe(ExpCount => {
      this.year = ExpCount;
      // console.log(this.year);
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.year.length; i++) {
        year.push({
          year: this.year[i]._id.yearOfExperience + 'years',
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
                  console.log(p);
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

  // tslint:disable-next-line: member-ordering
  OverallbillableEmpFresherAndExpList: any = [];
  // chart with overall fresher and Experience count

  getOverallBillableEmpFresherAndExpList() {
    const OverallBillableEmpList = [];
    this.showimageservice.getOverAllBillableEmpFresherAndExpList().subscribe(OverallBillableEmpFresherAndExpList => {
      this.OverallbillableEmpFresherAndExpList = OverallBillableEmpFresherAndExpList;
      // console.log(' Overall fresher and experience list', this.OverallbillableEmpFresherAndExpList);
      this.OverallbillableEmpFresherAndExpList.map(item => {
        console.log('item ', item);
        OverallBillableEmpList.push({
          year: item._id,
          Experience: item.countExp,
          Fresher: item.countFresher
        });
      });
      am4core.ready(() => {
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end
        // Create chart instance
        const chart = am4core.create('chartdiv2', am4charts.XYChart);

        // Create axes
        const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = 'year';
        categoryAxis.numberFormatter.numberFormat = '#';
        categoryAxis.renderer.inversed = true;
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.cellStartLocation = 0.1;
        categoryAxis.renderer.cellEndLocation = 0.9;
        const valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.opposite = true;
        // Create series
        function createSeries(field, name) {
          const series = chart.series.push(new am4charts.ColumnSeries());
          series.dataFields.valueX = field;
          series.dataFields.categoryY = 'year';
          series.name = name;
          series.columns.template.tooltipText = '{name}: [bold]{valueX}[/]';
          series.columns.template.height = am4core.percent(100);
          series.sequencedInterpolation = true;
          const valueLabel = series.bullets.push(new am4charts.LabelBullet());
          valueLabel.label.text = '{valueX}';
          valueLabel.label.horizontalCenter = 'left';
          valueLabel.label.dx = 10;
          valueLabel.label.hideOversized = false;
          valueLabel.label.truncate = false;
          const categoryLabel = series.bullets.push(new am4charts.LabelBullet());
          categoryLabel.label.text = '{name}';
          categoryLabel.label.horizontalCenter = 'right';
          categoryLabel.label.dx = -10;
          categoryLabel.label.fill = am4core.color('#fff');
          categoryLabel.label.hideOversized = false;
          categoryLabel.label.truncate = false;
        }
        createSeries('Fresher', 'Fresher');
        createSeries('Experience', 'Experience');
        // Add data
        chart.data = OverallBillableEmpList;
        //     [{
        //     year: this.Year,
        //     Fresher: this.fresherCount,
        //     Experience: this.ExperienceCount
        //   }
        // ];
      });

    }, err => {
      console.log(err);
    }, () => {
      console.log(' Overall Billable Employees Fresher And ExpList came');
    });
  }

}




















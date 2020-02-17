import { Component, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as Highcharts from 'highcharts';
import { PackageService } from '../package.service';


am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-revenue-detials',
  templateUrl: './revenue-detials.component.html',
  styleUrls: ['./revenue-detials.component.css']
})
export class RevenueDetialsComponent implements OnInit {
  amount: any = [];
  // year: string ;

  BillableEmployeesRevenueDetails: any = [];
  TargetInfo: any = [];
  constructor(private revenueService: PackageService) {
    this.getRevenueDetails();
    this.revenueService.getTargetInfoOfTheYear().subscribe(targetInfoOfTheYear => {
      this.TargetInfo = targetInfoOfTheYear;
      console.log(this.TargetInfo, 'this.targetifo');
      this.TargetInfo.map(revenueDetails => {
      // this.year = revenueDetails._id.year;
      // console.log(this.year);
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

  dataSource: any = [];
  highcharts = Highcharts;
  chart: am4charts.XYChart;



// chart2
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



  ngOnInit() {
  }

}

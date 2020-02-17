import { Component, OnInit, Input } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { ShowimageService } from '../showimage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientsdata',
  templateUrl: './clientsdata.component.html',
  styleUrls: ['./clientsdata.component.css']
})
export class ClientsdataComponent implements OnInit {


  constructor(private showimageservice: ShowimageService, private router: Router ) {
  }
  private chart: am4charts.XYChart;
  billableEmpCount: any = [];
  billableEmpFresherAndExpList: any = [];


// chart2
year: any = [];
Empcount: any = [];
profit: any = [];


// chart1
getEmpDetailsWrtClientname() {
    const BillableEmpListWrtClientName = [];
    const billableEmpCountWrtClientname = this.showimageservice.billableEmpListWrtClientName;
    if (billableEmpCountWrtClientname !== []) {
    billableEmpCountWrtClientname.map(item => {
    //  console.log('item ', item);
     BillableEmpListWrtClientName.push({
        Stack: item._id.stack,
      Count: item.count
      });
    });
  } else {
this.router.navigateByUrl('/home');
  }
    am4core.ready(() => {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    const chart = am4core.create('chartdiv', am4charts.PieChart);

    // Add and configure Series
    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'Count';
    pieSeries.dataFields.category = 'Stack';

    // Let's cut a hole in our Pie chart the size of 30% the radius
    chart.innerRadius = am4core.percent(30);


    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color('#fff');
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template
      // change the cursor on hover to make it apparent the object can be interacted with
      .cursorOverStyle = [
        {
          property: 'cursor',
          value: 'pointer',
        }
      ];

    pieSeries.alignLabels = false;
    pieSeries.labels.template.bent = true;
    pieSeries.labels.template.radius = 3;
    pieSeries.labels.template.padding(0, 0, 0, 0);

    pieSeries.ticks.template.disabled = true;

    // Create a base filter effect (as if it's not there) for the hover to return to
    const shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
    shadow.opacity = 0;

    // Create hover state
    // tslint:disable-next-line: max-line-length
    const hoverState = pieSeries.slices.template.states.getKey('hover'); // normally we have to create the hover state, in this case it already exists

    // Slightly shift the shadow and make it more prominent on hover
    const hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;

    // Add a legend
    chart.legend = new am4charts.Legend();

    chart.data = BillableEmpListWrtClientName;
    });

  }

getBillableEmployeesCountAndProfitWrtYear() {
  const billableempCountAndProfit = [];
  const BillableEmployeesCountAndProfitWrtYear = this.showimageservice.billableEmpCountAndProfitWrtYear;
  BillableEmployeesCountAndProfitWrtYear.map(billableEmployeesCountAndProfitWrtYear => {
  // this.year = billableEmployeesCountAndProfitWrtYear._id;
  // this.Empcount = billableEmployeesCountAndProfitWrtYear.count;
  // this.profit = billableEmployeesCountAndProfitWrtYear.Profit;
  console.log('item' , billableEmployeesCountAndProfitWrtYear);
  billableempCountAndProfit.push({
   year: billableEmployeesCountAndProfitWrtYear._id,
   Number: billableEmployeesCountAndProfitWrtYear.count,
   Profit: billableEmployeesCountAndProfitWrtYear.Profit
    });
  });
  am4core.ready(() => {
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        const chart = am4core.create('chartdiv1', am4charts.XYChart);

        // Export
        chart.exporting.menu = new am4core.ExportMenu();

        // Data for both series
        const data = billableempCountAndProfit;
        chart.data = data;

        /* Create axes */
        const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = 'year';
        categoryAxis.renderer.minGridDistance = 30;

        /* Create value axis */
        const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        /* Create series */
        const columnSeries = chart.series.push(new am4charts.ColumnSeries());
        columnSeries.name = 'Total Employees';
        columnSeries.dataFields.valueY = 'Number';
        columnSeries.dataFields.categoryX = 'year';

        // tslint:disable-next-line: max-line-length
        columnSeries.columns.template.tooltipText = '[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]';
        columnSeries.columns.template.propertyFields.fillOpacity = 'fillOpacity';
        columnSeries.columns.template.propertyFields.stroke = 'stroke';
        columnSeries.columns.template.propertyFields.strokeWidth = 'strokeWidth';
        columnSeries.columns.template.propertyFields.strokeDasharray = 'columnDash';
        columnSeries.tooltip.label.textAlign = 'middle';

        const lineSeries = chart.series.push(new am4charts.LineSeries());
        lineSeries.name = 'Profit';
        lineSeries.dataFields.valueY = 'Profit';
        lineSeries.dataFields.categoryX = 'year';

        lineSeries.stroke = am4core.color('#fdd400');
        lineSeries.strokeWidth = 3;
        lineSeries.propertyFields.strokeDasharray = 'lineDash';
        lineSeries.tooltip.label.textAlign = 'middle';

        const bullet = lineSeries.bullets.push(new am4charts.Bullet());
        bullet.fill = am4core.color('#fdd400'); // tooltips grab fill from parent by default
        bullet.tooltipText = '[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]';
        const circle = bullet.createChild(am4core.Circle);
        circle.radius = 4;
        circle.fill = am4core.color('#fff');
        circle.strokeWidth = 3;

        });
      }



// chart3

getBillableEmpFresherAndExpList() {
  const BillableEmpFresherAndExpList = [];
  const billableEmpFresherAndExpList = this.showimageservice.billableEmpFresherAndExpList;


  billableEmpFresherAndExpList.map(item => {
    console.log('item ', item);
    BillableEmpFresherAndExpList.push({
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

    const  valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
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
    chart.data = BillableEmpFresherAndExpList;
    });

  }




  ngOnInit() {
    this.getEmpDetailsWrtClientname();
    this.getBillableEmpFresherAndExpList();
    this.getBillableEmployeesCountAndProfitWrtYear();
  }

}

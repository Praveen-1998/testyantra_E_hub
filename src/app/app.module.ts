import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { HighchartsChartModule } from 'highcharts-angular';
import { FusionChartsModule } from 'angular-fusioncharts';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as drilldown from 'highcharts/modules/drilldown.src.js';
import * as FusionCharts from 'fusioncharts';
import * as Widgets from 'fusioncharts/fusioncharts.widgets';

import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

FusionChartsModule.fcRoot(FusionCharts, Widgets, FusionTheme);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxUploaderModule } from 'ngx-uploader';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ClientsDetailsComponent } from './clients-details/clients-details.component';
import { ClientsInfoComponent } from './clients-info/clients-info.component';
import { DisplayimageComponent } from './displayimage/displayimage.component';
import { BillableEmployeesComponent } from './billable-employees/billable-employees.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientsLogoComponent } from './clients-logo/clients-logo.component';
import { BillableComponent } from './billable/billable.component';
import { ClientsdataComponent } from './clientsdata/clientsdata.component';
import { BillabletableComponent } from './billabletable/billabletable.component';
import { NonBillableComponent } from './non-billable/non-billable.component';
import { RevenueDetialsComponent } from './revenue-detials/revenue-detials.component';
import { BillableemployeesinfoComponent } from './billableemployeesinfo/billableemployeesinfo.component';
import { PackageDetailsOfbillEmpComponent } from './package-details-ofbill-emp/package-details-ofbill-emp.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { NonBillableTableComponent } from './non-billable-table/non-billable-table.component';
import { PaidUnpaidTableComponent } from './paid-unpaid-table/paid-unpaid-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientsDetailsComponent,
    ClientsInfoComponent,
    DisplayimageComponent,
    JwPaginationComponent,
    BillableEmployeesComponent,
    ClientsLogoComponent,
    BillableComponent,
    ClientsdataComponent,
    BillabletableComponent,
    NonBillableComponent,
    RevenueDetialsComponent,
    BillableemployeesinfoComponent,
    PackageDetailsOfbillEmpComponent,
    CreateEmployeeComponent,
    NonBillableTableComponent,
    PaidUnpaidTableComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxUploaderModule,
    AppRoutingModule,
    SlickCarouselModule,
    BrowserAnimationsModule,
    FusionChartsModule,
    HighchartsChartModule
  ],
  providers: [
    {provide: HIGHCHARTS_MODULES,
        useFactory: () => [ drilldown]
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

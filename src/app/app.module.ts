import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialAllModules } from '../shared/material.module';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WeekReportComponent } from './week-report/week-report.component';
import { MonthAssignmentComponent } from './month-assignment/month-assignment.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { LayoutModule } from './layout/layout.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartModule } from './chart/chart.module';
import { BarchartComponent } from './chart/barchart/barchart.component';
// Import angular-fusioncharts
import { FusionChartsModule } from './angular-fusioncharts/fusioncharts.module';

// Import FusionCharts library and chart modules
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as OverlappedBar2d from 'fusioncharts/fusioncharts.overlappedbar2d';
import * as OverlappedColumn2d from 'fusioncharts/fusioncharts.overlappedcolumn2d';
// For Powercharts , Widgets, and Maps
// import * as PowerCharts from 'fusioncharts/fusioncharts.powercharts';
// import * as Widgets from 'fusioncharts/fusioncharts.widgets';
// import * as Maps from 'fusioncharts/fusioncharts.maps';
// To know more about suites,
// read this https://www.fusioncharts.com/dev/getting-started/plain-javascript/install-using-plain-javascript

// For Map definition files
// import * as World from 'fusioncharts/maps/fusioncharts.world';

import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { RevenueCompanyModule } from './revenue-company/revenue-company.module';

// Pass the fusioncharts library and chart modules

@NgModule({
  declarations: [
    AppComponent,
    AddDialogComponent,
    WeekReportComponent,
    MonthAssignmentComponent,
    EditDialogComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialAllModules,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    NgChartsModule,
    FusionChartsModule.forRoot(
      FusionCharts,
      Charts,
      OverlappedBar2d,
      OverlappedColumn2d,
      FusionTheme
    ),
    ChartModule,
    RevenueCompanyModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

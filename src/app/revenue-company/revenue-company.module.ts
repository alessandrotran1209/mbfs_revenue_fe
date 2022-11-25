import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RevenueCompanyRoutingModule } from './revenue-company-routing.module';
import { MaterialAllModules } from 'src/shared/material.module';
import { ChartModule } from '../chart/chart.module';

import { AccumulatedRevenueComponent } from './accumulated-revenue/accumulated-revenue.component';

import { NgChartsModule } from 'ng2-charts';
import { FusionChartsModule } from '../angular-fusioncharts/fusioncharts.module';

import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as OverlappedBar2d from 'fusioncharts/fusioncharts.overlappedbar2d';
import * as OverlappedColumn2d from 'fusioncharts/fusioncharts.overlappedcolumn2d';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

@NgModule({
  declarations: [AccumulatedRevenueComponent],
  imports: [
    CommonModule,
    RevenueCompanyRoutingModule,
    MaterialAllModules,
    NgChartsModule,
    FusionChartsModule.forRoot(
      FusionCharts,
      Charts,
      OverlappedBar2d,
      OverlappedColumn2d,
      FusionTheme
    ),
    ChartModule,
  ],
})
export class RevenueCompanyModule {}

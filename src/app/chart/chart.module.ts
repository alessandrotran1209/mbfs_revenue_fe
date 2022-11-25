import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarchartComponent } from './barchart/barchart.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [BarchartComponent],
  imports: [CommonModule, NgChartsModule],
  exports: [BarchartComponent],
})
export class ChartModule {}

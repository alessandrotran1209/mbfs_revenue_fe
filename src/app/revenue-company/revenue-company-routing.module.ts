import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccumulatedRevenueComponent } from './accumulated-revenue/accumulated-revenue.component';

const routes: Routes = [
  { path: 'accumulated', component: AccumulatedRevenueComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevenueCompanyRoutingModule {}

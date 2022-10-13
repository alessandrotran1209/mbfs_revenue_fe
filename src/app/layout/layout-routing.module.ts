import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthAssignmentComponent } from '../month-assignment/month-assignment.component';
import { WeekReportComponent } from '../week-report/week-report.component';
import { AuthGuard } from '../_helpers/auth.guard';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'week', component: WeekReportComponent },
      { path: 'month', component: MonthAssignmentComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class LayoutRoutingModule {}

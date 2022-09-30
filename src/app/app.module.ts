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
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AddDialogComponent,
    WeekReportComponent,
    MonthAssignmentComponent,
    EditDialogComponent,
    LoginComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

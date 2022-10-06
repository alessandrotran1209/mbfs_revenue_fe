import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { map, startWith } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { RevenueSource } from 'src/shared/revenue-source';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-week-report',
  templateUrl: './week-report.component.html',
  styleUrls: ['./week-report.component.scss'],
})
export class WeekReportComponent implements OnInit {
  constructor(public dialog: MatDialog, private httpClient: HttpClient) {}
  branches = [];
  ngOnInit() {
    this.branches = [
      'Hà Nội',
      'Tp. HCM',
      'Đà Nẵng',
      'Đồng Nai',
      'Hải Phòng',
      'Cần Thơ',
      'VAS',
    ];
    this.ds = [
      { title: 'Trong Mobifone', data: [] },
      { title: 'Ngoài Mobifone', data: [] },
      { title: 'Dự án và các nguồn DT khác', data: [] },
    ];

    for (let i = 0; i < this.ds.length; i++) {
      this.clickedRows.push(new Set<any>());
      this.panelOpenState.set(i, true);
    }
  }
  ds: any = {};
  columns: Array<any>;
  displayedColumns: string[] = [];
  panelOpenState: Map<number, boolean> = new Map<number, boolean>();
  clickedRows: Array<any> = [];

  getRevenueData(i: number) {
    const revenueSource = new RevenueSource();
    const source = revenueSource.getRevenueSource(i);
    return this.httpClient
      .get(`${environment.baseUrl}/revenue/q?source=${source}`)
      .pipe(map((res) => res));
  }

  populateDataFromSource(i: number) {
    this.getRevenueData(i).subscribe((response: any) => {
      if (response.data.length == 0) {
        return;
      }
      console.log(response.data);

      const columns = response.data
        .reduce((columns, row) => {
          return [...columns, ...Object.keys(row)];
        }, [])
        .reduce((columns, column) => {
          return columns.includes(column) ? columns : [...columns, column];
        }, []);

      this.columns = columns.map((column) => {
        return {
          columnDef: column,
          header: this.headerViewValue[column],
          cell: (element: any) => `${element[column] ? element[column] : ``}`,
        };
      });
      this.displayedColumns = this.columns.map((c) => c.columnDef);

      this.ds[i].data = response.data;
    });
  }

  openEditDialog(row: Object, i: number) {
    const revenueSource = new RevenueSource();
    const source = revenueSource.getRevenueSource(i);
    row['revenue_source'] = source;
    const dialogRef = this.dialog.open(EditDialogComponent, { data: row });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.populateDataFromSource(i);
      }
    });
  }

  headerViewValue: Record<string, string> = {
    revenue_target: 'Mục tiêu',
    revenue_category: 'Hạng mục',
    revenue_subcategory: 'Dịch vụ',
    revenue_detail: 'Chi tiết',
    week0: 'Tuần 1',
    week1: 'Tuần 2',
    week2: 'Tuần 3',
    week3: 'Tuần 4',
    week4: 'Tuần 5',
    complete_rate: 'Tỉ lệ hoàn thành',
  };

  getBranch(branch: string) {
    return `CN. ${branch}`;
  }
}

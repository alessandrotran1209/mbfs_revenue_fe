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

import * as XLSX from 'xlsx';

type AOA = any[][];

import { AddDialogComponent } from '../add-dialog/add-dialog.component';

@Component({
  selector: 'app-month-assignment',
  templateUrl: './month-assignment.component.html',
  styleUrls: ['./month-assignment.component.scss'],
})
export class MonthAssignmentComponent implements OnInit {
  constructor(public dialog: MatDialog, private httpClient: HttpClient) {}

  ngOnInit() {
    this.ds = [
      { title: 'Trong Mobifone', data: [] },
      { title: 'Ngoài Mobifone', data: [] },
      { title: 'Đổi mới', data: [] },
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
  clickedRows = new Array();

  openDialog(i: number) {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: i,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.populateDataFromSource(i);
    });
  }

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

  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
      console.log(jsonData.Sheet1);

      this.setRevenueTarget(jsonData.Sheet1).subscribe((response) => {
        console.log(response);
      });
    };
    reader.readAsBinaryString(file);
  }

  public setRevenueTarget(data) {
    return this.httpClient
      .post('http://127.0.0.1:8000/insert-excel', data)
      .pipe(map((res) => res));
  }
}

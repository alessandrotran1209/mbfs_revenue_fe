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
  clickedRows = new Array();
  branches = [];

  openDialog(branch: string, i: number) {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: [branch, i],
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.populateDataFromSource(branch, i);
    });
  }

  getRevenueData(branch: string, i: number) {
    const revenueSource = new RevenueSource();
    const source = revenueSource.getRevenueSource(i);
    return this.httpClient
      .get(`${environment.baseUrl}/revenue/q?branch=${branch}&source=${source}`)
      .pipe(map((res) => res));
  }

  populateDataFromSource(branch: string, i: number) {
    this.getRevenueData(branch, i).subscribe((response: any) => {
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
    week5: 'Tuần 6',
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
      // const ws: XLSX.WorkSheet = workBook.Sheets[target];
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});

      const dataString = JSON.stringify(jsonData);
      for (const branch of this.branches) {
        if (jsonData[branch] == undefined) {
          continue;
        }
        this.setRevenueTarget(jsonData[branch], branch).subscribe(
          (response) => {
            console.log(response);
          }
        );
      }
    };
    reader.readAsBinaryString(file);
  }

  getBranch(branch: string) {
    return `CN. ${branch}`;
  }

  public setRevenueTarget(data, target) {
    return this.httpClient
      .post(`${environment.baseUrl}/insert-excel?target=${target}`, data)
      .pipe(map((res) => res));
  }
}

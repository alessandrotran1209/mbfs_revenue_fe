import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RevenueSource } from 'src/shared/revenue-source';
import { map, startWith } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public row: Object,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    public fb: FormBuilder,
    private httpClient: HttpClient
  ) {}
  insertForm!: FormGroup;

  ngOnInit(): void {
    console.log(this.row);
    this.insertForm = this.fb.group({});
    this.reactiveForm();
  }

  onNoClick(message: string): void {
    this.dialogRef.close(message);
  }

  reactiveForm() {
    for (let key of Object.keys(this.row)) {
      if (key == 'complete_rate') continue;
      let control = new FormControl(this.row[key]);
      if (this.row[key] != 0 && key.indexOf('week') != -1) {
        let control = new FormControl({
          value: Number.parseFloat(this.row[key]),
          disabled: true,
        });
      }
      this.insertForm.addControl(key, control);
    }
  }

  getRowWeekKeys() {
    const keys = Object.keys(this.row);
    let weekKeys = [];
    for (let key of keys) {
      if (key.indexOf('week') != -1) {
        weekKeys.push(key);
      }
    }
    return weekKeys;
  }

  onFormSubmit() {
    this.updateWeekRevenue().subscribe((response: any) => {
      if (response.data) {
        this.dialogRef.close(response.data);
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
    week5: 'Tuần 6',
    complete_rate: 'Tỉ lệ hoàn thành',
  };

  public updateWeekRevenue() {
    const insertData = this.insertForm.value;
    return this.httpClient
      .post(`${environment.baseUrl}/update-week`, insertData)
      .pipe(map((res) => res));
  }
}

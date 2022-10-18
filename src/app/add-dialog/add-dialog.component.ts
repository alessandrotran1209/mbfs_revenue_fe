import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { RevenueSource } from 'src/shared/revenue-source';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const moment = _rollupMoment || _moment;

export const MONTH_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MONTH_FORMATS },
  ],
})
export class AddDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any[],
    public dialogRef: MatDialogRef<AddDialogComponent>,
    public fb: FormBuilder,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.branch = this.data[0];
    this.index = this.data[1];
    this.reactiveForm();
    this.date.setValue(moment());
    let dateValue = moment();
    dateValue = dateValue.add(1, 'M');
    this.insertForm.controls['month'].setValue(
      `${dateValue.month()}/${dateValue.year()}`
    );

    var revenueSource = new RevenueSource();
    this.getCategorySuggestion(
      revenueSource.getRevenueSource(this.index)
    ).subscribe((response: any) => {
      for (var resp of response.data) {
        this.revenueCategoryOptions.push(resp);
      }

      this.filteredOptions = this.insertForm.controls[
        'revenue_source'
      ].valueChanges.pipe(
        startWith(''),
        map((value) => this._revenueCategoryfilter(value || ''))
      );
    });
  }

  branch: string;
  index: number;
  insertForm!: FormGroup;
  date = new FormControl();
  revenueCategoryOptions: string[] = [];
  revenueSubcategoryOptions: string[] = [];
  revenueDetailOptions: string[] = [];
  filteredOptions: Observable<string[]>;
  filteredSubcategoryOptions: Observable<string[]>;
  filteredDetailOptions: Observable<string[]>;

  onNoClick(message: string): void {
    this.dialogRef.close(message);
  }

  reactiveForm() {
    this.insertForm = this.fb.group({
      branch: this.fb.control(this.branch),
      month: this.fb.control('', [Validators.required]),
      revenue_source: this.fb.control('', [Validators.required]),
      revenue_category: this.fb.control(''),
      revenue_subcategory: this.fb.control(''),
      revenue_detail: this.fb.control(''),
      value: this.fb.control('', [Validators.required]),
    });

    var revenueSource = new RevenueSource();
    this.insertForm.controls['revenue_source'].setValue(
      revenueSource.getRevenueSource(this.index)
    );
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(moment(normalizedYear).year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(
    normalizedMonth: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.date.value;
    ctrlValue.month(moment(normalizedMonth).month());
    this.date.setValue(ctrlValue);
    datepicker.close();

    this.insertForm.controls['month'].setValue(
      this.date.value.format('MM/YYYY')
    );
  }

  private _revenueCategoryfilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.revenueCategoryOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _revenueSubcategoryfilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.revenueSubcategoryOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _revenueDetailfilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.revenueDetailOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  public processSubCategorySuggestions(event: string) {
    this.revenueSubcategoryOptions = [];
    this.revenueDetailOptions = [];

    this.insertForm.controls['revenue_subcategory'].setValue('');
    this.insertForm.controls['revenue_detail'].setValue('');

    this.getSubCategorySuggestions(event).subscribe((response: any) => {
      this.revenueSubcategoryOptions = response.data;

      this.filteredSubcategoryOptions = this.insertForm.controls[
        'revenue_subcategory'
      ].valueChanges.pipe(
        startWith(''),
        map((value) => this._revenueSubcategoryfilter(value || ''))
      );
    });
  }

  public processDetailSuggestions(event: string) {
    this.revenueDetailOptions = [];
    this.insertForm.controls['revenue_detail'].setValue('');

    this.getDetailSuggestions(event).subscribe((response: any) => {
      console.log(response.data);

      this.revenueDetailOptions = response.data;

      this.filteredDetailOptions = this.insertForm.controls[
        'revenue_detail'
      ].valueChanges.pipe(
        startWith(''),
        map((value) => this._revenueDetailfilter(value || ''))
      );
    });
  }

  onFormSubmit() {
    this.setRevenueTarget().subscribe((response: any) => {
      console.log(response);
      this.onNoClick('inserted');
    });
  }

  public getCategorySuggestion(source: string) {
    return this.httpClient
      .get(`${environment.baseUrl}/category/q?source=${source}`)
      .pipe(map((res) => res));
  }

  public getSubCategorySuggestions(event: string) {
    const source = this.insertForm.controls['revenue_source'].value;
    return this.httpClient
      .get(
        `${environment.baseUrl}/subcategory/q?source=${source}&category=${event}`
      )
      .pipe(map((res) => res));
  }

  public getDetailSuggestions(event: string) {
    const source = this.insertForm.controls['revenue_source'].value;
    const category = this.insertForm.controls['revenue_category'].value;
    return this.httpClient
      .get(
        `${environment.baseUrl}/detail/q?source=${source}&category=${category}&subcategory=${event}`
      )
      .pipe(map((res) => res));
  }

  public setRevenueTarget() {
    const insertData = this.insertForm.value;
    return this.httpClient
      .post(`${environment.baseUrl}/insert`, insertData)
      .pipe(map((res) => res));
  }
}

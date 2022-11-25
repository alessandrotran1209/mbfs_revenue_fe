import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accumulated-revenue',
  templateUrl: './accumulated-revenue.component.html',
  styleUrls: ['./accumulated-revenue.component.scss'],
})
export class AccumulatedRevenueComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  type = 'overlappedbar2d';
  dataSource = {
    chart: {
      caption: 'Kết quả chi tiết doanh thu toàn công ty',
      subCaption: '9 tháng đầu năm 2022',
      xAxisName: 'Dịch vụ',
      // yAxisName: 'Đơn vị (triệu đồng)',
      showValues: '1',
      decimalSeparator: ',',
      thousandSeparator: '.',
      numberScaleValue: '1,1000',
      numberScaleUnit: 'triệu ,tỷ',
      drawcrossline: '1',
      plottooltext:
        '<b>$seriesName</b> của <b>$label</b> đạt <b>$dataValue</b>',
      theme: 'fusion',
    },
    categories: [
      {
        category: [
          {
            label: 'Dịch vụ chăm sóc khách hàng',
          },
          {
            label: 'Dịch vụ hạ tầng viễn thông',
          },
          {
            label: 'Dịch vụ giá trị gia tăng',
          },
          {
            label: 'Dịch vụ, sản phẩm CNTT và dịch vụ mobiFiber',
          },
        ],
      },
    ],
    dataset: [
      {
        seriesname: 'Kế hoạch 2022',
        data: [
          {
            value: 226959,
          },
          {
            value: 113137,
          },
          {
            value: 37730,
          },
          {
            value: 1800,
          },
        ],
      },
      {
        seriesname: 'Kế hoạch 9 tháng',
        data: [
          {
            value: 242765,
          },
          {
            value: 134928,
          },
          {
            value: 31540,
          },
          {
            value: 4530,
          },
        ],
      },
      {
        seriesname: 'Lũy kế 9 tháng',
        data: [
          {
            value: 180459,
          },
          {
            value: 66358,
          },
          {
            value: 24653,
          },
          {
            value: 4,
          },
        ],
      },
    ],
  };
}

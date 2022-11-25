import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ChartConfiguration,
  ChartData,
  ChartEvent,
  ChartType,
  ChartDataset,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss'],
})
export class BarchartComponent implements OnInit {
  @Input()
  get type(): string {
    return this._type;
  }
  set type(type: string) {
    this._type = (type && type.trim()) || '<no name set>';
  }
  private _type = '';
  constructor() {}

  ngOnInit(): void {
    if (this.type == 'customerservice') {
      this.barChartData = [
        {
          data: [8723, 8634, 900, 513, 385, 0, 49333],
          label: 'Doanh thu với MobiFone',
        },
        {
          data: [, , , , , , , 190, 9450],
          label: 'Doanh thu ngoài MobiFone',
        },
      ];
      this.barChartLabels = [
        'Doanh thu nhân công MobiFone',
        'Hỗ trợ nghiệp vụ',
        'Doanh thu hệ thống MobiFone',
        'Doanh thu CSKH trên mạng Xã hội',
        'Dịch vụ mới',
        'Bán vé máy bay',
        'Dịch vụ mới khác',
        'Doanh thu ổn định & chuyển tiếp',
        'Doanh thu mới',
      ];
    } else if (this.type == 'infra') {
      this.barChartData = [
        {
          data: [8723, 8634, 900, 513, 385, 0, 49333],
          label: 'Doanh thu với MobiFone',
        },
        {
          data: [, , , , , , , 190, 9450],
          label: 'Doanh thu ngoài MobiFone',
        },
      ];
      this.barChartLabels = [
        'Doanh thu nhân công MobiFone',
        'Hỗ trợ nghiệp vụ',
        'Doanh thu hệ thống MobiFone',
        'Doanh thu CSKH trên mạng Xã hội',
        'Dịch vụ mới',
        'Bán vé máy bay',
        'Dịch vụ mới khác',
        'Doanh thu ổn định & chuyển tiếp',
        'Doanh thu mới',
      ];
    } else if (this.type == 'added-value') {
      this.barChartData = [
        {
          data: [2666, 1320],
          label: 'Doanh thu với MobiFone',
        },
        {
          data: [700],
          label: 'Doanh thu ngoài MobiFone',
        },
      ];
      this.barChartLabels = ['Dịch vụ ổn định & chuyển tiếp', 'Dịch vụ mới'];
    } else if (this.type == 'percentage') {
      this.barChartData = [
        {
          data: [66, 67, 97.2],
          label: 'Tỷ lệ thực hiện/ kế hoạch 9 tháng',
        },
        {
          data: [49, 59, 78.8],
          label: 'Thực hiện 9 tháng/ kế hoạch năm 2022',
        },
        {
          data: [78, 65, 85],
          label: 'So sánh cùng kì 2021',
        },
      ];
      this.barChartLabels = [
        'Dịch vụ chăm sóc khách hàng',
        'Dịch vụ hạ tầng viễn thông',
        'Dịch vụ giá trị gia tăng',
      ];

      this.barChartOptions.plugins.datalabels.formatter = (value, ctx) => {
        var perc = value + '%';
        return perc;
      };

      this.barChartOptions.plugins.tooltip = {};
      this.barChartOptions.plugins.tooltip.callbacks = {};
      this.barChartOptions.plugins.tooltip.callbacks.label = (context) => {
        let label = context.dataset.label || '';

        if (label) {
          label += ': ';
        }
        if (context.parsed.y !== null) {
          label += context.parsed.y + '%';
        }
        return label;
      };
    }
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];

  public barChartData: ChartDataset[] = [];
  public barChartLabels: string[];
}

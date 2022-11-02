import { Component, OnInit, ViewChild } from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  ChartEvent,
  ChartType,
  ChartData,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

import { default as Annotation } from 'chartjs-plugin-annotation';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor() {
    Chart.register(Annotation);
  }

  ngOnInit(): void {
    this.hideOne(2);
  }

  @ViewChild(BaseChartDirective) pieChart: BaseChartDirective | undefined;

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        display: true,
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr: any[] = ctx.chart.data.datasets[0].data;
          dataArr.map((data: number) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(2) + '%';
          return percentage;
        },
        color: '#fff',
      },
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Doanh thu với Mobifone', 'Doanh thu ngoài Mobifone'],
    datasets: [
      {
        data: [301998, 32965],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];

  public profitLineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [16406, 18073],
        label: 'Lợi nhuận sau thuế',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },

      {
        data: [28000, 29640],
        label: 'Kế hoạch lợi nhuận sau thuế',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
      {
        data: [16406 / 0.923, 18073 / 0.8],
        label: 'Cùng kì 2021',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: ['Tháng 9', 'Tháng 10'],
  };

  public revenueLineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [301719, 334963],
        label: 'Doanh thu',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [762452, 772577],
        label: 'Kế hoạch doanh thu',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
      {
        data: [301719 / 0.91, 334963 / 0.95],
        label: 'Cùng kì 2021',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: ['Tháng 9', 'Tháng 10'],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    // scales: {
    //   // We use this empty structure as a placeholder for dynamic theming.
    //   x: {},
    //   'y-axis-0':
    //   {
    //     position: 'left',
    //   },
    //   'y-axis-1': {
    //     position: 'right',
    //     grid: {
    //       color: 'rgba(255,0,0,0.3)',
    //     },
    //     ticks: {
    //       color: 'red'
    //     }
    //   }
    // },

    plugins: {
      legend: { display: true },
      datalabels: {
        display: false,
      },
      // annotation: {
      //   annotations: [
      //     {
      //       type: 'line',
      //       scaleID: 'x',
      //       value: 'March',
      //       borderColor: 'orange',
      //       borderWidth: 2,
      //       label: {
      //         display: true,
      //         position: 'center',
      //         color: 'orange',
      //         content: 'LineAnno',
      //         font: {
      //           weight: 'bold'
      //         }
      //       }
      //     },
      //   ],
      // }
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  public hideOne(i: number): void {
    const isHidden = this.chart?.isDatasetHidden(i);
    console.log(isHidden);

    this.chart?.hideDataset(i, !isHidden);
  }
}

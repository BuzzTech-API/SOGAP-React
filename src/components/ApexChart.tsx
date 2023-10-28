import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface ApexChartProps {}

interface ApexChartState {
  series: number[];
  options: any; // Use the appropriate type for your options
}

class ApexChart extends React.Component<ApexChartProps, ApexChartState> {
  constructor(props: ApexChartProps) {
    super(props);

    this.state = {
      series: [44, 55, 41, 17, 15],
      options: {
        chart: {
          type: 'donut',
        },
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 90,
            offsetY: 10,
          },
        },
        grid: {
          padding: {
            bottom: -80,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="donut" />
      </div>
    );
  }
}

export default ApexChart;
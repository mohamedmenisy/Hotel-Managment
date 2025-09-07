import { Component } from '@angular/core';
import { ApiResponse, Bookings, chart, ChartService, IUsers } from '../Services/chart.service';
import { MatIcon } from "@angular/material/icon";
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  chartData:chart |null=null;


  constructor(private _chart:ChartService){
        Chart.register(...registerables);

  }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this._chart.getChartData().subscribe({
      next:(res:ApiResponse)=>{
        this.chartData=res.data;
        console.log(this.chartData);
        this.loadChart(this.chartData.bookings);
        this.loadChartUsers(this.chartData.users)
      },
      error:(err)=>{},
      complete:()=>{},
    })
  }

  loadChart(data:Bookings){
      new Chart('doughnutCanvas', {
      type: 'doughnut',
      data: {
        labels: ['Pending', 'Completed'],
        datasets: [{
          data: [data.pending, data.completed],
          backgroundColor: ['#5368F0', '#9D57D5', ]
        }]
      },
      options: {
        responsive: true,
        cutout: '40%',
         plugins: {
      legend: {
        labels:{
        usePointStyle: true,
        pointStyle: 'rect',
        boxWidth: 15,
        boxHeight: 15,
        },
        position: 'right',
      }
    }
      }
    });
  }
  loadChartUsers(data:IUsers){
      new Chart('users', {
      type: 'doughnut',
      data: {
        labels: ['User', 'Admin'],
        datasets: [{
          data: [data.user, data.admin],
          backgroundColor: ['#54D14D', '#35C2FD', ]
        }]
      },
      options: {
        responsive: true,
        cutout: '40%',
         plugins: {
        legend: {
        labels:{
        usePointStyle: true,
        pointStyle: 'rect',
        boxWidth: 15,
        boxHeight: 15,
        },
        position: 'right',
      }
    }
      },
  plugins: [
    {
      id: 'centerText',
      afterDraw(chart) {
        const { ctx } = chart;
        const chartArea = chart.chartArea;

        ctx.save();
        ctx.font = 'bold 18px Arial';
        ctx.fillStyle = '#111827'; // اللون (Tailwind gray-900)
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Users', (chartArea.left + chartArea.right) / 2, (chartArea.top + chartArea.bottom) / 2);
        ctx.restore();
      }
    }
  ]
    });
  }
}

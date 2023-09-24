import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  {Chart} from 'chart.js/auto';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {
  public dataSource = {
    datasets: [
        {
            data: [] as any[],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
            ]
        }
    ],
    labels: [] as any[]
};

  constructor(private http: HttpClient) {
    
   }

  ngAfterViewInit(): void {
    
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      console.log(res.data);
      for (var i = 0; i < res.myBudget.length; i++) {
        console.log(i);
        console.log(res.myBudget[i].title);
        console.log(res.myBudget[i].budget);
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
        // this.dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
        // this.dataSource.labels[i] = res.data.myBudget[i].title;
        // this.createChart();
    }
    this.createChart();
    });
  }

  createChart() {
    const chartCanvas = document.getElementById('myChart') as HTMLCanvasElement | null;
    
    if (chartCanvas) {
      const ctx = chartCanvas.getContext('2d');
      
      if (ctx) {
        const myPieChart = new Chart(ctx, {
          type: 'pie',
          data: this.dataSource
        });
      } else {
        console.error("getContext('2d') returned null");
      }
    } else {
      console.error("Element with ID 'myChart' not found");
    }
  }

}

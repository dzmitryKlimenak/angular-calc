import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { TodoListService } from '../../../todo-manager/service/todo-list.service';
import { TodoPriorityLabelPipe } from '../../../shared/pipe/todo-priority-label.pipe';
import { IUserData } from '../../../shared/interface';

@Component({
  selector: 'app-user-tasks-progress',
  templateUrl: './user-tasks-progress.component.html',
  styleUrls: ['./user-tasks-progress.component.scss'],
  providers: [TodoPriorityLabelPipe],
})
export class UserTasksProgressComponent implements AfterViewInit {
  @Input() userProfile: IUserData;

  @ViewChild('chart')
  private chartRef: ElementRef;

  private chart: Chart;

  constructor(private taskService: TodoListService, private priorityPipe: TodoPriorityLabelPipe) {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    const labels = this.taskService.getPriorityList().map((el) => this.priorityPipe.transform(el));
    const chartData = this.taskService.getPriorityList().map((item) => {
      const todos = this.taskService.getTodos();
      return todos.filter((todo) => todo.priority === item).length;
    });
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'User tasks',
          data: chartData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
          ],
          borderWidth: 1,
        },
      ],
    };

    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}

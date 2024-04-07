import { Component } from '@angular/core';
import { TodoListService } from '../../../todo-manager/service/todo-list.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-task-progress',
  templateUrl: './task-progress.component.html',
  styleUrls: ['./task-progress.component.scss'],
})
export class TaskProgressComponent {
  public taskProgress$ = this.taskService.todos$.pipe(
    map((todos) => {
      return (todos.filter((todo) => todo.completed).length / todos.length) * 100;
    }),
  );

  constructor(private taskService: TodoListService) {}
}

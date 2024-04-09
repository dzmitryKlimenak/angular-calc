import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { ITodoItem } from '../../shared/interface';
import { Observable, of } from 'rxjs';
import { TodoListService } from '../service/todo-list.service';
import { LoadingService } from '../../shared/service/loading.service';

@Injectable()
export class TodoItemResolver implements Resolve<ITodoItem> {
  constructor(private todoService: TodoListService, private loadingService: LoadingService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITodoItem> {
    const todoId: string = route.params['id'];
    if (!this.todoService.getTodoById(+todoId)) {
      return this.loadingService.showLoaderUntilCompleted(this.todoService.fetchTodoItem(+todoId));
    } else {
      return of(this.todoService.getTodoById(+todoId));
    }
  }
}

import { Resolve } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { ITodoItem, IUserData } from '../../shared/interface';
import { TodoListService } from '../service/todo-list.service';
import { LoadingService } from '../../shared/service/loading.service';
import { Injectable } from '@angular/core';
import { UsersService } from '../service/users.service';

@Injectable()
export class TodoListResolver implements Resolve<{ todos: ITodoItem[]; users: IUserData[] }> {
  private requested = false;

  constructor(
    private todoService: TodoListService,
    private usersService: UsersService,
    private loadingService: LoadingService,
  ) {}

  resolve(): Observable<{ todos: ITodoItem[]; users: IUserData[] }> {
    if (!this.requested) {
      this.requested = true;

      return this.loadingService.showLoaderUntilCompleted(
        forkJoin({
          todos: this.todoService.fetchTodoList(),
          users: this.usersService.fetchUsers(),
        }),
      );
    }
    return of({ todos: [], users: [] });
  }
}

import { Resolve } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { ITodoItem, IUserData } from '../interface';
import { TodoListService } from '../../todo-manager/service/todo-list.service';
import { LoadingService } from '../service/loading.service';
import { Injectable } from '@angular/core';
import { UsersService } from '../../users/users.service';

@Injectable()
export class AppDataResolver implements Resolve<{ todos: ITodoItem[]; users: IUserData[] }> {
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

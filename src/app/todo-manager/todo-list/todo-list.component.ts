import { Component } from '@angular/core';
import { TodoManagerService } from '../todo-manager.service';
import { ETodoAction, ITodoItem } from '../todo-manager.interface';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  public readonly todoList$: Observable<ITodoItem[]> = this.todoService.todos$;

  todoListLength$: Observable<number> = this.todoList$.pipe(map((todos) => todos.length));

  public isShowFullList: boolean = false;

  public readonly loadMoreAmount: number = 3;

  constructor(private todoService: TodoManagerService) {}

  public addItem(): void {
    this.todoService.todoAction(ETodoAction.ADD);
  }

  public cleanTodoList(): void {
    this.todoService.todoAction(ETodoAction.REMOVE_ALL);
    this.toggleFullList(false);
  }

  public todoTrack(index: number, item: ITodoItem): string {
    return item.id;
  }

  public toggleFullList(state: boolean): void {
    this.isShowFullList = state;
  }
}

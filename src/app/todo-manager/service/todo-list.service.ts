import { Injectable } from '@angular/core';
import { TodoActionType } from '../interface/todo-manager.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { ETodoAction } from '../interface/todo-manager.enum';
import { ApiRestService } from '../../shared/service/api-rest.service';
import { ITodoItem } from '../../shared/interface';
import { tap } from 'rxjs/operators';

@Injectable()
export class TodoListService {
  private readonly defaultTodoTitle: string = 'New todo';

  private todosSub: BehaviorSubject<ITodoItem[]> = new BehaviorSubject<ITodoItem[]>([]);

  todos$: Observable<ITodoItem[]> = this.todosSub.asObservable();

  constructor(private apiService: ApiRestService) {}

  public fetchTodoList(): Observable<ITodoItem[]> {
    return this.apiService
      .fetchTodoList()
      .pipe(tap((todos: ITodoItem[]) => this.todosSub.next(todos)));
  }

  public fetchTodoItem(id: number): Observable<ITodoItem> {
    return this.apiService.fetchTodoItem(id);
  }

  public deleteTodoItem(id: number): Observable<ITodoItem> {
    return this.apiService.deleteTodoItem(id);
  }

  public updateTodoItem(
    id: number,
    property: { [key: string]: boolean | string },
  ): Observable<ITodoItem> {
    return this.apiService.patchTodoItem(id, property);
  }

  public todoAction(action: TodoActionType, todo?: ITodoItem): void {
    switch (action) {
      case ETodoAction.ADD:
        this.addTodoItem();
        break;
      case ETodoAction.EDIT:
        this.editTodo(todo);
        break;
      case ETodoAction.REMOVE:
        this.removeTodoItem(todo);
        break;
      case ETodoAction.REMOVE_ALL:
        this.deleteAllTodoItems();
        break;
      case ETodoAction.FILTER:
        // this.filterTodos(filter);
        break;
      case ETodoAction.SHOW_ALL:
        // this.getFullTodoList();
        break;
      case ETodoAction.BY_ID:
        // this.getTodoById(filter);
        break;
    }
  }

  private getTodos(): ITodoItem[] {
    return this.todosSub.getValue();
  }

  private addTodoItem(): void {
    const todoItem: ITodoItem = this.generateTodoItem();
    const todos: ITodoItem[] = [todoItem, ...this.getTodos()];
    this.todosSub.next(todos);
  }

  private editTodo(todoItem: ITodoItem): void {
    const updatedTodos: ITodoItem[] = this.todosSub
      .getValue()
      .map((todo: ITodoItem) => (todo.id === todoItem.id ? { ...todoItem } : todo));
    this.todosSub.next(updatedTodos);
  }

  private deleteAllTodoItems(): void {
    this.todosSub.next([]);
  }

  // private filterTodos(filter: ITodoItemFilter): void {
  //   if (filter['state'] === null) {
  //     this.todoListSub.next(this.getTodos());
  //   } else if (filter['state']) {
  //     this.todoListSub.next(this.getTodos().filter((todo) => todo.completed));
  //   } else {
  //     this.todoListSub.next(this.getTodos().filter((todo) => !todo.completed));
  //   }
  // }

  private removeTodoItem(todoItem: ITodoItem): void {
    const updatedTodos: ITodoItem[] = this.getTodos().filter((todo) => todo.id !== todoItem.id);
    this.todosSub.next(updatedTodos);
  }

  private generateTodoItem(): ITodoItem {
    return null;
  }
}

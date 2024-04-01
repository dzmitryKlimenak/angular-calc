import { Injectable } from '@angular/core';
import { TodoActionType } from '../interface/todo-manager.interface';
import { BehaviorSubject, map, Observable, shareReplay } from 'rxjs';
import { ETodoAction } from '../interface/todo-manager.enum';
import { ApiRestService } from '../../shared/service/api-rest.service';
import { ITodoItem } from '../../shared/interface';
import { tap } from 'rxjs/operators';
import { getRandomIntInclusive } from '../../shared/function/util';

@Injectable()
export class TodoListService {
  private todosSub: BehaviorSubject<ITodoItem[]> = new BehaviorSubject<ITodoItem[]>([]);

  todos$: Observable<ITodoItem[]> = this.todosSub
    .asObservable()
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  constructor(private apiService: ApiRestService) {}

  public getPriorityList(): number[] {
    return [0, 1, 2, 3, 4];
  }

  public fetchTodoList(): Observable<ITodoItem[]> {
    return this.apiService.fetchTodoList().pipe(
      map((todos: ITodoItem[]) => {
        return todos.map((todo) => {
          const priorityValue = getRandomIntInclusive(0, 4);
          return {
            ...todo,
            priority: priorityValue,
          };
        });
      }),
    );
  }

  public fetchTodoItem(id: number): Observable<ITodoItem> {
    return this.apiService.fetchTodoItem(id);
  }

  public deleteTodoItem(id: number): Observable<ITodoItem> {
    return this.apiService.deleteTodoItem(id);
  }

  public updateTodoItem(id: number, property: Partial<ITodoItem>): Observable<ITodoItem> {
    return this.apiService.patchTodoItem(id, property);
  }

  public createNewTodoItem(todo: ITodoItem): Observable<ITodoItem> {
    return this.apiService
      .addNewTodoItem(0, todo)
      .pipe(tap(() => this.todoAction(ETodoAction.ADD, todo)));
  }

  public todoAction(action: TodoActionType, todo?: ITodoItem): void {
    switch (action) {
      case ETodoAction.ADD:
        this.addTodoItem(todo);
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
    }
  }

  public getTodos(): ITodoItem[] {
    return this.todosSub.getValue();
  }

  public getTodoById(id: number): ITodoItem {
    return this.todosSub.getValue().find((todo) => todo.id === id);
  }

  private addTodoItem(todo: ITodoItem): void {
    const todos: ITodoItem[] = [todo, ...this.getTodos()];
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

  private removeTodoItem(todoItem: ITodoItem): void {
    const updatedTodos: ITodoItem[] = this.getTodos().filter((todo) => todo.id !== todoItem.id);
    this.todosSub.next(updatedTodos);
  }
}

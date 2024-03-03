import { Injectable } from '@angular/core';
import { ITodoItem, ITodoItemFilter, TodoActionType } from './todo-manager.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { ETodoAction } from './todo-manager.enum';

@Injectable()
export class TodoManagerService {
  private readonly defaultTodoTitle: string = 'New todo';

  private readonly todosLocalStorageKey: string = 'todoList';

  private todosSub: BehaviorSubject<ITodoItem[]> = new BehaviorSubject<ITodoItem[]>([]);

  private todoListSub: BehaviorSubject<ITodoItem[]> = new BehaviorSubject<ITodoItem[]>([]);

  public readonly todoList$: Observable<ITodoItem[]> = this.todoListSub.asObservable();

  constructor() {
    this.initTodosFromLocalStorage();
  }

  public todoAction(action: TodoActionType, todo?: ITodoItem, filter?: ITodoItemFilter): void {
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
        this.filterTodos(filter);
        break;
      case ETodoAction.SHOW_ALL:
        this.getFullTodoList();
        break;
      case ETodoAction.BY_ID:
        this.getTodoById(filter);
        break;
    }
    this.updateTodoLocalStorage();
  }

  private getTodos(): ITodoItem[] {
    return this.todosSub.getValue();
  }

  private getFullTodoList(): void {
    this.todoListSub.next(this.getTodos());
  }

  private getTodoById(filter: ITodoItemFilter): void {
    const todoItem: ITodoItem[] = this.getTodos().filter((todo) => todo.id === filter['id']);
    this.todoListSub.next([...todoItem]);
  }

  private addTodoItem(): void {
    const todoItem: ITodoItem = this.generateTodoItem();
    const todos: ITodoItem[] = [todoItem, ...this.getTodos()];
    this.todosSub.next(todos);
    this.todoListSub.next(todos);
  }

  private editTodo(todoItem: ITodoItem): void {
    const updatedTodos: ITodoItem[] = this.todosSub
      .getValue()
      .map((todo: ITodoItem) => (todo.id === todoItem.id ? { ...todoItem } : todo));
    this.todosSub.next(updatedTodos);
    this.todoListSub.next(updatedTodos);
  }

  private deleteAllTodoItems(): void {
    this.todosSub.next([]);
    this.todoListSub.next([]);
  }

  private filterTodos(filter: ITodoItemFilter): void {
    if (filter['state'] === null) {
      this.todoListSub.next(this.getTodos());
    } else if (filter['state']) {
      this.todoListSub.next(this.getTodos().filter((todo) => todo.state));
    } else {
      this.todoListSub.next(this.getTodos().filter((todo) => !todo.state));
    }
  }

  private removeTodoItem(todoItem: ITodoItem): void {
    const updatedTodos: ITodoItem[] = this.getTodos().filter((todo) => todo.id !== todoItem.id);
    this.todosSub.next(updatedTodos);
    this.todoListSub.next(updatedTodos);
  }

  private generateTodoItem(): ITodoItem {
    return {
      id: this.generateTodoId(),
      title: this.defaultTodoTitle,
      state: false,
    };
  }

  private generateTodoId(): string {
    //return uniq string length 5;
    return Math.random().toString(36).slice(2, 7);
  }

  private updateTodoLocalStorage(): void {
    const todos: ITodoItem[] = this.getTodos();

    if (localStorage.getItem(this.todosLocalStorageKey)) {
      localStorage.removeItem(this.todosLocalStorageKey);
    }
    localStorage.setItem(this.todosLocalStorageKey, JSON.stringify(todos));
  }

  private initTodosFromLocalStorage(): void {
    const todos: string = localStorage.getItem(this.todosLocalStorageKey);
    if (todos) {
      this.todosSub.next(JSON.parse(todos));
    }
  }
}

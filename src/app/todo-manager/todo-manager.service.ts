import { Injectable } from '@angular/core';
import { ETodoAction, ITodoItem, TodoActionType } from './todo-manager.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class TodoManagerService {
  private readonly defaultTodoTitle: string = 'New todo';

  private readonly todosLocalStorageKey: string = 'todoList';

  private todosSub: BehaviorSubject<ITodoItem[]> = new BehaviorSubject<ITodoItem[]>([]);

  public readonly todos$: Observable<ITodoItem[]> = this.todosSub.asObservable();

  constructor() {
    this.initTodosFromLocalStorage();
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
    }
    this.updateTodoLocalStorage();
  }

  public getTodos(): ITodoItem[] {
    return this.todosSub.getValue();
  }

  private addTodoItem(): void {
    const todoItem: ITodoItem = this.generateTodoItem();
    this.todosSub.next([todoItem, ...this.getTodos()]);
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

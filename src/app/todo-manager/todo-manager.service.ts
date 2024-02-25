import { Injectable } from '@angular/core';
import { ETodoAction, ITodoItem, todoActionType } from './todo-manager.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TodoManagerService {
  private readonly defaultTodoTitle: string = 'New todo';

  private todosSub: BehaviorSubject<ITodoItem[]> = new BehaviorSubject<ITodoItem[]>([]);

  public readonly todos$ = this.todosSub.asObservable();

  constructor() {}

  public todoAction(action: todoActionType, todo?: ITodoItem): void {
    switch (action) {
      case ETodoAction.ADD:
        this.addTodoItem();
        break;
      case ETodoAction.EDIT:
        // this.removeTodoItem(todo);
        break;
      case ETodoAction.REMOVE:
        this.removeTodoItem(todo);
        break;
      case ETodoAction.TOGGLE_STATE:
        // this.toggleTodoItem(todo);
        break;
      case ETodoAction.SHOW_ALL:
        // this.toggleTodoItem(todo);
        break;
      case ETodoAction.REMOVE_ALL:
        this.deleteAllTodoItems();
        break;
    }
  }

  public getTodos(): ITodoItem[] {
    return this.todosSub.getValue();
  }

  private addTodoItem(): void {
    const todoItem = this.generateTodoItem();
    this.todosSub.next([...this.todosSub.getValue(), todoItem]);
  }

  private deleteAllTodoItems(): void {
    this.todosSub.next([]);
  }

  private removeTodoItem(todoItem: ITodoItem): void {
    const updatedTodos = this.todosSub.getValue().filter((todo) => todo.id !== todoItem.id);
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
}

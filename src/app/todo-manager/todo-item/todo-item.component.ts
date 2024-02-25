import { Component, Input } from '@angular/core';
import { ETodoAction, ITodoItem } from '../todo-manager.interface';
import { TodoManagerService } from '../todo-manager.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() todoItem: ITodoItem;

  constructor(private todoService: TodoManagerService) {}

  public removeTodoItem(todo: ITodoItem): void {
    this.todoService.todoAction(ETodoAction.REMOVE, todo);
  }
}

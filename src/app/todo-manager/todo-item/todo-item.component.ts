import { Component, DestroyRef } from '@angular/core';
import { TodoManagerService } from '../todo-manager.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ETodoAction } from '../todo-manager.enum';
import { map, Observable } from 'rxjs';
import { ITodoItem } from '../todo-manager.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  public readonly todoItem$: Observable<ITodoItem> = this.todoService.todoList$.pipe(
    map((todos) => todos[0]),
  );

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoManagerService,
    private destroyRef: DestroyRef,
  ) {
    this.route.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params: Params) => {
      const id = params['id'];
      this.todoService.todoAction(ETodoAction.BY_ID, null, { id });
    });
  }
}

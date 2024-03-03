import { Component, DestroyRef, OnInit } from '@angular/core';
import { TodoManagerService } from '../todo-manager.service';
import { ITodoItem } from '../todo-manager.interface';
import { map, Observable } from 'rxjs';
import { faEraser } from '@fortawesome/free-solid-svg-icons/faEraser';
import { ETodoAction } from '../todo-manager.enum';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  protected readonly faEraser = faEraser;

  public readonly todoList$: Observable<ITodoItem[]> = this.todoService.todoList$;

  todoListLength$: Observable<number> = this.todoList$.pipe(map((todos) => todos.length));

  constructor(
    private todoService: TodoManagerService,
    private router: Router,
    private route: ActivatedRoute,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params: ParamMap) => {
        const state = params.has('state') ? params.get('state') === 'true' : null;
        this.todoService.todoAction(ETodoAction.FILTER, null, { state });
      });
  }

  public addItem(): void {
    this.todoService.todoAction(ETodoAction.ADD);
    this.resetFilter();
  }

  public cleanTodoList(): void {
    this.todoService.todoAction(ETodoAction.REMOVE_ALL);
    this.resetFilter();
  }

  public todoTrack(index: number, item: ITodoItem): string {
    return item.id;
  }

  resetFilter(): void {
    this.router.navigate([], { queryParams: { state: null }, queryParamsHandling: 'merge' });
  }
}

import { Component, DestroyRef, OnInit } from '@angular/core';
import { TodoListService } from '../../service/todo-list.service';
import { map, Observable } from 'rxjs';
import { faEraser } from '@fortawesome/free-solid-svg-icons/faEraser';
import { ETodoAction } from '../../interface/todo-manager.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ITodoItem } from '../../../shared/interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  protected readonly faEraser = faEraser;

  public readonly todoList$: Observable<ITodoItem[]> = this.todoService.todos$;

  todoListLength$: Observable<number> = this.todoList$.pipe(map((todos) => todos.length));

  constructor(
    private todoService: TodoListService,
    private router: Router,
    private route: ActivatedRoute,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  public addItem(): void {
    this.todoService.todoAction(ETodoAction.ADD);
    this.resetFilter();
  }

  public cleanTodoList(): void {
    this.todoService.todoAction(ETodoAction.REMOVE_ALL);
    this.resetFilter();
  }

  public todoTrack(index: number, item: ITodoItem): number {
    return item.id;
  }

  resetFilter(): void {
    this.router.navigate([], { queryParams: { state: null }, queryParamsHandling: 'merge' });
  }
}

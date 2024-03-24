import { Component, DestroyRef, OnInit } from '@angular/core';
import { TodoListService } from '../../service/todo-list.service';
import { debounceTime, map, Observable, startWith } from 'rxjs';
import { ETodoAction } from '../../interface/todo-manager.enum';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ITodoItem, IUserData } from '../../../shared/interface';
import { ITodoListFormGroup } from '../../interface/todo-manager.interface';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '../../service/users.service';
import { UI_DELAY_TIME } from '../../../shared/constant';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  public readonly todoList$: Observable<ITodoItem[]> = this.todoService.todos$;

  todoListLength$: Observable<number> = this.todoList$.pipe(map((todos) => todos.length));

  public formGroup: FormGroup<ITodoListFormGroup>;

  get userCtrl(): FormControl<IUserData> {
    return this.formGroup && this.formGroup.controls.user;
  }

  get stateCtrl(): FormControl<boolean> {
    return this.formGroup && this.formGroup.controls.state;
  }

  public readonly todoStateOptions: { label: string; value: boolean }[] = [
    { label: 'Completed', value: true },
    { label: 'In progress', value: false },
  ];

  public userOptions: IUserData[] = [];

  public filterValues: Partial<{ user: IUserData; state: boolean }>;

  constructor(
    private todoService: TodoListService,
    private userService: UsersService,
    private router: Router,
    private destroyRef: DestroyRef,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.formGroup.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(UI_DELAY_TIME),
        startWith(this.formGroup.value),
      )
      .subscribe((value) => (this.filterValues = value));
  }

  private initForm(): void {
    this.userOptions = this.userService.getUsersList();
    this.formGroup = this.fb.group<ITodoListFormGroup>({
      user: this.fb.control<IUserData>(null),
      state: this.fb.control<boolean>(null),
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

  public todoTrack(index: number, item: ITodoItem): number {
    return item.id;
  }

  resetFilter(): void {
    this.router.navigate([], { queryParams: { state: null }, queryParamsHandling: 'merge' });
  }
}

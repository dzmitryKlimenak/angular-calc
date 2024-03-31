import { Component, DestroyRef, OnInit } from '@angular/core';
import { TodoListService } from '../../service/todo-list.service';
import { debounceTime, map, Observable, startWith } from 'rxjs';
import { ITodoItem, IUserData } from '../../../shared/interface';
import { ITodoListFormGroup } from '../../interface/todo-manager.interface';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '../../service/users.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ETodoAction } from '../../interface/todo-manager.enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UI_DELAY_TIME } from '../../../shared/constant';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateNewTodoDialogComponent } from '../create-new-todo-dialog/create-new-todo-dialog.component';
import { NotificationService } from '../../../shared/component/notification/notification.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  public readonly todoList$: Observable<ITodoItem[]> = this.todoService.todos$;

  public readonly todoListLength$: Observable<number> = this.todoList$.pipe(
    map((todos) => todos.length),
  );

  public filterFg: FormGroup<ITodoListFormGroup>;

  public priorityOptions: number[] = this.todoService.getPriorityList();

  get userCtrl(): FormControl<IUserData> {
    return this.filterFg && this.filterFg.controls.user;
  }

  get priorityCtrl(): FormControl<number> {
    return this.filterFg && this.filterFg.controls.priority;
  }

  public userOptions: IUserData[] = this.userService.getUsersList();

  constructor(
    private todoService: TodoListService,
    private userService: UsersService,
    private destroyRef: DestroyRef,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private notifications: NotificationService,
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.filterFg.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(UI_DELAY_TIME),
        startWith(this.filterFg.value),
      )
      .subscribe(({ user, priority }) =>
        this.router.navigate([], { queryParams: { userId: user?.id, priority: priority } }),
      );
  }

  private initForm(): void {
    const queryParams = this.activatedRoute.snapshot.queryParams;
    const selectedUser = this.userService.getUserById(+queryParams['userId']) || null;
    const selectedPriority = +queryParams['priority'] || null;
    this.filterFg = this.fb.group({
      user: selectedUser,
      priority: selectedPriority,
    });
  }

  public drop(event: CdkDragDrop<ITodoItem[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const droppedItem: ITodoItem = event.item.data;
      if (droppedItem) {
        this.todoService.todoAction(ETodoAction.EDIT, {
          ...droppedItem,
          completed: !droppedItem.completed,
        });
        this.notifications.showNotification({ title: 'Status updated successfully' });
      }
    }
  }

  public todoTrackFn(index: number, item: ITodoItem): number {
    return item.id;
  }

  public userTrackFn(index: number, item: IUserData): number {
    return item.id;
  }

  public addTodo(): void {
    this.dialog.open(CreateNewTodoDialogComponent, {
      data: {
        priorities: this.priorityOptions,
        users: this.userOptions,
      },
    });
  }
}

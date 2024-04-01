import { Component, DestroyRef, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITodoEditItemFormGroup } from '../../interface/todo-manager.interface';
import { debounceTime, filter, map, Observable, Subject, switchMap } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITodoItem, IUserData } from '../../../shared/interface';
import { TodoListService } from '../../service/todo-list.service';
import { LoadingService } from '../../../shared/service/loading.service';
import { NotificationService } from '../../../shared/component/notification/notification.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TODO_TITLE_MAX_LENGTH, UI_DELAY_TIME } from '../../../shared/constant';
import { UsersService } from '../../service/users.service';
import { ETodoAction } from '../../interface/todo-manager.enum';

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styleUrls: ['./edit-todo-dialog.component.scss'],
})
export class EditTodoDialogComponent implements OnInit {
  protected readonly titleMaxLength = TODO_TITLE_MAX_LENGTH;

  public todoFg: FormGroup<ITodoEditItemFormGroup>;

  onEditTodo: Subject<void> = new Subject();

  public priorityOptions: number[] = this.todoService.getPriorityList();

  public statusOptions: boolean[] = [true, false];

  public usersOptions: IUserData[] = this.userService.getUsersList();

  constructor(
    @Inject(MAT_DIALOG_DATA) public todo: ITodoItem,
    private todoService: TodoListService,
    private userService: UsersService,
    private destroyRef: DestroyRef,
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private notifications: NotificationService,
    private dialogRef: MatDialogRef<EditTodoDialogComponent>,
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.onEditTodo
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(() => this.todoFg.valid),
        debounceTime(UI_DELAY_TIME),
        map(() => {
          return {
            id: this.todo.id,
            title: this.todoFg.controls.title.value,
            userId: this.todoFg.controls.user.value.id,
            priority: this.todoFg.controls.priority.value,
            completed: this.todoFg.controls.state.value,
          };
        }),
        switchMap((todo) => this.editTodo(todo)),
      )
      .subscribe((todo) => {
        this.dialogRef.close(todo);
        this.todoService.todoAction(ETodoAction.EDIT, { ...todo, id: this.todo.id });
        this.notifications.showNotification({ title: 'Title updated successfully' });
      });
  }

  private initForm(): void {
    const user = this.userService.getUsersList().find((u) => u.id === this.todo.userId);
    this.todoFg = this.fb.group({
      user: this.fb.control(user, Validators.required),
      priority: this.fb.control(this.todo.priority, Validators.required),
      title: this.fb.control(this.todo.title, [
        Validators.required,
        Validators.maxLength(TODO_TITLE_MAX_LENGTH),
      ]),
      state: this.fb.control(this.todo.completed, [Validators.required]),
    });
  }

  private editTodo(todo: ITodoItem): Observable<ITodoItem> {
    return this.loadingService.showLoaderUntilCompleted(
      this.todoService.updateTodoItem(this.todo.id, { ...todo }).pipe(map(() => todo)),
    );
  }
}

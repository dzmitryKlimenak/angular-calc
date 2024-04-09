import { Component, DestroyRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICreateTodoDialogData, ITodoItem } from '../../../shared/interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITodoNewItemFormGroup } from '../../interface/todo-manager.interface';
import { TodoListService } from '../../service/todo-list.service';
import { debounceTime, filter, map, Observable, Subject, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TODO_TITLE_MAX_LENGTH, UI_DELAY_TIME } from '../../../shared/constant';
import { getRandomIntInclusive } from '../../../shared/function/util';
import { LoadingService } from '../../../shared/service/loading.service';
import { NotificationService } from '../../../shared/component/notification/notification.service';

@Component({
  selector: 'app-create-new-todo-dialog',
  templateUrl: './create-new-todo-dialog.component.html',
  styleUrls: ['./create-new-todo-dialog.component.scss'],
})
export class CreateNewTodoDialogComponent implements OnInit {
  protected readonly titleMaxLength = TODO_TITLE_MAX_LENGTH;

  public todoFg: FormGroup<ITodoNewItemFormGroup>;

  onCreateTodo: Subject<void> = new Subject();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ICreateTodoDialogData,
    private todoService: TodoListService,
    private destroyRef: DestroyRef,
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private notifications: NotificationService,
    private dialogRef: MatDialogRef<CreateNewTodoDialogComponent>,
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.onCreateTodo
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(() => this.todoFg.valid),
        debounceTime(UI_DELAY_TIME),
        switchMap(() => this.createTodo()),
      )
      .subscribe(() => {
        this.dialogRef.close();
        this.notifications.showNotification({ title: 'Todo created successfully' });
      });
  }

  private initForm(): void {
    this.todoFg = this.fb.group({
      user: this.fb.control(null, Validators.required),
      priority: this.fb.control(null, Validators.required),
      title: this.fb.control(null, [
        Validators.required,
        Validators.maxLength(TODO_TITLE_MAX_LENGTH),
      ]),
    });
  }

  private createTodo(): Observable<ITodoItem> {
    const todo: ITodoItem = {
      id: getRandomIntInclusive(this.todoService.getTodos().length, 1000),
      title: this.todoFg.controls.title.value,
      userId: this.todoFg.controls.user.value.id,
      priority: this.todoFg.controls.priority.value,
      completed: false,
    };
    return this.loadingService.showLoaderUntilCompleted(
      this.todoService.createNewTodoItem(todo).pipe(map(() => todo)),
    );
  }
}

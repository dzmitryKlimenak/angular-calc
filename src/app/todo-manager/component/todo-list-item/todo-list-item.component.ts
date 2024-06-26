import { Component, DestroyRef, HostBinding, Input, OnInit } from '@angular/core';
import { ITodoItemFormGroup } from '../../interface/todo-manager.interface';
import { TodoListService } from '../../service/todo-list.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  faExternalLinkAlt,
  faPencilAlt,
  faSave,
  faUser,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import { ETodoAction } from '../../interface/todo-manager.enum';
import { ITodoItem, IUserData } from '../../../shared/interface';
import { UsersService } from '../../../users/users.service';
import { debounceTime, map, Observable, Subject, switchMap } from 'rxjs';
import { TODO_TITLE_MAX_LENGTH, UI_DELAY_TIME } from '../../../shared/constant';
import { LoadingService } from '../../../shared/service/loading.service';
import { NotificationService } from '../../../shared/component/notification/notification.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss'],
})
export class TodoListItemComponent implements OnInit {
  @HostBinding('class') classList = 'block my-2';

  @Input() todoItem: ITodoItem;

  user$: Observable<IUserData> = this.usersService.users$.pipe(
    map((users) => users.find((user) => user.id === this.todoItem.userId)),
  );

  public isAuth$: Observable<boolean> = this.authService.isAuthenticated$;

  public readonly titleMaxLength: number = TODO_TITLE_MAX_LENGTH;

  public todoFg: FormGroup<ITodoItemFormGroup>;

  get stateCtrl() {
    return this.todoFg && this.todoFg.get('state');
  }

  get titleCtrl() {
    return this.todoFg && this.todoFg.get('title');
  }

  public readonly onDeleteTodo: Subject<void> = new Subject();

  public isEditMode: boolean = false;

  public readonly faUser = faUser;

  public readonly faPencil = faPencilAlt;

  public readonly faExternalLinkAlt = faExternalLinkAlt;

  public readonly faSave = faSave;

  public readonly faWindowClose = faWindowClose;

  constructor(
    private todoService: TodoListService,
    private usersService: UsersService,
    private fb: FormBuilder,
    private destroyRef: DestroyRef,
    private loadingService: LoadingService,
    private notifications: NotificationService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.initTodoForm();

    this.stateCtrl.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(UI_DELAY_TIME),
        switchMap((state) =>
          this.loadingService.showLoaderUntilCompleted(
            this.todoService.updateTodoItem(this.todoItem.id, { completed: state }),
          ),
        ),
      )
      .subscribe(() => {
        this.todoService.todoAction(ETodoAction.EDIT, {
          ...this.todoItem,
          completed: !this.todoItem.completed,
        });
      });

    this.onDeleteTodo
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(UI_DELAY_TIME),
        switchMap(() =>
          this.loadingService.showLoaderUntilCompleted(
            this.todoService.deleteTodoItem(this.todoItem.id),
          ),
        ),
      )
      .subscribe(() => {
        this.todoService.todoAction(ETodoAction.REMOVE, this.todoItem);
        this.notifications.showNotification({ title: 'Todo removed' });
      });
  }

  public saveTitleChanges(): void {
    const title: string = this.titleCtrl.value.trim();
    if (this.titleCtrl.valid && !!title?.length) {
      this.toggleEditMode(false);
      this.todoService
        .updateTodoItem(this.todoItem.id, { title: this.titleCtrl.value })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.todoService.todoAction(ETodoAction.EDIT, {
            ...this.todoItem,
            title: this.titleCtrl.value,
          });
          this.notifications.showNotification({ title: 'Title updated successfully' });
        });
    }
  }

  private initTodoForm(): void {
    this.todoFg = this.fb.group({
      state: this.fb.control<boolean>(this.todoItem.completed),
      title: this.fb.control<string>(this.todoItem.title, [
        Validators.required,
        Validators.maxLength(TODO_TITLE_MAX_LENGTH),
      ]),
    });
  }

  public toggleEditMode(state: boolean): void {
    this.isEditMode = state;
  }
}

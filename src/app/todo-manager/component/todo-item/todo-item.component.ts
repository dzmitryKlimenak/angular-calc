import { Component, DestroyRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { ITodoItem, IUserData } from '../../../shared/interface';
import { TodoListService } from '../../service/todo-list.service';
import { LoadingService } from '../../../shared/service/loading.service';
import { NotificationService } from '../../../shared/component/notification/notification.service';
import { ETodoAction } from '../../interface/todo-manager.enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { UsersService } from '../../../users/users.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  private todoSub: BehaviorSubject<ITodoItem> = new BehaviorSubject<ITodoItem>(null);

  public readonly todo$: Observable<ITodoItem> = this.todoSub.asObservable().pipe(
    filter(Boolean),
    tap((todo) => this.userSub.next(todo.userId)),
  );

  userSub: BehaviorSubject<number> = new BehaviorSubject<number>(null);

  user$: Observable<IUserData> = this.userSub.asObservable().pipe(
    filter(Boolean),
    map((uuid) => this.usersService.getUserById(uuid)),
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoListService,
    private usersService: UsersService,
    private destroyRef: DestroyRef,
    private loadingService: LoadingService,
    private notifications: NotificationService,
    public dialog: MatDialog,
  ) {
    this.todoSub.next(this.todoService.getTodoById(+this.route.snapshot.params['id']));
  }

  public deleteTodo(todo: ITodoItem): void {
    this.loadingService
      .showLoaderUntilCompleted(this.todoService.deleteTodoItem(todo.id))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.todoService.todoAction(ETodoAction.REMOVE, todo);
        this.notifications.showNotification({ title: 'Todo removed' });
        this.router.navigate(['/todos']);
      });
  }

  editTodo(todo: ITodoItem): void {
    const dialogRef = this.dialog.open(EditTodoDialogComponent, {
      data: {
        ...todo,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((updatedTodo) => {
        if (updatedTodo) {
          this.todoSub.next({ ...updatedTodo });
        }
      });
  }
}

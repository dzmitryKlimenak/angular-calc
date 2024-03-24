import { Component, OnInit } from '@angular/core';
import { TodoListService } from '../../service/todo-list.service';
import { map, Observable } from 'rxjs';
import { ITodoItem, IUserData } from '../../../shared/interface';
import { ITodoListFormGroup } from '../../interface/todo-manager.interface';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '../../service/users.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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

  public formGroup: FormGroup<ITodoListFormGroup>;

  get userCtrl(): FormControl<IUserData> {
    return this.formGroup && this.formGroup.controls.user;
  }

  public userOptions: IUserData[] = this.userService.getUsersList();

  constructor(
    private todoService: TodoListService,
    private userService: UsersService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      user: [null],
    });
  }

  drop(event: CdkDragDrop<ITodoItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}

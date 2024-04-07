import { Component, OnInit } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { ITodoItem, IUserData } from '../../../shared/interface';
import { UsersService } from '../../users.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '../../../shared/service/loading.service';
import { TodoListService } from '../../../todo-manager/service/todo-list.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  public user$: Observable<IUserData>;

  public todos$: Observable<ITodoItem[]> = this.todoService.todos$;

  constructor(
    private userService: UsersService,
    private router: ActivatedRoute,
    private loadService: LoadingService,
    private todoService: TodoListService,
  ) {}

  ngOnInit(): void {
    this.user$ = this.router.params.pipe(
      map((params) => params['id']),
      switchMap((id) => this.loadService.showLoaderUntilCompleted(this.userService.fetchUser(id))),
    );
  }

  drop(event: CdkDragDrop<string[]>, todos: ITodoItem[]) {
    moveItemInArray(todos, event.previousIndex, event.currentIndex);
  }

  sortListBy(todoList: ITodoItem[], key: 'priority' | 'completed') {
    switch (key) {
      case 'priority':
        return todoList.sort((a, b) => a.priority - b.priority);
      case 'completed':
        return todoList.sort((a: { [x: string]: any }, b: { [x: string]: any }) => {
          return a[key] === b[key] ? 0 : a[key] ? -1 : 1;
        });
      default:
        return todoList;
    }
  }
}

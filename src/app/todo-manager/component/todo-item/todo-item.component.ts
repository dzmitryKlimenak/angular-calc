import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITodoItem } from '../../../shared/interface';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  private todoSub: BehaviorSubject<ITodoItem> = new BehaviorSubject<ITodoItem>(null);

  public readonly todo$: Observable<ITodoItem> = this.todoSub.asObservable();

  constructor(private route: ActivatedRoute) {
    this.todoSub.next(this.route.snapshot.data['todo']);
  }
}

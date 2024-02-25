import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import { ETodoAction, ITodoItem, ITodoItemFormgroup } from '../todo-manager.interface';
import { TodoManagerService } from '../todo-manager.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { faPencilAlt, faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'block my-2',
  },
})
export class TodoItemComponent implements OnInit {
  @Input() todoItem: ITodoItem;

  private _index: number;

  @Input() set index(idx: number) {
    this._index = idx + 1;
  }

  get index(): number {
    return this._index;
  }

  todoFg: FormGroup<ITodoItemFormgroup>;

  get stateCtrl() {
    return this.todoFg && this.todoFg.get('state');
  }

  get titleCtrl() {
    return this.todoFg && this.todoFg.get('title');
  }

  public isEditMode: boolean = false;

  public readonly faPencil = faPencilAlt;

  public readonly faSave = faSave;

  constructor(
    private todoService: TodoManagerService,
    private fb: FormBuilder,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.initTodoForm();

    this.stateCtrl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((state) => {
      this.todoService.todoAction(ETodoAction.EDIT, {
        ...this.todoItem,
        state,
      });
    });
  }

  public saveTitleChanges(): void {
    const title: string = this.titleCtrl.value.trim();
    if (this.titleCtrl.valid && !!title?.length) {
      this.toggleEditMode(false);
      this.todoService.todoAction(ETodoAction.EDIT, {
        ...this.todoItem,
        title: this.titleCtrl.value,
      });
    }
  }

  private initTodoForm(): void {
    this.todoFg = this.fb.group({
      state: this.fb.control<boolean>(this.todoItem.state),
      title: this.fb.control<string>(this.todoItem.title, [
        Validators.required,
        Validators.maxLength(20),
      ]),
    });
  }

  public removeTodoItem(todo: ITodoItem): void {
    this.todoService.todoAction(ETodoAction.REMOVE, todo);
  }

  public toggleEditMode(state: boolean): void {
    this.isEditMode = state;
  }
}

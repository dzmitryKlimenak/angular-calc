import { FormControl } from '@angular/forms';
import { ETodoAction } from './todo-manager.enum';

export interface ITodoItem {
  id: string;
  title: string;
  state: boolean;
}

export interface ITodoItemFilter {
  [key: string]: boolean | string;
}

export type TodoActionType =
  | ETodoAction.ADD
  | ETodoAction.REMOVE
  | ETodoAction.EDIT
  | ETodoAction.REMOVE_ALL
  | ETodoAction.FILTER
  | ETodoAction.SHOW_ALL
  | ETodoAction.BY_ID;

export interface ITodoItemFormgroup {
  state: FormControl<boolean>;
  title: FormControl<string>;
}

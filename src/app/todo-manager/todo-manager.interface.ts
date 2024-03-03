import { FormControl } from '@angular/forms';

export interface ITodoItem {
  id: string;
  title: string;
  state: boolean;
}

export enum ETodoAction {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  EDIT = 'EDIT',
  REMOVE_ALL = 'REMOVE_ALL',
  SHOW_ALL = 'SHOW_ALL',
}

export type TodoActionType =
  | ETodoAction.ADD
  | ETodoAction.REMOVE
  | ETodoAction.EDIT
  | ETodoAction.REMOVE_ALL
  | ETodoAction.SHOW_ALL;

export interface ITodoItemFormgroup {
  state: FormControl<boolean>;
  title: FormControl<string>;
}

export enum ETodoCssClass {
  ACTIVE = 'active',
  'COMPLETED' = 'completed',
}

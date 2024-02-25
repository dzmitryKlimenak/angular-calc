export interface ITodoItem {
  id: string;
  title: string;
  state: boolean;
}

export enum ETodoAction {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  EDIT = 'EDIT',
  TOGGLE_STATE = 'TOGGLE_STATE',
  REMOVE_ALL = 'REMOVE_ALL',
  SHOW_ALL = 'SHOW_ALL',
}

export type todoActionType =
  | ETodoAction.ADD
  | ETodoAction.REMOVE
  | ETodoAction.EDIT
  | ETodoAction.TOGGLE_STATE
  | ETodoAction.REMOVE_ALL
  | ETodoAction.SHOW_ALL;

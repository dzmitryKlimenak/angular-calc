import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, BASE_API_URL } from '../../../config';
import { catchError, map, Observable, of } from 'rxjs';
import { ITodoItem, IUserData } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class ApiRestService {
  constructor(private httpClient: HttpClient) {}

  fetchTodoList(): Observable<ITodoItem[]> {
    const url: string = `${BASE_API_URL}/${API_URL.TODOS}`;
    return this.httpClient.get<ITodoItem[]>(url).pipe(
      map((todos) => {
        return todos.reduce((arr, todo) => {
          const count = arr.filter((item) => item.userId === todo.userId).length;
          return count > 4 ? arr : [...arr, todo];
        }, [] as ITodoItem[]);
      }),
      catchError((err) => {
        console.error(err);
        return of(null);
      }),
    );
  }

  fetchTodoItem(id: number): Observable<ITodoItem> {
    const url: string = `${BASE_API_URL}/${API_URL.TODOS}/${id}`;
    return this.httpClient.get<ITodoItem>(url).pipe(
      catchError((err) => {
        console.error(err);
        return of(null);
      }),
    );
  }

  deleteTodoItem(id: number): Observable<ITodoItem> {
    const url: string = `${BASE_API_URL}/${API_URL.TODOS}/${id}`;
    return this.httpClient.delete<ITodoItem>(url).pipe(
      catchError((err) => {
        console.error(err);
        return of(null);
      }),
    );
  }

  patchTodoItem(id: number, property: Partial<ITodoItem>): Observable<ITodoItem> {
    const url: string = `${BASE_API_URL}/${API_URL.TODOS}/${id}`;
    const body: string = JSON.stringify(property);
    return this.httpClient.patch<ITodoItem>(url, body).pipe(
      catchError((err) => {
        console.error(err);
        return of(null);
      }),
    );
  }

  addNewTodoItem(id: number, todo: ITodoItem): Observable<ITodoItem> {
    const url: string = `${BASE_API_URL}/${API_URL.TODOS}/${id}`;
    const body: string = JSON.stringify(todo);
    return this.httpClient.put<ITodoItem>(url, body).pipe(
      catchError((err) => {
        console.error(err);
        return of(null);
      }),
    );
  }

  fetchUsers(): Observable<IUserData[]> {
    const url: string = `${BASE_API_URL}/${API_URL.USERS}`;
    return this.httpClient.get<IUserData[]>(url).pipe(
      catchError((err) => {
        console.error(err);
        return of(null);
      }),
    );
  }

  fetchUserProfile(uuid: number): Observable<IUserData> {
    const url: string = `${BASE_API_URL}/${API_URL.USERS}/${uuid}`;
    return this.httpClient.get<IUserData>(url).pipe(
      catchError((err) => {
        console.error(err);
        return of(null);
      }),
    );
  }
}

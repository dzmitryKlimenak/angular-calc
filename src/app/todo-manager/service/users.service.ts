import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUserData } from '../../shared/interface';
import { tap } from 'rxjs/operators';
import { ApiRestService } from '../../shared/service/api-rest.service';

@Injectable()
export class UsersService {
  private usersSub: BehaviorSubject<IUserData[]> = new BehaviorSubject<IUserData[]>([]);

  users$: Observable<IUserData[]> = this.usersSub.asObservable();

  constructor(private apiService: ApiRestService) {}

  public getUsersList(): IUserData[] {
    return this.usersSub.getValue();
  }

  public fetchUsers(): Observable<IUserData[]> {
    return this.apiService
      .fetchUsers()
      .pipe(tap((users: IUserData[]) => this.usersSub.next(users)));
  }
}

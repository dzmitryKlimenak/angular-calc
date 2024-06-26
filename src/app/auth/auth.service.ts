import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay } from 'rxjs';
import { IAuthState } from './auth.interface';
import { EAuthState } from './auth.enum';

@Injectable()
export class AuthService {
  private readonly lcAuthKey = 'isAuthenticated';

  private isAuthenticatedSub: BehaviorSubject<IAuthState> = new BehaviorSubject<IAuthState>(
    EAuthState.NOT_AUTHORISED,
  );

  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSub.asObservable().pipe(
    map((isAuth) => isAuth === EAuthState.AUTHORISED),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  constructor() {
    this.initAuthState();
  }

  public setAuthState(state: IAuthState): void {
    localStorage.setItem(this.lcAuthKey, state);
    this.isAuthenticatedSub.next(state);
  }

  public isAuthenticated(): boolean {
    return this.isAuthenticatedSub.getValue() === EAuthState.AUTHORISED;
  }

  private initAuthState(): void {
    const isAuth = localStorage.getItem(this.lcAuthKey) || EAuthState.NOT_AUTHORISED;
    this.setAuthState(isAuth as IAuthState);
  }
}

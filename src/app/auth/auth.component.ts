import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { EAuthState } from './auth.enum';
import { faUser, faUserNinja } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  protected readonly faUser = faUser;

  protected readonly faUserNinja = faUserNinja;

  get isAuth(): boolean {
    return this.authService.isAuthenticated();
  }

  constructor(private authService: AuthService) {}

  public toggleAuthState(state: boolean): void {
    const isAuth = state ? EAuthState.AUTHORISED : EAuthState.NOT_AUTHORISED;
    this.authService.setAuthState(isAuth);
  }
}

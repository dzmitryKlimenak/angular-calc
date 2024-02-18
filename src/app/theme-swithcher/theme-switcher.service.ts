import { Injectable } from '@angular/core';
import { IThemeMode } from './theme-switcher.interface';
import { EThemeMode } from './theme-switcher.enum';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ThemeSwitcherService {
  private readonly lcThemeKey = 'theme';

  private themeSub: BehaviorSubject<IThemeMode> = new BehaviorSubject<IThemeMode>(EThemeMode.LIGHT);

  readonly theme$ = this.themeSub.asObservable();

  constructor() {
    this.initTheme();
  }

  public setTheme(theme: IThemeMode) {
    localStorage.setItem(this.lcThemeKey, theme);
    this.themeSub.next(theme);
  }

  public getTheme() {
    return this.themeSub.getValue();
  }

  public initTheme() {
    const theme = localStorage.getItem(this.lcThemeKey) || EThemeMode.LIGHT;
    this.setTheme(theme as IThemeMode);
  }
}

import { Injectable } from '@angular/core';
import { IThemeMode } from './theme-switcher.interface';
import { EThemeMode } from './theme-switcher.enum';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ThemeSwitcherService {
  private readonly lcThemeKey = 'theme';

  private themeSub: BehaviorSubject<IThemeMode> = new BehaviorSubject<IThemeMode>(EThemeMode.LIGHT);

  constructor() {
    this.initTheme();
  }

  public setTheme(theme: IThemeMode): void {
    localStorage.setItem(this.lcThemeKey, theme);
    this.themeSub.next(theme);
  }

  public getTheme(): IThemeMode {
    return this.themeSub.getValue();
  }

  private initTheme(): void {
    const theme = localStorage.getItem(this.lcThemeKey) || EThemeMode.LIGHT;
    this.setTheme(theme as IThemeMode);
  }
}

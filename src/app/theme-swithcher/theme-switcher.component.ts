import { Component, OnInit, Renderer2 } from '@angular/core';
import { EThemeMode } from './theme-switcher.enum';
import { IThemeMode } from './theme-switcher.interface';
import { ThemeSwitcherService } from './theme-switcher.service';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss'],
})
export class ThemeSwitcherComponent implements OnInit {
  protected readonly EThemeMode = EThemeMode;

  protected readonly faSun = faSun;

  protected readonly faMoon = faMoon;

  get themeMode(): IThemeMode {
    return this.themeService.getTheme();
  }

  constructor(private renderer: Renderer2, private themeService: ThemeSwitcherService) {}

  ngOnInit(): void {
    this.bodyCLassHandler(this.themeMode);
  }

  public toggleThemeMode(state: boolean): void {
    const selectedTheme = state ? EThemeMode.LIGHT : EThemeMode.DARK;
    this.themeService.setTheme(selectedTheme);
    this.bodyCLassHandler(selectedTheme);
  }

  private bodyCLassHandler(className: IThemeMode): void {
    const bodyEl = document.body;
    if (bodyEl) {
      this.renderer.removeClass(bodyEl, EThemeMode.LIGHT);
      this.renderer.removeClass(bodyEl, EThemeMode.DARK);
      this.renderer.addClass(bodyEl, className);
    }
  }
}

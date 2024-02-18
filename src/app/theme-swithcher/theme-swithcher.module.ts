import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSwitcherComponent } from './theme-switcher.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeSwitcherService } from './theme-switcher.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ThemeSwitcherComponent],
  imports: [CommonModule, MatSlideToggleModule, FormsModule],
  exports: [ThemeSwitcherComponent],
  providers: [ThemeSwitcherService],
})
export class ThemeSwithcherModule {}

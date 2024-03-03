import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSwitcherComponent } from './theme-switcher.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeSwitcherService } from './theme-switcher.service';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ThemeSwitcherComponent],
  imports: [CommonModule, MatSlideToggleModule, FormsModule, FontAwesomeModule],
  exports: [ThemeSwitcherComponent],
  providers: [ThemeSwitcherService],
})
export class ThemeSwitcherModule {}

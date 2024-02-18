import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { ThemeSwithcherModule } from '../theme-swithcher/theme-swithcher.module';

@NgModule({
  declarations: [BaseLayoutComponent],
  imports: [CommonModule, ThemeSwithcherModule],
  exports: [BaseLayoutComponent],
})
export class LayoutsModule {}

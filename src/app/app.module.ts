import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatorModule } from './calculator/calculator.module';
import { LayoutsModule } from './layout/layouts.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, LayoutsModule, AppRoutingModule, CalculatorModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

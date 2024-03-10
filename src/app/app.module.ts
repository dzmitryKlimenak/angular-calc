import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ThemeSwitcherModule } from './theme-swithcher/theme-swithcher.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BaseLayoutComponent } from './pages/base-layout/base-layout.component';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { LoadingModule } from './shared/component/loading/loading.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, BaseLayoutComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ThemeSwitcherModule,
    AuthModule,
    SharedModule,
    LoadingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

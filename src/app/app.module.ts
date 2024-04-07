import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ThemeSwitcherModule } from './theme-swithcher/theme-swithcher.module';
import { NotFoundComponent } from './shared/component/not-found/not-found.component';
import { BaseLayoutComponent } from './shared/component/base-layout/base-layout.component';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { LoadingModule } from './shared/component/loading/loading.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationModule } from './shared/component/notification/notification.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { UserProfileComponent } from './users/component/user-profile/user-profile.component';
import { AppDataResolver } from './shared/resolver/app-data.resolver';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyChipsModule } from '@angular/material/legacy-chips';
import { MatChipsModule } from '@angular/material/chips';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { TodoManagerModule } from './todo-manager/todo-manager.module';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [AppComponent, BaseLayoutComponent, NotFoundComponent, UserProfileComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ThemeSwitcherModule,
    AuthModule,
    SharedModule,
    LoadingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NotificationModule,
    MatSidenavModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatRippleModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatLegacyChipsModule,
    MatChipsModule,
    CdkDropList,
    CdkDrag,
    TodoManagerModule,
    UsersModule,
  ],
  providers: [AppDataResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}

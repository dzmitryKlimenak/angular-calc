import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/component/not-found/not-found.component';
import { BaseLayoutComponent } from './shared/component/base-layout/base-layout.component';
import { AppDataResolver } from './shared/resolver/app-data.resolver';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    resolve: [AppDataResolver],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'todos',
      },
      {
        path: 'calculator',
        loadChildren: () =>
          import('./calculator/calculator.module').then((m) => m.CalculatorModule),
      },
      {
        path: 'todos',
        loadChildren: () =>
          import('./todo-manager/todo-manager.module').then((m) => m.TodoManagerModule),
      },
      {
        path: 'users/:id',
        loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
      },
    ],
  },
  {
    path: 'page-not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'page-not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

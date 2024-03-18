import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BaseLayoutComponent } from './pages/base-layout/base-layout.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
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

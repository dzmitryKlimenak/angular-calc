import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CalculatorComponent } from './calculator.component';

const routes: Routes = [{ path: '', component: CalculatorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalculatorRoutingModule {}

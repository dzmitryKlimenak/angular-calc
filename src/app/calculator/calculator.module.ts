import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from './calculator.component';
import { CalculatorButtonComponent } from './component/calculator-button/calculator-button.component';
import { CalculatorScreenComponent } from './component/calculator-screen/calculator-screen.component';
import { CalculatorService } from './calculator.service';
import { CalculatorRoutingModule } from './calculator-routing.module';

@NgModule({
  declarations: [CalculatorComponent, CalculatorButtonComponent, CalculatorScreenComponent],
  imports: [CommonModule, CalculatorRoutingModule],
  providers: [CalculatorService],
})
export class CalculatorModule {}

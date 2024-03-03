import { Component } from '@angular/core';
import { CalculatorService } from '../../calculator.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-calculator-screen',
  templateUrl: './calculator-screen.component.html',
  styleUrls: ['./calculator-screen.component.scss'],
})
export class CalculatorScreenComponent {
  value$: Observable<string> = this.calculatorService.value$;

  constructor(private calculatorService: CalculatorService) {}
}

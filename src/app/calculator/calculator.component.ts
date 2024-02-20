import { Component } from '@angular/core';
import { CALCULATOR_BUTTONS } from './calculator.constant';
import { ICalculatorButton } from './calcalator.interface';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent {
  buttons: ICalculatorButton[] = CALCULATOR_BUTTONS;
}

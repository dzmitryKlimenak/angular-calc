import { Component, Input } from '@angular/core';
import { ICalculatorButton } from '../../calcalator.interface';
import { CalculatorService } from '../../calculator.service';

@Component({
  selector: 'app-calculator-button',
  templateUrl: './calculator-button.component.html',
  styleUrls: ['./calculator-button.component.scss'],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'flex justify-center items-center',
  },
})
export class CalculatorButtonComponent {
  @Input() button: ICalculatorButton;

  constructor(private calculatorService: CalculatorService) {}

  pressButton(button: ICalculatorButton): void {
    if (button.enabled) {
      this.calculatorService.pressButton(button);
    }
  }
}

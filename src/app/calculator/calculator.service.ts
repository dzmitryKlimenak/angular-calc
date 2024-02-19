import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  ICalculatorButton,
  ICalculatorButtonAction,
  ICalculatorButtonType,
} from './calcalator.interface';

@Injectable()
export class CalculatorService {
  private readonly defaultResult: string = '0';

  private valueSub: BehaviorSubject<string> = new BehaviorSubject<string>(this.defaultResult);

  readonly value$: Observable<string> = this.valueSub.asObservable();

  constructor() {}

  public pressButton(button: ICalculatorButton): void {
    const currentValue = this.valueSub.getValue();
    const newValue = this.calculateNewValue(currentValue, button);
    this.valueSub.next(newValue);
  }

  private calculateNewValue(currentValue: string, button: ICalculatorButton): string {
    switch (button.type as ICalculatorButtonType) {
      case 'number':
        return this.calculateNewValueForNumber(currentValue, button);
      case 'function':
        return this.calculateNewValueForFunction(currentValue, button);
      default:
        return currentValue;
    }
  }

  private calculateNewValueForNumber(currentValue: string, button: ICalculatorButton): string {
    if (currentValue === this.defaultResult) {
      return button.value.toString();
    }
    return currentValue + button.value;
  }

  //TODO: add more function handlers
  private calculateNewValueForFunction(currentValue: string, button: ICalculatorButton): string {
    switch (button.action as ICalculatorButtonAction) {
      case 'reset':
        return this.defaultResult;
      case 'equal':
        return this.defaultResult;
      case 'divide':
        return this.devideHandler(currentValue, button);
      case 'add':
        return this.addHandler(currentValue, button);
      default:
        return currentValue;
    }
  }

  private devideHandler(currentValue: string, button: ICalculatorButton): string {
    if (button.value === 0) {
      return this.defaultResult;
    }
    return (+currentValue / button.value).toString();
  }

  private addHandler(currentValue: string, button: ICalculatorButton): string {
    return (+currentValue + button.value).toString();
  }
}

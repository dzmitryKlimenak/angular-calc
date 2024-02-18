export interface ICalculatorButton {
  label: string;
  value?: number;
  type: ICalculatorButtonType;
  action?: ICalculatorButtonAction;
  keyCode?: number;
  enabled: boolean;
}

export type ICalculatorButtonType = 'number' | 'function';
export type ICalculatorButtonAction =
  | 'reset'
  | 'chaneSign'
  | 'percent'
  | 'divide'
  | 'multiply'
  | 'subtract'
  | 'add'
  | 'point'
  | 'equal';

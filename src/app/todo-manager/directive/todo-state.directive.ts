import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { ETodoState } from '../interface/todo-manager.enum';

@Directive({
  selector: '[appTodoState]',
})
export class TodoStateDirective implements OnChanges, AfterViewInit {
  @Input() appTodoState: boolean;

  constructor(private el: ElementRef, private render: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.toggleStateClass(changes['appTodoState']?.currentValue);
  }

  ngAfterViewInit(): void {
    this.toggleStateClass(this.appTodoState);
  }

  private toggleStateClass(state: boolean): void {
    this.render.removeClass(this.el.nativeElement, ETodoState.ACTIVE);
    this.render.removeClass(this.el.nativeElement, ETodoState.COMPLETED);
    this.render.addClass(this.el.nativeElement, state ? ETodoState.ACTIVE : ETodoState.COMPLETED);
  }
}

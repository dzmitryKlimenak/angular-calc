import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { ETodoCssClass } from './todo-manager.interface';

@Directive({
  selector: '[appTodoState]',
})
export class TodoStateDirective implements OnChanges, AfterViewInit {
  @Input() appTodoState: boolean;

  constructor(private el: ElementRef, private render: Renderer2) {}

  ngAfterViewInit(): void {
    this.toggleStateClass(this.appTodoState);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.toggleStateClass(changes['appTodoState']?.currentValue);
  }

  private toggleStateClass(state: boolean): void {
    this.render.removeClass(this.el.nativeElement, ETodoCssClass.ACTIVE);
    this.render.removeClass(this.el.nativeElement, ETodoCssClass.COMPLETED);
    this.render.addClass(
      this.el.nativeElement,
      state ? ETodoCssClass.ACTIVE : ETodoCssClass.COMPLETED,
    );
  }
}

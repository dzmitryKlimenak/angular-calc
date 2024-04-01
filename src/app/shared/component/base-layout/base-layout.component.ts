import { Component } from '@angular/core';
import {
  faArrowCircleLeft,
  faCalculator,
  faHome,
  faTasks,
} from '@fortawesome/free-solid-svg-icons';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons/faArrowCircleRight';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss'],
})
export class BaseLayoutComponent {
  protected readonly faCalculator = faCalculator;

  protected readonly faTasks = faTasks;

  protected readonly faHome = faHome;

  protected readonly faArrowCircleRight = faArrowCircleRight;

  protected readonly faArrowCircleLeft = faArrowCircleLeft;
}

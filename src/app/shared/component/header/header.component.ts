import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { faArrowLeft, faCalculator, faHome, faTasks } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  protected readonly faArrowLeft = faArrowLeft;

  protected readonly faHome = faHome;

  protected readonly faCalculator = faCalculator;

  protected readonly faTasks = faTasks;

  constructor(private location: Location) {}

  public goBack(): void {
    this.location.back();
  }
}

import { Component } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  protected readonly faHome = faHome;

  constructor(private router: Router) {}

  public goHome(): void {
    this.router.navigate(['/']);
  }
}

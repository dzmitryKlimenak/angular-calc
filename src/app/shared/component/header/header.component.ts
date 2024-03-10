import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { faArrowLeft, faCalculator, faHome, faTasks } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { LoadingService } from '../../service/loading.service';

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

  loading$: Observable<boolean> = this.loadingService.loading$;

  constructor(private location: Location, private loadingService: LoadingService) {}

  public goBack(): void {
    this.location.back();
  }
}

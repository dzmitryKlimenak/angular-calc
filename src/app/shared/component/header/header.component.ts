import { Component, HostBinding } from '@angular/core';
import { Location } from '@angular/common';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { LoadingService } from '../../service/loading.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  protected readonly faArrowLeft = faArrowLeft;

  @HostBinding('class') classList = 'relative';

  loading$: Observable<boolean> = this.loadingService.loading$;

  constructor(private location: Location, private loadingService: LoadingService) {}

  public goBack(): void {
    this.location.back();
  }
}

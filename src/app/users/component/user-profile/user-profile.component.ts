import { Component, OnInit } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { IUserData } from '../../../shared/interface';
import { UsersService } from '../../users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  public user$: Observable<IUserData>;

  constructor(private userService: UsersService, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.user$ = this.router.params.pipe(
      map((params) => params['id']),
      switchMap((id) => this.userService.fetchUser(id)),
    );
  }
}

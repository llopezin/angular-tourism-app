import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import User from 'src/app/shared/models/user.model';
import { logUserOut } from 'src/app/shared/store/user-store/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private userStore: Store<AppState>) {}
  public user: User;

  ngOnInit(): void {
    this.userStore.select('usersApp').subscribe((userResponse) => {
      this.user = userResponse.user;
    });
  }

  logOut() {
    this.userStore.dispatch(logUserOut());

    //Avoid reloading when log out at home component
    if (this.router.url === '/home') {
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
    }

    this.router.navigate(['/']);
  }
}

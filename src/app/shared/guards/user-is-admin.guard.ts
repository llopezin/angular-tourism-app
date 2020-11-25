import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { StoreUserService } from '../services/store-user.service';

@Injectable({
  providedIn: 'root',
})
export class adminGuard implements CanActivate {
  constructor(
    private storeUserService: StoreUserService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    let canActivate = this.store.select('usersApp').pipe(
      map((userResponse) => {
        let user = userResponse.user;

        if (user.isAdmin == true) {
          return true;
        }

        console.log('Access denied');
        this.router.navigate(['/home']);
        return false;
      })
    );
    return canActivate;
  }
}

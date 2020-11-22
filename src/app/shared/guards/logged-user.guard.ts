import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import User from '../models/user.model';
import { StoreUserService } from '../services/store-user.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedUserGuard implements CanActivate {
  public user: User;
  constructor(private userStore: Store<AppState>, private router: Router) {}

  canActivate(): any {
    return true;
  }

  activate(): boolean {
    if (this.user) {
      return true;
    } else {
      this.router.navigate(['login']);
      console.log('Access denied');
      return false;
    }
  }
}

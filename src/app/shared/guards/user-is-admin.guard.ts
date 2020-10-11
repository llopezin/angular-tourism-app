import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { StoreUserService } from '../services/store-user.service';

@Injectable({
  providedIn: 'root',
})
export class adminGuard implements CanActivate {
  constructor(
    private storeUserService: StoreUserService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.storeUserService.user.isAdmin == true) {
      return true;
    }

    this.router.navigate(['home']);
    return false;
  }
}

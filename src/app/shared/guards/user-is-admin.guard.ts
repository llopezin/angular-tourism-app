import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
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

  canActivate(): boolean {
    /*   this.store.select("usersApp").subscribe( userResponse=>
      if(userResponse.user.isAdmin){ return true}else{
        this.router.navigate(["/home"])
      };
     
      )  */
    return true;
  }
}

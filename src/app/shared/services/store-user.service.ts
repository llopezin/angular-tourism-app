import { Injectable } from '@angular/core';
import User from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class StoreUserService {
  private _user: User;
  constructor() {}

  set user(user: User) {
    this._user = user;
  }

  get user() {
    return this._user;
  }
}

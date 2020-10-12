import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  private _logout: boolean;
  constructor() {}

  set logout(logout: boolean) {
    this._logout = logout;
  }

  get logout() {
    return this._logout;
  }
}

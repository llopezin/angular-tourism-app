import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import User from '../models/user.model';
import { Observable, of, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = 'api/heroes'; // URL to web api
  constructor(private http: HttpClient) {}

  /** GET users from the server */
  getUSers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }
}

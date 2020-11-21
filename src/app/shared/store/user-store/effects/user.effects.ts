import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getAllUsers, getAllUsersSuccess, getAllUsersError } from '../actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((users) => getAllUsersSuccess({ users: users })),
          catchError((err) => of(getAllUsersError({ payload: err })))
        )
      )
    )
  );
}

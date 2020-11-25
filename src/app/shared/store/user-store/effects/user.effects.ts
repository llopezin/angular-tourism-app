import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getAllUsers,
  getAllUsersSuccess,
  getAllUsersError,
  signUserIn,
  createUser,
} from '../actions';
import { mergeMap, map, catchError, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { StoreUserService } from 'src/app/shared/services/store-user.service';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private storeUserService: StoreUserService
  ) {}

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

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUser),
      exhaustMap((action) =>
        this.userService.createUser(action.user).pipe(
          map((user) => createUserSuccess({ user: user })),
          catchError((error) => createUserError({ payload: error }))
        )
      )
    )
  );

  editUser$;
}

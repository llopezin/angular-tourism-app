import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getAllUsers,
  getAllUsersSuccess,
  getAllUsersError,
  signUserIn,
  createUser,
  createUserSuccess,
  createUserError,
  editUser,
  editUserSuccess,
  editUserError,
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
      mergeMap((action) =>
        this.userService.createUser(action.user).pipe(
          map((user) => createUserSuccess({ user: user })),
          catchError((err) => of(createUserError({ payload: err })))
        )
      )
    )
  );

  /*   editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editUser),
      mergeMap((action) =>
        this.userService.updateUser(action.user, action.id).pipe(
          map((user) => editUserSuccess({ user: user })),
          catchError((err) => of(editUserError({ payload: err })))
        )
      )
    )
  ); */
}

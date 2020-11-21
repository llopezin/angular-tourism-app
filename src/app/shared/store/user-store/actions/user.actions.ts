import { createAction, props } from '@ngrx/store';
import User from 'src/app/shared/models/user.model';

export const getAllUsers = createAction('[USER] Get All');

export const getAllUsersSuccess = createAction(
  '[USER] Get All Success',
  props<{ users: User[] }>()
);

export const getAllUsersError = createAction(
  '[USER] Get All Error',
  props<{ payload: any }>()
);

export const editUser = createAction(
  '[USER] edit user',
  props<{ id: number; editedUser: User }>()
);

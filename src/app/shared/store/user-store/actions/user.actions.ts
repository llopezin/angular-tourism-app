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
  '[USER] Edit User',
  props<{ id: number; editedUser: User }>()
);

export const createUser = createAction(
  '[USER] Create User',
  props<{ user: User }>()
);

export const signUserIn = createAction('[USER] Sign In', props<{ user }>());

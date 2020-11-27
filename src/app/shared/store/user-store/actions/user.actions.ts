import { createAction, props } from '@ngrx/store';
import { Education } from 'src/app/shared/models/education';
import { Language } from 'src/app/shared/models/language';
import User from 'src/app/shared/models/user.model';

//Get Users
export const getAllUsers = createAction('[USER] Get All');

export const getAllUsersSuccess = createAction(
  '[USER] Get All Success',
  props<{ users: User[] }>()
);

export const getAllUsersError = createAction(
  '[USER] Get All Error',
  props<{ payload: any }>()
);

//Edit Users
export const editUser = createAction(
  '[USER] Edit User',
  props<{ id: number; editedUser: User }>()
);

export const editUserSuccess = createAction(
  '[USER] Edit User Success',
  props<{ editedUser: User }>()
);

export const editUserError = createAction(
  '[USER] Edit User Error',
  props<{ payload: any }>()
);

//Create User
export const createUser = createAction(
  '[USER] Create User',
  props<{ user: User }>()
);

export const createUserSuccess = createAction(
  '[USER] Create User Success',
  props<{ user: User }>()
);

export const createUserError = createAction(
  '[USER] Create User Error',
  props<{ payload: any }>()
);

//Login
export const signUserIn = createAction('[USER] Sign In', props<{ user }>());
export const logUserOut = createAction('[USER] Log out');

//User Activities
export const removeActivityFromUser = createAction(
  '[USER] remove activity',
  props<{ activityId: number }>()
);

//User Languages
/* export const removeLanguage = createAction(
  '[USER] remove language',
  props<{ languageId: number }>()
); */

export const addLanguage = createAction(
  '[USER] add language',
  props<{ language: Language }>()
);

export const editLanguage = createAction(
  '[USER] edit language',
  props<{ id: number; editedLanguage: Language }>()
);

//User Education
export const removeEducation = createAction(
  '[USER] remove language',
  props<{ educationId: number }>()
);

export const addEducation = createAction(
  '[USER] add education',
  props<{ education: Education }>()
);

export const editEducation = createAction(
  '[USER] edit edication',
  props<{ id: number; editedEducation: Education }>()
);

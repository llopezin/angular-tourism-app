import { createAction, props } from '@ngrx/store';
import { Education } from 'src/app/shared/models/education';
import { Language } from 'src/app/shared/models/language';
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

export const logUserOut = createAction('[USER] Log out');

export const removeActivityFromUser = createAction(
  '[USER] remove activity',
  props<{ activityId: number }>()
);

export const removeLanguage = createAction(
  '[USER] remove language',
  props<{ languageId: number }>()
);

export const addLanguage = createAction(
  '[USER] add language',
  props<{ language: Language }>()
);

export const editLanguage = createAction(
  '[USER] edit language',
  props<{ id: number; editedLanguage: Language }>()
);

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

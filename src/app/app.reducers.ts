import { ActionReducerMap } from '@ngrx/store';
import * as activityReducers from './shared/store/activities-store/reducers';
import * as userReducers from './shared/store/user-store/reducers';

export interface AppState {
  activitiesApp: activityReducers.ActivitiesState;
  usersApp: userReducers.UsersState;
}

export const appReducers: ActionReducerMap<AppState> = {
  activitiesApp: activityReducers.activitiesReducer,
  usersApp: userReducers.usersReducer,
};

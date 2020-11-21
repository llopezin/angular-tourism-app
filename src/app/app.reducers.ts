import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './shared/store/activities-store/reducers';

export interface AppState {
  activitiesApp: reducers.ActivitiesState;
}

export const appReducers: ActionReducerMap<AppState> = {
  activitiesApp: reducers.activitiesReducer,
};

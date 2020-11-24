import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import Activity from 'src/app/shared/models/activity.model';
import {
  getAllActivities,
  getAllActivitiesError,
  getAllActivitiesSuccess,
  editActivity,
  increaseEnrolledCounter,
  decreaseEnrolledCounter,
  addActivity,
  deleteActivity,
} from '../actions';

export interface ActivitiesState {
  activities: Activity[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: ActivitiesState = {
  activities: [],
  loading: false,
  loaded: false,
  error: null,
};

const _activitiesReducer = createReducer(
  initialState,

  on(getAllActivities, (state) => ({ ...state, loading: true })),

  on(getAllActivitiesSuccess, (state, { activities }) => ({
    ...state,
    loading: false,
    loaded: true,
    activities: [...activities],
  })),

  on(getAllActivitiesError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message,
    },
  })),

  on(editActivity, (state, { id, editedActivity }) => ({
    ...state,
    loading: false,
    loaded: false,
    activities: state.activities.map((activity) => {
      if (activity.id === id) {
        editedActivity.id = id;
        return editedActivity;
      } else {
        return activity;
      }
    }),
  })),

  on(addActivity, (state, { activity }) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      activities: [...state.activities, activity],
    };
  }),

  on(deleteActivity, (state, { id }) => ({
    ...state,
    loading: false,
    loaded: false,
    activities: state.activities.filter((activity) => {
      return activity.id != id;
    }),
  })),

  on(increaseEnrolledCounter, (state, { id }) => ({
    ...state,
    loading: false,
    loaded: false,
    activities: state.activities.map((activity) => {
      if (activity.id === id) {
        let newActivity = { ...activity };
        newActivity.usersEnrolled++;
        return newActivity;
      } else {
        return activity;
      }
    }),
  })),

  on(decreaseEnrolledCounter, (state, { id }) => ({
    ...state,
    loading: false,
    loaded: false,
    activities: state.activities.map((activity) => {
      if (activity.id === id) {
        let newActivity = { ...activity };
        newActivity.usersEnrolled--;
        return newActivity;
      } else {
        return activity;
      }
    }),
  }))
);

export function activitiesReducer(state, action) {
  return _activitiesReducer(state, action);
}

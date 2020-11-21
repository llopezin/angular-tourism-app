import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import Activity from 'src/app/shared/models/activity.model';
import {
  getAllActivities,
  getAllActivitiesError,
  getAllActivitiesSuccess,
  increaseEnrolledCounter,
  decreaseEnrolledCounter,
} from '../actions';

//export const initialState: Todo[] = [new Todo('My First Task')];

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

  on(increaseEnrolledCounter, (state, { id }) => ({
    ...state,
    loading: false,
    loaded: false,
    activities: state.activities.map((activity) => {
      if (activity.id === id) {
        console.log(activity);

        return { ...activity, usersEnrolled: activity.usersEnrolled++ };
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
        console.log(activity);

        return { ...activity, usersEnrolled: activity.usersEnrolled-- };
      } else {
        return activity;
      }
    }),
  }))

  /* 
  on(createTodo, (state, { title }) => ({
    ...state,
    loading: false,
    loaded: false,
    todos: [...state.todos, new Todo(title)],
  })),

  on(completeTodo, (state, { id }) => ({
    ...state,
    loading: false,
    loaded: false,
    todos: state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: true };
      } else {
        return todo;
      }
    }),
  })),

  on(deleteTodo, (state, { id }) => ({
    ...state,
    loading: false,
    loaded: false,
    todos: state.todos.filter((todo) => {
      return todo.id !== id;
    }),
  })),

  on(editTodo, (state, { id, title }) => ({
    ...state,
    loading: false,
    loaded: false,
    todos: state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title: title };
      } else {
        return todo;
      }
    }),
  })),*/
);

export function activitiesReducer(state, action) {
  return _activitiesReducer(state, action);
}

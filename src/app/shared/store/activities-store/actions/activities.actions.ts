import { createAction, props } from '@ngrx/store';
import Activity from '../../../models/activity.model';

export const getAllActivities = createAction('[ACTIVITIES] Get All');

export const getAllActivitiesSuccess = createAction(
  '[ACTIVITIES] Get All Success',
  props<{ activities: Activity[] }>()
);

export const getAllActivitiesError = createAction(
  '[ACTIVITIES] Get All Error',
  props<{ payload: any }>()
);

export const editActivity = createAction(
  '[ACTIVITIES] edit activity',
  props<{ id: number; editedActivity: Activity }>()
);

export const deleteActivity = createAction(
  '[ACTIVITIES] delete activity',
  props<{ id: number }>()
);

export const addActivity = createAction(
  '[ACTIVITIES] add activity',
  props<{ activity: Activity }>()
);

export const increaseEnrolledCounter = createAction(
  '[ACTIVITIES] add to enrolled',
  props<{ id: number }>()
);

export const decreaseEnrolledCounter = createAction(
  '[ACTIVITIES] subtract from enrolled',
  props<{ id: number }>()
);

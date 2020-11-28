import { createAction, props } from '@ngrx/store';
import Activity from '../../../models/activity.model';

//Get Activities
export const getAllActivities = createAction('[ACTIVITIES] Get All');

export const getAllActivitiesSuccess = createAction(
  '[ACTIVITIES] Get All Success',
  props<{ activities: Activity[] }>()
);

export const getAllActivitiesError = createAction(
  '[ACTIVITIES] Get All Error',
  props<{ payload: any }>()
);

//Edit Activities
export const editActivity = createAction(
  '[ACTIVITIES] edit activity',
  props<{ id: number; editedActivity: Activity }>()
);

export const editActivitySuccess = createAction(
  '[USER] edit activity Success',
  props<{ editedActivity: Activity }>()
);

export const editActivityError = createAction(
  '[USER] edit activity Error',
  props<{ payload: any }>()
);

//Delete Activities
export const deleteActivity = createAction(
  '[ACTIVITIES] delete activity',
  props<{ id: number }>()
);

export const deleteActivitySuccess = createAction(
  '[USER] delete activity Success',
  props<{ id: number }>()
);

export const deleteActivityError = createAction(
  '[USER] delete activity Error',
  props<{ payload: any }>()
);

//Add Activities
export const addActivity = createAction(
  '[ACTIVITIES] add activity',
  props<{ activity: Activity }>()
);

export const addActivitySuccess = createAction(
  '[USER] add activity Success',
  props<{ activity: Activity }>()
);

export const addActivityError = createAction(
  '[USER] add activity Error',
  props<{ payload: any }>()
);

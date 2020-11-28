import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getAllActivities,
  getAllActivitiesSuccess,
  getAllActivitiesError,
  addActivity,
  addActivitySuccess,
  addActivityError,
  editActivity,
  editActivitySuccess,
  editActivityError,
  deleteActivity,
  deleteActivitySuccess,
  deleteActivityError,
} from '../actions';
import { ActivitiesService } from '../../../services/activities.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ActivitiesEffects {
  constructor(
    private actions$: Actions,
    private activitiesService: ActivitiesService
  ) {}

  getActivities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllActivities),
      mergeMap(() =>
        this.activitiesService.getActivities().pipe(
          map((activities) =>
            getAllActivitiesSuccess({ activities: activities })
          ),
          catchError((err) => of(getAllActivitiesError({ payload: err })))
        )
      )
    )
  );

  addActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addActivity),
      mergeMap((action) =>
        this.activitiesService.createActivity(action.activity).pipe(
          map((activity) => addActivitySuccess({ activity: activity })),
          catchError((err) => of(addActivityError({ payload: err })))
        )
      )
    )
  );

  editActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editActivity),
      mergeMap((action) =>
        this.activitiesService
          .updateActivity(action.editedActivity, action.id)
          .pipe(
            map((activity) =>
              editActivitySuccess({ editedActivity: activity })
            ),
            catchError((err) => of(editActivityError({ payload: err })))
          )
      )
    )
  );

  deleteActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteActivity),
      mergeMap((action) =>
        this.activitiesService.deleteActivity(action.id).pipe(
          map((activity) => deleteActivitySuccess({ id: activity.id })),
          catchError((err) => of(deleteActivityError({ payload: err })))
        )
      )
    )
  );
}

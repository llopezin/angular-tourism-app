import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getAllActivities,
  getAllActivitiesSuccess,
  getAllActivitiesError,
} from '../actions';
import { ActivitiesService } from '../../../services/activities.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import Activity from 'src/app/shared/models/activity.model';

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
}

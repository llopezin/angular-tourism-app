import { Injectable } from '@angular/core';
import Activity from '../models/activity.model';

@Injectable({
  providedIn: 'root',
})
export class StoreactivitiesService {
  private _activities: Activity[] = [];
  constructor() {}

  set activities(activities: Activity[]) {
    this._activities = activities;
  }

  get activities() {
    return this._activities;
  }
}

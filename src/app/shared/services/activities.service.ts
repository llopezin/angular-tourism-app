import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Activity from '../models/activity.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesService {
  constructor(private http: HttpClient) {}

  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>('api/activities');
  }

  getActivity(id): Observable<Activity> {
    return this.http.get<Activity>(`api/activities/${id}`);
  }

  createActivities(activity: Activity): Observable<Activity[]> {
    return this.http.post<Activity[]>('api/activities', activity);
  }
}

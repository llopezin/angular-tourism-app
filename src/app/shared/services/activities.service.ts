import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Activity from '../models/activity.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>('api/activities');
  }

  getActivity(id): Observable<Activity> {
    return this.http.get<Activity>(`api/activities/${id}`);
  }

  createActivity(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>('api/activities', activity);
  }

  updateActivity(activity: Activity, id: number) {
    activity.id = id;
    return this.http.put<Activity>(
      'api/activities',
      activity,
      this.httpOptions
    );
  }

  deleteActivity(id: number) {
    return this.http.delete<Activity>(`api/activities/${id}`);
  }
}

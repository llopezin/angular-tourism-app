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

  updateActivity(activity: Activity) {
    return this.http.put<Activity[]>('api/activities', activity);
  }

  updateEnrrolled(id: number, action: string) {
    const amount = (() => {
      return action === 'add' ? 1 : -1;
    })();

    this.getActivity(id).subscribe((activity) => {
      activity.usersEnrolled = activity.usersEnrolled + amount;
      this.updateActivity(activity).subscribe((data) => {
        console.log('Updating Activity');
        console.log(data);
      });
    });
  }
}

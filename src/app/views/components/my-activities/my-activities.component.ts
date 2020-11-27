import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import Activity from 'src/app/shared/models/activity.model';
import User from 'src/app/shared/models/user.model';
import { decreaseEnrolledCounter } from 'src/app/shared/store/activities-store/actions';
import {
  editUser,
  removeActivityFromUser,
} from 'src/app/shared/store/user-store/actions';

@Component({
  selector: 'app-my-activities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.sass'],
})
export class MyActivitiesComponent implements OnInit {
  public activities: Array<Activity>;
  public userActivities: Activity[];
  public user: User;
  public activitySelected: Activity;
  public errorMessage;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscribeToUsersStore();
    this.subscribeToActivitesStore();

    if (this.activitiesIsEmpty()) {
      this.errorMessage = true;
      return;
    }
  }

  activitiesIsEmpty() {
    return (
      !this.user.activitiesEnrolled ||
      this.user.activitiesEnrolled?.length === 0
    );
  }

  subscribeToActivitesStore() {
    this.store.select('activitiesApp').subscribe((activitiesResponse) => {
      this.activities = activitiesResponse.activities;
      this.afterActivitiesSet(activitiesResponse.activities);
    });
  }

  subscribeToUsersStore() {
    this.store.select('usersApp').subscribe((usersResponse) => {
      this.user = usersResponse.user;
      this.setUserActivities();
    });
  }

  afterActivitiesSet(activities) {
    this.activities = activities;
    this.setUserActivities();
    this.selectActivity();
  }

  setUserActivities() {
    if (this.activities === undefined) return;
    const ids = this.user.activitiesEnrolled;
    this.userActivities = this.activities.filter((activity) => {
      return ids.indexOf(activity.id) > -1;
    });
  }

  cancelActivity(id: number) {
    this.store.dispatch(
      decreaseEnrolledCounter({ id: this.activitySelected.id })
    );

    this.removeActivityFromUser(id);
    this.selectActivity(0);
  }

  removeActivityFromUser(id: number) {
    this.user.activitiesEnrolled.splice(
      this.user.activitiesEnrolled.indexOf(id),
      1
    );
    this.store.dispatch(editUser({ editedUser: this.user, id: this.user.id }));
  }

  updateEnrrolledAmount() {
    this.activitySelected.usersEnrolled =
      this.activitySelected.usersEnrolled - 1;
  }

  calculateState(activity: Activity) {
    return activity.maxEnrolled - activity.usersEnrolled;
  }

  selectActivity(id?: number) {
    id
      ? (this.activitySelected = this.getActivityById(id))
      : (this.activitySelected = this.userActivities[0]);
  }

  getActivityById(id: number) {
    return this.userActivities.find((activity) => activity.id === id);
  }
}

import { Component, OnInit } from '@angular/core';
import Activity from 'src/app/shared/models/activity.model';
import User from 'src/app/shared/models/user.model';
import { ActivitiesService } from 'src/app/shared/services/activities.service';
import { StoreactivitiesService } from 'src/app/shared/services/store-activities.service';
import { StoreUserService } from 'src/app/shared/services/store-user.service';

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

  constructor(
    private activitiesService: ActivitiesService,
    private storeActivitiesService: StoreactivitiesService,
    private storeUserService: StoreUserService
  ) {}

  ngOnInit(): void {
    this.setLocalUser();
    this.setLocalActivities();
  }

  setLocalUser() {
    this.user = this.storeUserService.user;
  }

  setStoredUser() {
    this.storeUserService.user = this.user;
  }

  setLocalActivities() {
    this.storeActivitiesService.activities.length === 0
      ? this.activitiesService.getActivities().subscribe((activities) => {
          this.afterActivitiesFetched(activities);
        })
      : this.afterActivitiesFetched(this.storeActivitiesService.activities);
  }

  afterActivitiesFetched(activities) {
    this.activities = activities;
    this.setUserActivities();
    this.selectActivity();
  }

  setUserActivities() {
    const ids = this.user.activitiesEnrolled;
    this.userActivities = this.activities.filter((activity) => {
      return ids.indexOf(activity.id) > -1;
    });
  }

  cancelActivity(id: number) {
    this.removeActivityFromUser(id);
    this.updateEnrrolledAmount(id);
  }

  removeActivityFromUser(id: number) {
    this.user.activitiesEnrolled = this.user.activitiesEnrolled.filter(
      (userActivityId) => {
        return userActivityId !== id;
      }
    );

    this.setStoredUser();
    this.setUserActivities();
  }

  updateEnrrolledAmount(id) {
    this.activitiesService.updateEnrrolled(id, 'substract');
  }

  calculateState(activity: Activity) {
    return activity.maxEnrolled - activity.usersEnrolled;
  }

  selectActivity(id?: number) {
    this.activitySelected
      ? (this.activitySelected = this.getActivityById(id))
      : (this.activitySelected = this.userActivities[0]);
  }

  getActivityById(id: number) {
    return this.userActivities.find((activity) => activity.id === id);
  }
}

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
  public errorMessage;

  constructor(
    private activitiesService: ActivitiesService,
    private storeActivitiesService: StoreactivitiesService,
    private storeUserService: StoreUserService
  ) {}

  ngOnInit(): void {
    this.setLocalUser();

    if (this.activitiesIsEmpty()) {
      this.errorMessage = true;
      return;
    }
    this.setLocalActivities();
  }

  activitiesIsEmpty() {
    return (
      !this.user.activitiesEnrolled ||
      this.user.activitiesEnrolled?.length === 0
    );
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
          this.afterActivitiesSet(activities);
          this.storeActivitiesService.activities = activities;
        })
      : this.afterActivitiesSet(this.storeActivitiesService.activities);
  }

  afterActivitiesSet(activities) {
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
    this.updateEnrrolledAmount();
    this.activitiesService
      .updateActivity(this.activitySelected)
      .subscribe(() => {
        this.updateStoredActivities();
        this.removeActivityFromUser(id);
        this.setStoredUser();
        this.setUserActivities();
        this.selectActivity(0);
      });
  }

  updateStoredActivities() {
    this.activitiesService.getActivities().subscribe((activities) => {
      this.storeActivitiesService.activities = activities;
      this.activities = activities;
      this.setUserActivities();
    });
  }

  removeActivityFromUser(id: number) {
    this.user.activitiesEnrolled = this.user.activitiesEnrolled.filter(
      (userActivityId) => {
        return userActivityId !== id;
      }
    );
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

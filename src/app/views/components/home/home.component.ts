import { Component, OnInit } from '@angular/core';
import Activity from 'src/app/shared/models/activity.model';
import User from 'src/app/shared/models/user.model';
import { ActivitiesService } from 'src/app/shared/services/activities.service';
import { StorageService } from 'src/app/shared/services/local-storage-service';
import { StoreUserService } from 'src/app/shared/services/store-user.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  public activities: Activity[];
  public activitySelected: Activity;
  public user: User;
  public showErrorMsg: boolean;
  public showSuccessMsg: boolean;
  public favouriteError: boolean;
  public favouriteSuccess: boolean;

  constructor(
    private activityService: ActivitiesService,
    private storeUserService: StoreUserService,
    private userService: UserService,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.user = this.storeUserService.user;

    this.activityService.getActivities().subscribe((activities) => {
      this.activities = activities;
      this.selectActivity();
    });
  }

  signUpToActivity(id) {
    this.handleAlreadySignedUpError(id);
    this.user.activitiesEnrolled.push(id);
    this.userService.updateUser(this.user).subscribe(() => {
      this.storeUserService.user = this.user;
      this.showSuccessMsg = true;
      this.updateActivityEnrolledCounter();
    });
  }

  addToFavourites(id) {
    this.resetErrorMessages();
    this.storage.add(id, 'favourites')
      ? (this.favouriteSuccess = true)
      : (this.favouriteError = true);
  }

  activityIsSignedUp(id) {
    return this.user.activitiesEnrolled.indexOf(id) > -1;
  }

  calculateState(activity: Activity) {
    if (!activity) return;
    return activity.maxEnrolled - activity.usersEnrolled;
  }

  selectActivity(id?: number) {
    this.resetErrorMessages();
    this.activitySelected
      ? (this.activitySelected = this.getActivityById(id))
      : (this.activitySelected = this.activities[0]);
  }

  resetErrorMessages() {
    this.showErrorMsg = false;
    this.showSuccessMsg = false;
    this.favouriteError = false;
    this.favouriteSuccess = false;
  }

  getActivityById(id: number) {
    return this.activities.find((activity) => activity.id === id);
  }

  updateActivityEnrolledCounter() {
    const activity = this.activitySelected;
    activity.usersEnrolled++;
    this.activityService.updateActivity(activity);
  }

  handleAlreadySignedUpError(id) {
    const isSignedUp = this.activityIsSignedUp(id);
    this.showErrorMsg = isSignedUp;
    if (isSignedUp) return;
  }
}

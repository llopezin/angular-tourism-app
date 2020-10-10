import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Activity from '../../../../shared/models/activity.model';
import { ActivitiesService } from 'src/app/shared/services/activities.service';
import { StoreactivitiesService } from 'src/app/shared/services/store-activities.service';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.sass'],
})
export class ActivitiesListComponent implements OnInit {
  public activities: Activity[];
  public selectedActivitiesId: number;

  @Output() ActivitiesEvent = new EventEmitter<number>();

  constructor(
    private storeActivitiesService: StoreactivitiesService,
    private activitiesService: ActivitiesService
  ) {}

  ngOnInit(): void {
    this.setLocalActivities();
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
  }

  updateActivity(id) {
    this.selectedActivitiesId = id;
    this.ActivitiesEvent.emit(this.selectedActivitiesId);
  }

  addActivity() {
    this.ActivitiesEvent.emit(0);
  }

  deleteActivity(id) {
    this.activitiesService.deleteActivity(id).subscribe(() => {
      const index = this.getActivitiesIndexById(id);
      this.activities.splice(index, 1);
      this.storeActivitiesService.activities = this.activities;
    });
  }

  getActivitiesIndexById(id: number): any {
    let index;
    this.activities.forEach((activities, i) => {
      if (activities.id == id) {
        index = i;
      }
    });
    return index;
  }

  calculateState(activity) {
    return activity.state
      ? activity.state
      : activity.maxEnrolled - activity.usersEnrolled;
  }
}

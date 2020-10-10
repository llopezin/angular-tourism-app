import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Activity } from 'src/app/shared/models/activity.model';
import { ActivitiesService } from 'src/app/shared/services/activities.service';
import { StoreactivitiesService } from 'src/app/shared/services/store-activities.service';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.sass'],
})
export class activitiesListComponent implements OnInit {
  public activities: Activity;
  public selectedActivitiesId: number;

  @Output() activitiesEvent = new EventEmitter<number>();

  constructor(
    private storeActivitiesService: StoreactivitiesService,
    private activitiesService: ActivitiesService
  ) {}

  ngOnInit(): void {
    this.activities = this.storeActivitiesService.activities;
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

  updateactivity(id) {
    this.selectedActivitiesId = id;
    this.activitiesEvent.emit(this.selectedActivitiesId);
  }

  addActivity() {
    this.activitiesEvent.emit(0);
  }

  deleteactivity(id) {
    this.activitiesService.deleteActivity(id);
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
}

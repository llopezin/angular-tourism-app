import { Component, OnInit } from '@angular/core';
import Activity from 'src/app/shared/models/activity.model';
import { ActivitiesService } from 'src/app/shared/services/activities.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  public activities: Activity[];
  public activitySelected: Activity;

  constructor(private activityService: ActivitiesService) {}

  ngOnInit(): void {
    this.activityService.getActivities().subscribe((activities) => {
      this.activities = activities;
      this.selectActivity();
    });
  }

  calculateState(activity: Activity) {
    if (!activity) return;
    return activity.maxEnrolled - activity.usersEnrolled;
  }

  selectActivity(id?: number) {
    this.activitySelected
      ? (this.activitySelected = this.getActivityById(id))
      : (this.activitySelected = this.activities[0]);
  }

  getActivityById(id: number) {
    return this.activities.find((activity) => activity.id === id);
  }
}

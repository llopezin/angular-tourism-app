import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Activity from '../../../../shared/models/activity.model';
import { ActivitiesService } from 'src/app/shared/services/activities.service';
import { StoreactivitiesService } from 'src/app/shared/services/store-activities.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { deleteActivity } from 'src/app/shared/store/activities-store/actions';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.sass'],
})
export class ActivitiesListComponent implements OnInit {
  public activities: Activity[];
  public selectedActivityId: number;

  @Output() ActivitiesEvent = new EventEmitter<number>();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscribeToActivitiesStore();
  }

  subscribeToActivitiesStore() {
    this.store
      .select('activitiesApp')
      .subscribe(
        (activitiesResponse) =>
          (this.activities = activitiesResponse.activities)
      );
  }

  updateActivity(id) {
    this.selectedActivityId = id;
    this.ActivitiesEvent.emit(this.selectedActivityId);
  }

  addActivity() {
    this.ActivitiesEvent.emit(0);
  }

  deleteActivity(id) {
    this.store.dispatch(deleteActivity({ id: id }));
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
    if (activity.state === true) {
      return 'cancelled';
    }
    let state = activity.maxEnrolled - activity.usersEnrolled;
    return state > 0 ? state : 'completed';
  }
}

import { Component, OnInit } from '@angular/core';
import Activity from 'src/app/shared/models/activity.model';
import { ActivitiesService } from 'src/app/shared/services/activities.service';
import { StorageService } from 'src/app/shared/services/local-storage-service';
import { StoreactivitiesService } from 'src/app/shared/services/store-activities.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.sass'],
})
export class FavouritesComponent implements OnInit {
  public favouritesIds: number[];
  public favouriteActivities: Activity[];
  public errorMessage: boolean;
  public activitySelected: Activity;

  constructor(
    private storage: StorageService,
    private storeActivitiesService: StoreactivitiesService,
    private activitiesService: ActivitiesService
  ) {}

  ngOnInit(): void {
    this.favouritesIds = this.storage.get('favourites');
    this.handleEmptyArray();
    this.activitiesAreStored()
      ? this.setActivitiesFromService()
      : this.fetchActivities();
  }

  activitiesAreStored() {
    return this.storeActivitiesService.activities?.length > 0;
  }

  setActivitiesFromService() {
    this.favouriteActivities = this.filterFavouriteActivities(
      this.storeActivitiesService.activities
    );
    this.selectActivity();
  }

  fetchActivities() {
    this.activitiesService.getActivities().subscribe((activities) => {
      this.favouriteActivities = this.filterFavouriteActivities(activities);
      this.selectActivity();
    });
  }

  filterFavouriteActivities(activities) {
    const ids = this.favouritesIds;
    return activities.filter((activity) => {
      return ids.indexOf(activity.id) > -1;
    });
  }

  handleEmptyArray() {
    if (!this.favouritesIds || this.favouritesIds.length === 0) {
      this.errorMessage = true;
      return;
    }
  }

  selectActivity(id?: number) {
    id
      ? (this.activitySelected = this.getActivityById(id))
      : (this.activitySelected = this.favouriteActivities[0]);
  }

  getActivityById(id: number) {
    return this.favouriteActivities.find((activity) => activity.id === id);
  }

  calculateState(activity: Activity) {
    return activity.maxEnrolled - activity.usersEnrolled;
  }
}

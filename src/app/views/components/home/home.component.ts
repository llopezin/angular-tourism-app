import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from 'src/app/shared/services/activities.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  constructor(private activityService: ActivitiesService) {}

  ngOnInit(): void {
    this.activityService.getActivities().subscribe((data) => console.log(data));
  }
}

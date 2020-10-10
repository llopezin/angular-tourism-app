import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ActivitiesListComponent } from './activities-list/activities-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule],
  declarations: [AdminComponent, ActivitiesListComponent],
})
export class AdminModule {}

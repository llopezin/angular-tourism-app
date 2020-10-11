import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedUserGuard } from 'src/app/shared/guards/logged-user.guard';
import { LayoutComponent } from '../layout/layout.component';
import { MyActivitiesComponent } from './my-activities.component';

const routes: Routes = [
  {
    path: 'my-activities',
    component: LayoutComponent,
    children: [{ path: '', component: MyActivitiesComponent }],
    canActivate: [LoggedUserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyActivitiesRoutingModule {}

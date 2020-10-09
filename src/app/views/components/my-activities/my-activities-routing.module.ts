import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { MyActivitiesComponent } from './my-activities.component';

const routes: Routes = [
  {
    path: 'my-activities',
    component: LayoutComponent,
    children: [{ path: '', component: MyActivitiesComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyActivitiesRoutingModule {}

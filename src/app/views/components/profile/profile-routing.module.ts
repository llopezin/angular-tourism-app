import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedUserGuard } from 'src/app/shared/guards/logged-user.guard';
import { LayoutComponent } from '../layout/layout.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path: 'profile',
    component: LayoutComponent,
    children: [{ path: '', component: ProfileComponent }],
    canActivate: [LoggedUserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}

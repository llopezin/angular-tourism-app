import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { adminGuard } from 'src/app/shared/guards/user-is-admin.guard';
import { LayoutComponent } from '../layout/layout.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    children: [{ path: '', component: AdminComponent }],
    canActivate: [adminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

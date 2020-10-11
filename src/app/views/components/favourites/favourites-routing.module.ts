import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedUserGuard } from 'src/app/shared/guards/logged-user.guard';
import { LayoutComponent } from '../layout/layout.component';
import { FavouritesComponent } from './favourites.component';

const routes: Routes = [
  {
    path: 'favourites',
    component: LayoutComponent,
    children: [{ path: '', component: FavouritesComponent }],
    canActivate: [LoggedUserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavouritesRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavouritesRoutingModule } from './favourites-routing.module';
import { FavouritesComponent } from './favourites.component';

@NgModule({
  imports: [CommonModule, FavouritesRoutingModule],
  declarations: [FavouritesComponent],
})
export class FavouritesModule {}

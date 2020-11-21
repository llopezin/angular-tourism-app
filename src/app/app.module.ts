import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared/services/in-memory-data.service';
import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducers';

import { AdminModule } from './views/components/admin/admin.module';
import { LoginModule } from './views/components/login/login.module';
import { MyActivitiesModule } from './views/components/my-activities/my-activities.module';
import { HomeModule } from './views/components/home/home.module';
import { FavouritesModule } from './views/components/favourites/favourites.module';
import { ProfileModule } from './views/components/profile/profile.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './views/components/layout/header/header.component';
import { FooterComponent } from './views/components/layout/footer/footer.component';
import { LayoutComponent } from './views/components/layout/layout.component';
import { RegisterModule } from './views/components/register/register.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { EffectsArray } from './shared/store/activities-store/effects';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LayoutComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
    //AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducers, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot(EffectsArray),
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),

    AdminModule,
    LoginModule,
    MyActivitiesModule,
    HomeModule,
    ProfileModule,
    RegisterModule,
    FavouritesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

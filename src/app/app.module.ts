import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared/services/in-memory-data.service';
import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AdminModule } from './views/components/admin/admin.module';
import { LoginModule } from './views/components/login/login.module';
import { MyActivitiesModule } from './views/components/my-activities/my-activities.module';
import { HomeModule } from './views/components/home/home.module';
import { ProfileModule } from './views/components/profile/profile.module';

import { AppComponent } from './app.component';
import { FavouritesComponent } from './views/components/favourites/favourites.component';
import { LogoutComponent } from './views/components/logout/logout.component';
import { HeaderComponent } from './views/components/layout/header/header.component';
import { FooterComponent } from './views/components/layout/footer/footer.component';
import { LayoutComponent } from './views/components/layout/layout.component';
import { RegisterModule } from './views/components/register/register.module';

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
    LogoutComponent,
    FavouritesComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    //AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

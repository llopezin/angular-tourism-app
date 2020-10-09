import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InMemoryDataService } from './shared/services/in-memory-data.service';
import { LoginComponent } from './views/components/login/login.component';
import { HomeComponent } from './views/components/home/home.component';
import { RegisterComponent } from './views/components/register/register.component';
import { FavouritesComponent } from './views/components/favourites/favourites.component';
import { ProfileComponent } from './views/components/profile/profile.component';
import { AdminComponent } from './views/components/admin/admin.component';
import { MyActivitiesComponent } from './views/components/my-activities/my-activities.component';
import { LogoutComponent } from './views/components/logout/logout.component';
import { HeaderComponent } from './views/components/header/header.component';
import { FooterComponent } from './views/components/footer/footer.component';
import { EducationFormComponent } from './views/components/profile/education-form/education-form.component';
import { LanguageFormComponent } from './views/components/profile/language-form/language-form.component';
import { LanguageListComponent } from './views/components/profile/language-form/language-list/language-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    FavouritesComponent,
    ProfileComponent,
    AdminComponent,
    MyActivitiesComponent,
    LogoutComponent,
    HeaderComponent,
    FooterComponent,
    EducationFormComponent,
    LanguageFormComponent,
    LanguageListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

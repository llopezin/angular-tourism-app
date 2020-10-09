import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { RegisterComponent } from '../register/register.component';
import { FavouritesComponent } from '../favourites/favourites.component';
import { ProfileComponent } from '../profile/profile.component';
import { AdminComponent } from '../admin/admin.component';
import { MyActivitiesComponent } from '../my-activities/my-activities.component';
import { LogoutComponent } from '../logout/logout.component';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { EducationFormComponent } from '../profile/education-form/education-form.component';
import { EducationListComponent } from '../profile/education-form/education-list/education-list.component';
import { LanguageFormComponent } from '../profile/language-form/language-form.component';
import { LanguageListComponent } from '../profile/language-form/language-list/language-list.component';
import { LayoutComponent } from '../layout/layout.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, LayoutComponent],
  imports: [BrowserModule, CommonModule, RouterModule.forChild([])],
  providers: [],
})
export class LayoutModule {}

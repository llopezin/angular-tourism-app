import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { LanguageFormComponent } from './language-form/language-form.component';
import { EducationFormComponent } from './education-form/education-form.component';
import { EducationListComponent } from './education-form/education-list/education-list.component';
import { LanguageListComponent } from './language-form/language-list/language-list.component';

@NgModule({
  imports: [CommonModule, ProfileRoutingModule, ReactiveFormsModule],
  declarations: [
    ProfileComponent,
    LanguageFormComponent,
    LanguageListComponent,
    EducationFormComponent,
    EducationListComponent,
  ],
})
export class ProfileModule {}

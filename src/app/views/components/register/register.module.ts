import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, RegisterRoutingModule, ReactiveFormsModule],
  declarations: [RegisterComponent],
})
export class RegisterModule {}

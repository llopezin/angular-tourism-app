import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import User from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { StoreUserService } from 'src/app/shared/services/store-user.service';
import { Router } from '@angular/router';
import { checkNIF } from 'src/app/shared/directives/custom-validators/NIF.validator';
import { EducationFormComponent } from './education-form/education-form.component';
import { LanguageFormComponent } from './language-form/language-form.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnInit {
  public user: User;
  public name: FormControl;
  public surname: FormControl;
  public date: FormControl;
  public phone: FormControl;
  public nationality: FormControl;
  public NIF: FormControl;
  public aboutMe: FormControl;
  public updateProfileForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private storeUserService: StoreUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(55),
      Validators.pattern('^[a-zA-Z-]+$'),
    ]);
    this.surname = new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(55),
      Validators.pattern('^[a-zA-Z-]+$'),
    ]);

    this.date = new FormControl('', [
      Validators.pattern(/([12]\d{3}-\d{2}-\d{2})/),
      Validators.maxLength(10),
    ]);

    this.phone = new FormControl('');

    this.nationality = new FormControl('');
    this.NIF = new FormControl('', [checkNIF.NIFisValid]);
    this.aboutMe = new FormControl('');

    this.updateProfileForm = this.formBuilder.group({
      name: this.name,
      surname: this.surname,
      date: this.date,
      phone: this.phone,
      nationality: this.nationality,
      NIF: this.NIF,
      aboutMe: this.aboutMe,
    });
  }

  onSubmit() {
    this.saveFormInput();
    this.userService.updateUser(this.user).subscribe((data) => {
      this.updateStoredUser();
      this.navigateHome();
    });
  }

  navigateHome() {
    this.router.navigate(['']);
  }

  updateStoredUser() {
    this.storeUserService.user = this.user;
  }

  saveFormInput() {
    this.user = {
      ...this.storeUserService.user,
      ...this.updateProfileForm.value,
    };
  }
}

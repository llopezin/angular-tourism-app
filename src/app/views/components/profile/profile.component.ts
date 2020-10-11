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
  public companyName: FormControl;
  public companyDescription: FormControl;
  public CIF: FormControl;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private storeUserService: StoreUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateLocalUser();
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

    if (this.user.isAdmin) {
      this.createAdminControls();
    }
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

  updateLocalUser() {
    this.user = this.storeUserService.user;
  }

  saveFormInput() {
    this.user = {
      ...this.user,
      ...this.updateProfileForm.value,
    };
  }

  createAdminControls() {
    this.companyName = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(55),
      Validators.pattern('^[^-s][a-zA-Z0-9_s-]+$'),
    ]);
    this.CIF = new FormControl('', Validators.required);
    this.companyDescription = new FormControl('');
    this.addAdminControls();
  }

  addAdminControls() {
    this.updateProfileForm.addControl('CIF', this.CIF);
    this.updateProfileForm.addControl('companyName', this.companyName);
    this.updateProfileForm.addControl(
      'companyDescription',
      this.companyDescription
    );
  }
}

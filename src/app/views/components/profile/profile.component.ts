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
  public userValidated: boolean;
  public formSubmited: boolean = false;
  public patterns: any = {
    NIF: '^[a-z0-9+_.-]+@[a-z]+.[a-z]+$',
    name: '^[a-zA-Z-]+$',
  };

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private storeUserService: StoreUserService,
    private router: Router
  ) {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(55),
      Validators.pattern(this.patterns.name),
    ]);
    this.surname = new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(55),
      Validators.pattern(this.patterns.name),
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

  ngOnInit(): void {}

  onSubmit() {
    this.formSubmited = true;
    this.saveFormInput();
    this.userService
      .getUsers()
      .subscribe((users) => this.handleResponse(users));
  }

  handleResponse(users: User[]) {
    let userValid = this.isNewUser(users);
    this.userValidated = userValid;
    userValid ? this.afterUserValid(this.user) : '';
  }

  afterUserValid(user: User) {
    this.postUser();
    this.storeUserService.user = user;
    this.navigateHome();
  }

  navigateHome() {
    this.router.navigate(['']);
  }

  isNewUser(users: User[]) {
    return !users.some((user) => user.NIF === this.user.NIF);
  }

  postUser() {
    this.userService.createUser(this.user).subscribe((data) => {
      console.log(data);
    });
  }

  saveFormInput() {
    this.user = this.updateProfileForm.value;
  }
}

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import User from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { MatchingFields } from 'src/app/shared/directives/custom-validators/matchingFields.validator';
import { StoreUserService } from 'src/app/shared/services/store-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit {
  public user: User;
  public name: FormControl;
  public surname: FormControl;
  public type: FormControl;
  public email: FormControl;
  public password: FormControl;
  public passwordRepeat: FormControl;
  public registerForm: FormGroup;
  public userValidated: boolean;
  public formSubmited: boolean = false;
  public patterns: any = {
    email: '^[a-z0-9+_.-]+@[a-z]+.[a-z]+$',
    name: '^[a-zA-Z]+[-a-zA-Zs]+[-a-zA-Z]$',
  };

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
      Validators.pattern(this.patterns.name),
    ]);
    this.surname = new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(55),
      Validators.pattern(this.patterns.name),
    ]);

    this.type = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(this.patterns.email),
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]);
    this.passwordRepeat = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]);

    this.registerForm = this.formBuilder.group(
      {
        name: this.name,
        surname: this.surname,
        isAdmin: this.type,
        email: this.email,
        password: this.password,
        passwordRepeat: this.passwordRepeat,
      },
      { validators: MatchingFields.match([this.password, this.passwordRepeat]) }
    );
  }

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
    userValid ? this.afterUserValid() : '';
  }

  afterUserValid() {
    this.addUserFields();
    this.postUser();
  }

  addUserFields() {
    this.user.education = [];
    this.user.languages = [];
    this.user.activitiesEnrolled = [];
  }

  navigateHome() {
    this.router.navigate(['home']);
  }

  isNewUser(users: User[]) {
    return !users.some((user) => user.email === this.user.email);
  }

  postUser() {
    this.userService.createUser(this.user).subscribe((data) => {
      this.storeUserService.user = data;
      this.navigateHome();
    });
  }

  saveFormInput() {
    delete this.registerForm.value.passwordRepeat;
    this.user = this.registerForm.value;
  }
}

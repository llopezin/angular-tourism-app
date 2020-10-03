import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import User from 'src/app/shared/models/user.model';
import { StoreUserService } from 'src/app/shared/services/store-user.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  public user: User = new User();
  public signInForm: FormGroup;
  public email: FormControl;
  public password: FormControl;
  public userValidated: boolean;
  public formSubmited: boolean;
  public validatedUserData: User;

  constructor(
    private usersService: UserService,
    private formBuilder: FormBuilder,
    private storeUserService: StoreUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9+_.-]+@[a-z]+.[a-z]+$'),
    ]);
    this.password = new FormControl('', [Validators.required]);

    this.signInForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  onSubmit() {
    this.saveFormInput();
    this.formSubmited = true;
    this.usersService
      .getUsers()
      .subscribe((users: User[]) => this.handleResponse(users));
  }

  handleResponse(users: User[]) {
    this.validateUser(users);
    this.storeUserService.user = this.validatedUserData;
  }

  validateUser(users: User[]): void {
    let userFound = users.find((user) => user.email === this.user.email);
    this.userValidated = userFound?.password === this.user.password;
    this.userValidated ? this.afterUserValid(userFound) : '';
  }

  afterUserValid(userFound: User) {
    this.storeUser(userFound);
    this.navigateToMyActivities();
  }

  storeUser(userFound: User) {
    this.validatedUserData = userFound;
  }

  navigateToMyActivities() {
    this.router.navigate(['my-activities']);
  }

  saveFormInput() {
    this.user.email = this.email.value;
    this.user.password = this.password.value;
  }
}

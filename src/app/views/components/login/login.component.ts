import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import User from 'src/app/shared/models/user.model';
import { StoreUserService } from 'src/app/shared/services/store-user.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import {
  getAllUsers,
  signUserIn,
} from 'src/app/shared/store/user-store/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  public user: User = new User();
  public users: User[];
  public signInForm: FormGroup;
  public email: FormControl;
  public password: FormControl;
  public userValidated: boolean;
  public formSubmited: boolean;
  public validatedUserData: User;
  public errorMsg: boolean;
  constructor(
    private usersService: UserService,
    private formBuilder: FormBuilder,
    private storeUserService: StoreUserService,
    private router: Router,
    private store: Store<AppState>
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
    this.store.dispatch(getAllUsers());
    this.store
      .select('usersApp')
      .subscribe((usersResponse) => (this.users = usersResponse.users));
  }

  onSubmit() {
    this.errorMsg = false;
    this.saveFormInput();
    this.formSubmited = true;
    this.validateUser(this.users);
  }

  validateUser(users: User[]): void {
    let userFound = users.find((user) => user.email === this.user.email);
    this.userValidated = userFound?.password === this.user.password;
    this.userValidated
      ? this.afterUserValid(userFound)
      : (this.errorMsg = true);
  }

  afterUserValid(userFound: User) {
    this.storeUser(userFound);
    this.navigateHome();
  }

  storeUser(userFound: User) {
    this.store.dispatch(signUserIn({ user: userFound }));
  }

  navigateHome() {
    this.router.navigate(['home']);
  }

  saveFormInput() {
    this.user.email = this.email.value;
    this.user.password = this.password.value;
  }
}

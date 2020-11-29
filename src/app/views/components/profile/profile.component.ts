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
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { editUser } from 'src/app/shared/store/user-store/actions';

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
  public successMsg: boolean;

  constructor(
    private userService: UserService,
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private storeUserService: StoreUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscribeToUserStore();

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
      Validators.pattern(
        /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])\/([1][9][3-9][0-9]|[2][0][0-2][0])/
      ),
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

    if (this.user.isAdmin == true) {
      this.createAdminControls();
    }
    this.populateFields();
  }

  onSubmit() {
    this.successMsg = false;
    let editedUser = this.buildEditedUser();
    this.store.dispatch(
      editUser({
        id: editedUser.id,
        editedUser: editedUser,
      })
    );

    this.successMsg = true;
  }

  subscribeToUserStore() {
    this.store.select('usersApp').subscribe((userResponse) => {
      this.user = userResponse.user;
    });
  }

  populateFields() {
    this.name.setValue(this.user.name);
    this.user.surname ? this.surname.setValue(this.user.surname) : '';
    this.user.dob ? this.date.setValue(this.user.dob) : '';
    this.user.phone ? this.phone.setValue(this.user.phone) : '';
    this.user.nationality
      ? this.nationality.setValue(this.user.nationality)
      : '';
    this.user.NIF ? this.NIF.setValue(this.user.NIF) : '';
    this.user.description ? this.aboutMe.setValue(this.user.description) : '';
  }

  updateStoredUser() {
    this.storeUserService.user = this.user;
  }

  buildEditedUser() {
    return {
      ...this.user,
      ...this.updateProfileForm.value,
    };
  }

  createAdminControls() {
    this.companyName = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
      Validators.pattern('[a-zA-Z0-9_]+.*$'),
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

  navigateHome() {
    this.router.navigate(['']);
  }
}

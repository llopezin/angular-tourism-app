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

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.sass'],
})
export class EducationComponent implements OnInit {
  public user: User;
  public type: FormControl;
  public level: FormControl;
  public name: FormControl;
  public university: FormControl;
  public finishDate: FormControl;
  public educationForm: FormGroup;

  public levelOptions = {
    grado: ['diplomado', 'licenciado', 'ingeniero', 'máster', 'doctorado'],
    fp: ['grado superior', 'grado medio'],
  };

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private storeUserService: StoreUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.type = new FormControl('', [Validators.required]);
    this.level = new FormControl('', [Validators.required]);
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(55),
    ]);
    this.university = new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(55),
    ]);

    this.finishDate = new FormControl('', [
      Validators.pattern(/([12]\d{3}-\d{2}-\d{2})/),
      Validators.maxLength(10),
    ]);

    this.educationForm = this.formBuilder.group({
      type: this.type,
      level: this.level,
      name: this.name,
      university: this.university,
      finishDate: this.finishDate,
    });
  }

  onSubmit() {}

  navigateHome() {
    this.router.navigate(['']);
  }

  updateStoredUser() {
    this.storeUserService.user.education = this.user.education;
  }

  saveFormInput() {}

  getLevelOptions() {
    return this.type.value === 'grado'
      ? this.levelOptions.grado
      : this.levelOptions.fp;
  }
}

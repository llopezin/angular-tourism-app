import { Component, OnInit } from '@angular/core';
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
  selector: 'app-language-form',
  templateUrl: './language-form.component.html',
  styleUrls: ['./language-form.component.sass'],
})
export class LanguageFormComponent implements OnInit {
  public user: User;
  public languageSelectedId: number;
  public showForm: boolean;
  public showSuccessMsg: boolean;
  public languageForm: FormGroup;
  public language: FormControl;
  public level: FormControl;
  public finishDate: FormControl;
  public levelOptions = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  public languageOptions = [
    'inglés',
    'catalán',
    'español',
    'francés',
    'alemán',
  ];

  constructor(
    private storeUserService: StoreUserService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = this.storeUserService.user;
    this.language = new FormControl('', [Validators.required]);
    this.level = new FormControl('', [Validators.required]);
    this.finishDate = new FormControl('', [
      Validators.pattern(/([12]\d{3}-\d{2}-\d{2})/),
      Validators.maxLength(10),
    ]);

    this.languageForm = this.formBuilder.group({
      language: this.language,
      level: this.level,
      finishDate: this.finishDate,
    });
  }

  onSubmit() {
    this.pushLanguage();
    this.userService.updateUser(this.user).subscribe((data) => {
      this.updateStoredUser();
      this.showForm = false;
      this.showSuccessMsg = true;
    });
  }

  updateStoredUser() {
    this.storeUserService.user = this.user;
  }

  recieveLanguageEvent($event) {
    this.user = this.storeUserService.user;
    this.languageSelectedId = $event;
    if ($event > 0) {
      this.setFormValues();
    }
    this.showForm = true;
    this.showSuccessMsg = false;
  }

  setFormValues() {
    const languageToEdit = this.getlanguageById(this.languageSelectedId);

    this.language.setValue(languageToEdit.language);
    this.level.setValue(languageToEdit.level);
  }

  getlanguageById(id: number) {
    return this.user.languages.find((language) => {
      return language.id == id;
    });
  }

  pushLanguage() {
    let languages = this.user.languages;
    let edited = this.languageSelectedId - 1;
    let newLanguageData = this.languageForm.value;

    edited < 0
      ? this.pushNewLanguage(languages, newLanguageData)
      : this.pushEditedLanguage(languages, edited, newLanguageData);
  }

  pushEditedLanguage(languages, edited, newLanguageData) {
    languages[edited] = {
      ...languages[edited],
      ...newLanguageData,
    };
  }
  pushNewLanguage(languages, newLanguage) {
    newLanguage.id = languages.length + 1;
    languages.push(newLanguage);
  }
}

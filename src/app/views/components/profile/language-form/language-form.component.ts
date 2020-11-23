import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import User from 'src/app/shared/models/user.model';
import { StoreUserService } from 'src/app/shared/services/store-user.service';
import { UserService } from 'src/app/shared/services/user.service';
import {
  addLanguage,
  editLanguage,
} from 'src/app/shared/store/user-store/actions';

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
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.subscribeToUserStore();

    this.language = new FormControl('', [Validators.required]);
    this.level = new FormControl('', [Validators.required]);
    this.finishDate = new FormControl('', [
      Validators.pattern(
        /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])\/([1][9][3-9][0-9]|[2][0][0-2][0])/
      ),
      Validators.maxLength(10),
    ]);

    this.languageForm = this.formBuilder.group({
      language: this.language,
      level: this.level,
      finishDate: this.finishDate,
    });
  }

  onSubmit() {
    let newLanguageData = this.languageForm.value;

    console.log(newLanguageData);

    this.languageSelectedId == 0
      ? this.addLanguage(newLanguageData)
      : this.editLanguage(newLanguageData);

    this.showForm = false;
    this.showSuccessMsg = true;
  }

  addLanguage(newLanguageData) {
    this.store.dispatch(addLanguage({ language: newLanguageData }));
  }

  editLanguage(newLanguageData) {
    this.store.dispatch(
      editLanguage({
        id: this.languageSelectedId,
        editedLanguage: newLanguageData,
      })
    );
  }

  subscribeToUserStore() {
    this.store.select('usersApp').subscribe((userResponse) => {
      this.user = userResponse.user;
    });
  }
  /* updateStoredUser() {
    this.storeUserService.user = this.user;
  } */

  recieveLanguageEvent($event) {
    //this.user = this.storeUserService.user;
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

  /*   pushLanguage() {
    let languages = this.user.languages;
    let edited = this.languageSelectedId - 1;
    let newLanguageData = this.languageForm.value;

    edited < 0
      ? this.pushNewLanguage(languages, newLanguageData)
      : this.pushEditedLanguage(languages, edited, newLanguageData);
  } */

  /*  pushEditedLanguage(languages, edited, newLanguageData) {
    languages[edited] = {
      ...languages[edited],
      ...newLanguageData,
    };
  } */
  /*   pushNewLanguage(languages, newLanguage) {
    newLanguage.id = languages.length + 1 || 1;
    languages.push(newLanguage);
  } */
}

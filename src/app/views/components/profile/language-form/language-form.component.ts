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
import { editUser } from 'src/app/shared/store/user-store/actions';

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
    private formBuilder: FormBuilder
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

    this.languageSelectedId == 0
      ? this.addLanguage(newLanguageData)
      : this.editLanguage(newLanguageData);

    this.showForm = false;
    this.showSuccessMsg = true;
  }

  addLanguage(newLanguageData) {
    newLanguageData.id = this.user.languages.length + 1;
    this.user = {
      ...this.user,
      languages: [...this.user.languages, newLanguageData],
    };
    this.store.dispatch(editUser({ editedUser: this.user, id: this.user.id }));
  }

  editLanguage(newLanguageData) {
    let id = this.languageSelectedId;
    this.user.languages = this.user.languages.map((language) => {
      if (language.id == id) return { ...newLanguageData, id: id };
      return language;
    });

    this.store.dispatch(
      editUser({
        editedUser: this.user,
        id: this.user.id,
      })
    );
  }

  subscribeToUserStore() {
    this.store.select('usersApp').subscribe((userResponse) => {
      this.user = userResponse.user;
    });
  }

  recieveLanguageEvent($event) {
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
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import User from 'src/app/shared/models/user.model';
import { editUser } from 'src/app/shared/store/user-store/actions';

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.sass'],
})
export class LanguageListComponent implements OnInit {
  public user: User;
  public selectedLanguageId: number;

  @Output() languageEvent = new EventEmitter<number>();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('usersApp').subscribe((userResponse) => {
      this.user = userResponse.user;
    });
  }

  updateLanguage(e) {
    this.selectedLanguageId = e.target.dataset.id;
    this.languageEvent.emit(this.selectedLanguageId);
  }

  //language event emiter reused, sends id 0 to trigger
  //add new language functionality on parent
  addLanguage() {
    this.languageEvent.emit(0);
  }

  deleteLanguage(e) {
    let id = e.target.dataset.id;
    this.user.languages = this.user.languages.filter((language) => {
      return language.id != id;
    });

    this.store.dispatch(editUser({ editedUser: this.user, id: this.user.id }));
  }
}

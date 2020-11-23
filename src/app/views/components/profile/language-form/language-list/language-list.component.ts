import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Language } from 'src/app/shared/models/language';
import User from 'src/app/shared/models/user.model';
import { StoreUserService } from 'src/app/shared/services/store-user.service';
import { removeLanguage } from 'src/app/shared/store/user-store/actions';

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

  //language event reused, sends id 0 to trigger
  //new language functionality on parent
  addLanguage() {
    this.languageEvent.emit(0);
  }

  deleteLanguage(e) {
    const id = e.target.dataset.id;
    this.store.dispatch(removeLanguage({ languageId: id }));
  }
}

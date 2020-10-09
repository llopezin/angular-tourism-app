import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Language } from 'src/app/shared/models/language';
import User from 'src/app/shared/models/user.model';
import { StoreUserService } from 'src/app/shared/services/store-user.service';

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.sass'],
})
export class LanguageListComponent implements OnInit {
  public user: User;
  public selectedLanguageId: number;

  @Output() languageEvent = new EventEmitter<number>();

  constructor(private storeUserService: StoreUserService) {}

  ngOnInit(): void {
    this.user = this.storeUserService.user;
  }

  updateLanguage(e) {
    this.selectedLanguageId = e.target.dataset.id;
    this.languageEvent.emit(this.selectedLanguageId);
  }

  addLanguage() {
    this.languageEvent.emit(0);
  }

  deleteLanguage(e) {
    this.updateLocalUser();
    const id = e.target.dataset.id;
    const index = this.getLanguageIndexById(id);
    this.user.languages.splice(index, 1);
    this.updateStoredUser();
  }

  getLanguageIndexById(id: number): any {
    let index;
    this.user.languages.forEach((language, i) => {
      if (language.id == id) {
        index = i;
      }
    });
    return index;
  }

  updateStoredUser() {
    this.storeUserService.user = this.user;
  }

  updateLocalUser() {
    this.user = this.storeUserService.user;
  }
}

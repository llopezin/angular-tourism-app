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
  public languages: Language[];
  public selectedLanguageId: number;

  @Output() languageEvent = new EventEmitter<number>();

  constructor(private storeUserService: StoreUserService) {}

  ngOnInit(): void {
    this.user = this.storeUserService.user;
    this.languages = this.user.languages;
  }

  updateLanguage(e) {
    this.selectedLanguageId = e.target.dataset.id;
    this.languageEvent.emit(this.selectedLanguageId);
  }

  addLanguage() {
    this.languageEvent.emit(0);
  }

  deleteLanguage(e) {
    this.updateUserData();
    const id = e.target.dataset.id;
    const index = this.getlanguageById(id).id - 1;
    this.user.languages = this.user.languages.splice(index, 1);
    this.updateUserData();
  }

  getlanguageById(id: number) {
    return this.user.languages.find((language) => {
      return language.id == id;
    });
  }

  updateUserData() {
    this.updateStoredUser();
    this.updateLocalUser();
  }

  updateStoredUser() {
    this.storeUserService.user = this.user;
  }

  updateLocalUser() {
    this.user = this.storeUserService.user;
    this.languages = this.user.languages;
  }
}

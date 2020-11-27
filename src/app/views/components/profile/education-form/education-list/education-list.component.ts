import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import User from 'src/app/shared/models/user.model';
import { editUser } from 'src/app/shared/store/user-store/actions';

@Component({
  selector: 'app-education-list',
  templateUrl: './education-list.component.html',
  styleUrls: ['./education-list.component.sass'],
})
export class EducationListComponent implements OnInit {
  public user: User;
  public selectededucationId: number;

  @Output() educationEvent = new EventEmitter<number>();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select('usersApp')
      .subscribe((userRespones) => (this.user = userRespones.user));
  }

  updateEducation(e) {
    this.selectededucationId = e.target.dataset.id;
    this.educationEvent.emit(this.selectededucationId);
  }

  addEducation() {
    this.educationEvent.emit(0);
  }

  deleteEducation(e) {
    let id = e.target.dataset.id;
    this.user.education = this.user.education.filter((education) => {
      return education.id != id;
    });

    this.store.dispatch(editUser({ editedUser: this.user, id: this.user.id }));
  }

  getEducationIndexById(id: number): any {
    let index;
    this.user.education.forEach((education, i) => {
      if (education.id == id) {
        index = i;
      }
    });
    return index;
  }
}

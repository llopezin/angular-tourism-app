import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Education } from 'src/app/shared/models/education';
import User from 'src/app/shared/models/user.model';
import { StoreUserService } from 'src/app/shared/services/store-user.service';

@Component({
  selector: 'app-education-list',
  templateUrl: './education-list.component.html',
  styleUrls: ['./education-list.component.sass'],
})
export class EducationListComponent implements OnInit {
  public user: User;
  public selectededucationId: number;

  @Output() educationEvent = new EventEmitter<number>();

  constructor(private storeUserService: StoreUserService) {}

  ngOnInit(): void {
    this.user = this.storeUserService.user;
  }

  updateEducation(e) {
    this.selectededucationId = e.target.dataset.id;
    this.educationEvent.emit(this.selectededucationId);
  }

  addEducation() {
    this.educationEvent.emit(0);
  }

  deleteEducation(e) {
    this.updateLocalUser();
    const id = e.target.dataset.id;
    const index = this.getEducationIndexById(id);
    this.user.education.splice(index, 1);
    this.updateStoredUser();
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

  updateStoredUser() {
    this.storeUserService.user = this.user;
  }

  updateLocalUser() {
    this.user = this.storeUserService.user;
  }
}

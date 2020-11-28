import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import Activity from 'src/app/shared/models/activity.model';
import {
  addActivity,
  editActivity,
} from 'src/app/shared/store/activities-store/actions';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass'],
})
export class AdminComponent implements OnInit {
  public activities: Activity[];
  public activitySelectedId: number;
  public showForm: boolean;
  public showSuccessMsg: boolean;

  public name: FormControl;
  public description: FormControl;
  public language: FormControl;
  public date: FormControl;
  public minEnrolled: FormControl;
  public maxEnrolled: FormControl;
  public usersEnrolled: FormControl;
  public category: FormControl;
  public subcategory: FormControl;
  public price: FormControl;
  public state: FormControl;
  public activityForm: FormGroup;
  public categoryOption = {
    'cultura y patrimonio': [
      'concierto',
      'espectáculo',
      'excursión',
      'festivales',
      'visita guiada',
      'museo',
      'monumento',
    ],
    enoturismo: [
      'bodega',
      'cata de productos',
      'excursión',
      'museo del vino',
      'visita guiada',
    ],
    playas: ['actividad náutica', 'cala', 'concierto', 'excusión', 'taller'],
  };

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.subscribeToActivitiesStore();
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(55),
    ]);
    this.category = new FormControl('', [Validators.required]);
    this.subcategory = new FormControl('', [Validators.required]);
    this.description = new FormControl('');
    this.language = new FormControl('', [Validators.required]);
    this.date = new FormControl('', [
      Validators.pattern(
        /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])\/[2][0][2-9]\d{1}/
      ),
      Validators.maxLength(10),
    ]);
    this.price = new FormControl('', [Validators.required, Validators.min(0)]);
    this.minEnrolled = new FormControl('', [
      Validators.required,
      Validators.min(0),
    ]);
    this.maxEnrolled = new FormControl('', [
      Validators.required,
      Validators.min(0),
    ]);
    this.state = new FormControl();

    this.activityForm = this.formBuilder.group({
      name: this.name,
      category: this.category,
      subcategory: this.subcategory,
      description: this.description,
      language: this.language,
      date: this.date,
      minEnrolled: this.minEnrolled,
      maxEnrolled: this.maxEnrolled,
      usersEnrolled: this.usersEnrolled,
      price: this.price,
      state: this.state,
    });
  }

  onSubmit() {
    this.activitySelectedId === 0 ? this.createActivity() : this.editActivity();

    this.showForm = false;
    this.showSuccessMsg = true;
  }

  subscribeToActivitiesStore() {
    this.store.select('activitiesApp').subscribe((activitesResponse) => {
      this.activities = activitesResponse.activities;
    });
  }

  createActivity() {
    this.store.dispatch(addActivity({ activity: this.activityForm.value }));
  }

  editActivity() {
    this.store.dispatch(
      editActivity({
        id: this.activitySelectedId,
        editedActivity: this.activityForm.value,
      })
    );
  }

  recieveActivitiesEvent($event) {
    this.activitySelectedId = $event;
    if ($event > 0) {
      this.setFormValues();
    }
    this.showForm = true;
    this.showSuccessMsg = false;
  }

  setFormValues() {
    const activityToEdit = this.getActivityById(this.activitySelectedId);
    this.name.setValue(activityToEdit.name);
    this.category.setValue(activityToEdit.category);
    this.subcategory.setValue(activityToEdit.subcategory);
    this.description.setValue(activityToEdit.description);
    this.language.setValue(activityToEdit.language);
    this.date.setValue(activityToEdit.date);
    this.price.setValue(activityToEdit.price);
    this.minEnrolled.setValue(activityToEdit.minEnrolled);
    this.maxEnrolled.setValue(activityToEdit.maxEnrolled);
  }

  getActivityById(id: number) {
    return this.activities.find((activity) => {
      return activity.id == id;
    });
  }

  getSubcategoryOptions() {
    return this.categoryOption[this.category.value];
  }

  setCancelledState(activity) {
    if (activity.state === true) {
      activity.state = 'cancelled';
    }
    return activity;
  }

  isNewActivity() {
    return this.activitySelectedId === 0;
  }
}

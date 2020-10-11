import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Activity from 'src/app/shared/models/activity.model';
import { ActivitiesService } from 'src/app/shared/services/activities.service';
import { StoreactivitiesService } from 'src/app/shared/services/store-activities.service';

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
    private activitiesService: ActivitiesService,
    private storeActivitiesService: StoreactivitiesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
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
      Validators.pattern(/\d{2}\/\d{2}\/[2][0][2-9]\d{1}/),
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
    const activity = this.setActivity(this.activityForm.value);
    this.activitiesService.updateActivity(activity).subscribe(() => {
      this.updateStoredActivities();
      this.pushToLocalActivities(activity);
      this.showForm = false;
      this.showSuccessMsg = true;
    });
  }

  recieveActivitiesEvent($event) {
    this.activities = this.storeActivitiesService.activities;
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

  setActivity(activity) {
    let index = this.activitySelectedId - 1;

    return index < 0
      ? this.setNewActivity(activity)
      : this.setEditedActivity(index, activity);
  }

  setEditedActivity(index, newactivityData) {
    let newActivity = this.setCancelledState(newactivityData);
    return (this.activities[index] = {
      ...this.activities[index],
      ...newActivity,
    });
  }
  setNewActivity(activity) {
    activity.id = this.activities.length + 1;
    activity.state = undefined;
    return activity;
  }

  pushToLocalActivities(activity) {
    let index = activity.id - 1;

    this.activities[index]
      ? (this.activities[index] = activity)
      : this.activities.push(activity);
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

  updateStoredActivities() {
    this.storeActivitiesService.activities = this.activities;
  }
}

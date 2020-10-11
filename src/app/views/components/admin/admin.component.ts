import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Activity from 'src/app/shared/models/activity.model';
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
    console.log(this.activityForm.value);
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
  }

  getActivityById(id: number) {
    return this.activities.find((activity) => {
      return activity.id == id;
    });
  }

  pushActivity() {
    let index = this.activitySelectedId - 1;
    let newactivityData = this.activityForm.value;

    index < 0
      ? this.pushNewActivity(newactivityData)
      : this.pushEditedActivity(index, newactivityData);
  }

  pushEditedActivity(index, newactivityData) {
    this.activities[index] = {
      ...this.activities[index],
      ...newactivityData,
    };
  }
  pushNewActivity(newactivity) {
    newactivity.id = this.activities.length + 1;
    this.activities.push(newactivity);
  }

  getSubcategoryOptions() {
    return this.categoryOption[this.category.value];
  }
}

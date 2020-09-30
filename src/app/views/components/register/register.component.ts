import { Component, OnInit } from '@angular/core';
import User from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit {
  public testUser: User = {
    email: 'test',
    name: 'test',
    password: 'test',
    isAdmin: false,
    activitiesEnrolled: [],
    surname: 'test',
    dob: 'test',
    telephone: 0,
    natianality: 'test',
    NIF: 0,
    description: 'test',
    education: [],
    languages: [],
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.createUser(this.testUser).subscribe((data) => {
      console.log(data);
    });
  }
}

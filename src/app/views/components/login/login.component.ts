import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  constructor(private usersService: UserService) {}

  ngOnInit(): void {
    this.usersService.getUser(1).subscribe((res) => console.log(res));
  }
}

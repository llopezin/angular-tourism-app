import { Component, OnInit } from '@angular/core';
import User from 'src/app/shared/models/user.model';
import { StoreUserService } from 'src/app/shared/services/store-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  constructor(private storeUserService: StoreUserService) {}
  public user: User = this.storeUserService.user;

  ngOnInit(): void {
    console.log(this.user);
  }
}

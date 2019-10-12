import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: IUser;
  
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(
      userData => {
        this.currentUser = userData;
        console.log(this.currentUser);
      }
    )
  }

}

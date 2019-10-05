import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { IUser } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  // constructor(private authService: AuthService) { }
  
  languages: String[] = ['EN', 'ES'];
  currentUser: IUser;

  ngOnInit() {
    // this.authService.currentUser.subscribe(
    //   (userData) => {
    //     this.currentUser = userData;
    //   }
    // );
  }
  
}

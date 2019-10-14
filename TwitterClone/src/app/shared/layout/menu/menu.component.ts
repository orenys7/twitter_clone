import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { IUser } from 'src/app/core/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription [] = [];
  
  constructor(private authService: AuthService) { }
  
  languages: String[] = ['EN', 'ES'];
  currentUser: IUser;

  ngOnInit() {
    this.subscriptions.push(this.authService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    ));
  }

  logout(){
    this.authService.purgeAuth();
  }

  
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUser } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  currentUser: IUser;
  
  constructor(
    private authService: AuthService,
    ) { }

  ngOnInit() {
    this.subscriptions.push(this.authService.currentUser.subscribe(
      userData => {
        this.currentUser = userData;
      }
    ));
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}

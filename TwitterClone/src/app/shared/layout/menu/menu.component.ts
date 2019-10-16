import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { IUser } from 'src/app/core/models/user.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  languages: String[] = ['EN', 'ES'];
  currentUser: IUser;

  ngOnInit() {
    this.subscriptions.push(this.authService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    ));
  }

  logout() {
    this.authService.purgeAuth();
  }

  navigateToProfile() {
      this.router.navigateByUrl('/refresh', {skipLocationChange: true})
      .then(() => {
        this.router.navigateByUrl(`/profile/${this.currentUser._id}`);
      });
    }  

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService } from 'src/app/core/services';
import { ActivatedRoute } from '@angular/router';
import { IProfile, ITweet } from 'src/app/core/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription [] = [];

  profile: IProfile;
  userTweets: ITweet[];
  path: String;
  id: String;

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
  ) { }


  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.subscriptions.push(this.profileService.get(this.id).subscribe(
      profile => this.profile = profile
    ));
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}

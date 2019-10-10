import { Component, OnInit } from '@angular/core';
import { TweetService, ProfileService } from 'src/app/core/services';
import { ActivatedRoute } from '@angular/router';
import { IProfile, ITweet } from 'src/app/core/models';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  user: IProfile;
  userTweets: ITweet[];
  path: String;
  username: String;

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private tweetService: TweetService
  ) { }


  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    this.profileService.get(this.username).pipe(tap(
      (userProfile: IProfile) => {
        this.user = userProfile;
      }
    ));
    this.tweetService.getUserTweets(this.user.username).subscribe(
      (tweets: ITweet[]) => {
        this.userTweets = tweets;
      }
    );
}
}

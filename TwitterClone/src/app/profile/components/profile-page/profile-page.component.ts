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

  profile: IProfile;
  userTweets: ITweet[];
  path: String;
  id: String;

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    // private tweetService: TweetService
  ) { }


  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    this.profileService.get(this.id).subscribe(
      profile => this.profile = profile
    );
    // this.tweetService.getUserTweets(this.user.username).subscribe(
    //   (tweets: ITweet[]) => {
    //     this.userTweets = tweets;
    //   }
    // );
}
}

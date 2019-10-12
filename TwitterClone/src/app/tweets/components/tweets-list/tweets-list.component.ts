import { Component, OnInit, Input } from '@angular/core';
import { TweetService } from 'src/app/core/services/tweet.service';
import { ITweet, IProfile, IUser } from 'src/app/core/models';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-tweets-list',
  templateUrl: './tweets-list.component.html',
  styleUrls: ['./tweets-list.component.css']
})
export class TweetsListComponent implements OnInit {

  tweets: ITweet[];
  currentUser: IUser;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private tweetService: TweetService
  ) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(
      (userData: IUser) => {
        this.currentUser = userData;
      }
    );
    this.tweetService.get().subscribe(
      (tweets: ITweet[]) => {
        this.tweets = tweets;
      }
    );
    // }else{
    //   this.tweetService.getUserTweets(this.user.username).subscribe(
    //     (tweets: ITweet[]) => {
    //       this.tweets = tweets;
    //     }
    //   );
    // }
  }

}

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

  @Input() profile: IProfile;
  tweets: ITweet[];
  currentUser: IUser;
  id: string = null;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private tweetService: TweetService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.authService.currentUser.subscribe(
      (userData: IUser) => {
        this.currentUser = userData;
      }
    );
    if(!this.id){
      this.tweetService.get().subscribe(
        (tweets: ITweet[]) => {
          this.tweets = tweets;
        }
      );  
    } else{
      if(!this.currentUser){
        this.tweetService.getUserTweets(this.profile._id).subscribe(
          (tweets: ITweet[]) => {
            this.tweets = tweets;
          }
        );  
      } else {
        this.tweetService.getUserTweets(this.currentUser._id).subscribe(
          (tweets: ITweet[]) => {
            this.tweets = tweets;
          }
        );  
      }
    }
    // }else{
    //   this.tweetService.getUserTweets(this.user.username).subscribe(
    //     (tweets: ITweet[]) => {
    //       this.tweets = tweets;
    //     }
    //   );
    // }
  }

}

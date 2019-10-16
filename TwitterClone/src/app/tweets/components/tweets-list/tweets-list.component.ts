import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TweetService } from 'src/app/core/services/tweet.service';
import { ITweet, IProfile, IUser } from 'src/app/core/models';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services';
import { Subscription, interval, timer } from 'rxjs';
import { startWith, switchMap, concatMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-tweets-list',
  templateUrl: './tweets-list.component.html',
  styleUrls: ['./tweets-list.component.css']
})
export class TweetsListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  @Input() profile: IProfile;
  tweets: ITweet[];
  currentUser: IUser;
  id: string = null;
  timerId;

  constructor(
    private route: ActivatedRoute,
    // private router: Router,
    private authService: AuthService,
    private tweetService: TweetService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.subscriptions.push(this.authService.currentUser.subscribe(
      (userData: IUser) => {
        this.currentUser = userData;
      }
    ));
    this.fetchTweets(this.id);
    this.timerId =setInterval(() => this.fetchTweets(this.id), 10000);
    
    // if (this.id) {     
    //   this.subscriptions.push(this.tweetService.getUserTweets(this.profile._id).subscribe(
    //     (tweets: ITweet[]) => {
    //       this.tweets = tweets;
    //     }
    //   ));
    // }
    // else {
    //   this.subscriptions.push(this.tweetService.get().subscribe(
    //     (tweets: ITweet[]) => {
    //       this.tweets = tweets;
    //     }
    //   ));
    // }
    
    // timer(0,10000)
    // .subscribe(
    //   () => {
    //     this.ngOnDestroy();
    //     this.ngOnInit();
    //     console.log('refreshed');
        
    //   }
    //)
  }

  fetchTweets(id?:string){
    if (this.id) {     
      this.subscriptions.push(this.tweetService.getUserTweets(this.profile._id).subscribe(
        (tweets: ITweet[]) => {
          this.tweets = tweets;
        }
      ));
    }
    else {
      this.subscriptions.push(this.tweetService.get().subscribe(
        (tweets: ITweet[]) => {
          this.tweets = tweets;
        }
      ));
    }
  }

  refresh() {
    this.ngOnDestroy();
    this.ngOnInit();
  }

  ngOnDestroy(): void {
    console.log('destroyed!');
    clearInterval(this.timerId);
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}

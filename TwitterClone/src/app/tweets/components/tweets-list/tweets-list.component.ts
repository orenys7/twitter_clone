import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TweetService } from 'src/app/core/services/tweet.service';
import { ITweet, IProfile, IUser, IPost } from 'src/app/core/models';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services';
import { Subscription } from 'rxjs';

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
    this.startInterval();
  }

  startInterval(){
    this.timerId = setInterval(() => this.fetchTweets(this.id), 10000);
  }

  fetchTweets(id?: string) {
    if (this.id) {
      this.subscriptions.push(this.tweetService.getUserTweets(this.profile._id).subscribe(
        (tweets: ITweet[]) => {
          this.tweets = tweets.reverse();
        }
      ));
    }
    else {
      this.subscriptions.push(this.tweetService.get().subscribe(
        (tweets: ITweet[]) => {
          this.tweets = tweets.reverse();
        }
      ));
    }
  }

  operationApi(message: any) {
    clearInterval(this.timerId);
    if (message.operation === 'delete') {
      this.subscriptions.push(this.tweetService.delete(message.tweetId).subscribe(
        () => this.refresh()
      ));
    }
    if (message.operation === 'reply') {
      const post = this.setPostDetails(message.tweet);
      this.subscriptions.push(this.tweetService.post(post).subscribe(
        () => this.refresh()
      ));
    }
    if (message.operation === 'startInterval') {
      this.startInterval();
    }
  }

  setPostDetails(content: string): IPost {
    let post: IPost = {
      authorID: this.currentUser._id,
      author: this.currentUser.username,
      authorAvatarUrl: this.currentUser.image,
      content: content,
      createdAt: new Date().toLocaleDateString(),
      starCounter: 0,
      starsUsers: []
    };
    return post;
  }

  refresh() {
    this.ngOnDestroy();
    this.ngOnInit();
  }

  ngOnDestroy(): void {
    clearInterval(this.timerId);
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}

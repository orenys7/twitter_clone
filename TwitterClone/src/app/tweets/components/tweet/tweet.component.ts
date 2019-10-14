import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TweetService, AuthService } from 'src/app/core/services';
import { ITweet, IUser } from 'src/app/core/models';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  @Input() tweet: ITweet;
  @Input() user: IUser;
  @Output() deleteBtnClickedEE = new EventEmitter();

  canDeleted: boolean;
  favorited: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tweetService: TweetService
  ) { }

  ngOnInit() {
    this.canDeleted = (this.user.username === this.tweet.author);
    if (this.tweet.starsUsers.length === 0) {
      this.favorited = false;
    }
    else if (this.tweet.starsUsers.indexOf(this.user.username) !== -1) {
      this.favorited = true;
    }
  }

  delete() {
    this.subscriptions.push(this.tweetService.delete(this.tweet._id).subscribe(
      success => {
        return this.deleteBtnClickedEE.emit(true);
      }
    ));
  }

  star() {
    if (this.favorited === false) {
      this.tweet.startCounter++;
      this.subscriptions.push(this.tweetService.favorite(this.tweet._id).subscribe(
        stars => {
          this.tweet.starsUsers = stars;
          this.tweet.startCounter = stars.length;
        }
      ));
    } else {
      this.tweet.startCounter--;
      this.subscriptions.push(this.tweetService.unfavorite(this.tweet._id).subscribe(
        stars => {
          this.tweet.starsUsers = stars;
          this.tweet.startCounter = stars.length;
        }
      ));
    }
    this.favorited = (!this.favorited);
  }

  navigateTo(username: String) {
    this.router.navigate(['../profile/', this.tweet.authorID], { relativeTo: this.route });
  }

  reply() {
    //open pop-up component of post
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}

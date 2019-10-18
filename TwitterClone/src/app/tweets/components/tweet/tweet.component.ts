import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TweetService, AuthService } from 'src/app/core/services';
import { ITweet, IUser, IPost } from 'src/app/core/models';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  @Input() tweet: ITweet;
  @Input() user: IUser;
  @Output() opertaionEE = new EventEmitter();
  canDeleted: boolean;
  favorited: boolean;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private tweetService: TweetService,
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
    return this.opertaionEE.emit({ operation: 'delete', tweetId: this.tweet._id });
    // this.subscriptions.push(this.tweetService.delete(this.tweet._id).subscribe(
    //   success => {
    //     return this.deleteBtnClickedEE.emit(true);
    //   }
    // ));
  }

  star() {
    if (this.favorited === false) {
      this.subscriptions.push(this.tweetService.favorite(this.tweet._id).subscribe(
        stars => {
          this.tweet.starsUsers = stars;
          this.tweet.starCounter = stars.length;
        }
      ));
    } else {
      this.subscriptions.push(this.tweetService.unfavorite(this.tweet._id).subscribe(
        stars => {
          this.tweet.starsUsers = stars;
          this.tweet.starCounter = stars.length;
        }
      ));
    }
    this.favorited = (!this.favorited);
  }

  navigateTo() {
    this.router.navigateByUrl(`/profile/${this.tweet.authorID}`, { skipLocationChange: true })
      .then(() => {
        this.router.navigateByUrl(`/profile/${this.tweet.authorID}`);
      });
  }

  reply() {
    //open pop-up component of post
    const dialogRef = this.dialog.open(PostDialogComponent);
    this.subscriptions.push(dialogRef.beforeClosed().subscribe(result => {
      return this.opertaionEE.emit({ operation: 'reply', tweet: result });
      // this.subscriptions.push(this.tweetService.post(post).subscribe(
      //   tweet => {
      //     console.log(tweet);
      //   }
      // ));
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TweetService } from 'src/app/core/services';
import { ITweet, IUser } from 'src/app/core/models';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
})
export class TweetComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  @Input() tweet: ITweet;
  @Input() user: IUser;
  @Input() timerId;
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
  }

  checkFavorited() {
    if (this.tweet.starsUsers.length === 0) {
      this.favorited = false;
      return false;
    }
    else if (this.tweet.starsUsers.indexOf(this.user._id) !== -1) {
      this.favorited = true;
      return true;
    }
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    clearInterval(this.timerId);
    this.subscriptions.push(dialogRef.beforeClosed().subscribe(result => {
      if (result) {
        return this.opertaionEE.emit({ operation: 'delete', tweetId: this.tweet._id });
      }
      return this.opertaionEE.emit({ operation: 'startInterval' });
    }));
  }

  star() {
    clearInterval(this.timerId);
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
    this.checkFavorited();
    return this.opertaionEE.emit({ operation: 'startInterval' });
  }

  navigateTo() {
    this.router.navigateByUrl(`/profile/${this.tweet.authorID}`, { skipLocationChange: true })
      .then(() => {
        this.router.navigateByUrl(`/profile/${this.tweet.authorID}`);
      });
  }

  reply() {
    const dialogRef = this.dialog.open(PostDialogComponent);
    clearInterval(this.timerId);
    this.subscriptions.push(dialogRef.beforeClosed().subscribe(result => {
      if (result !== undefined) {
        return this.opertaionEE.emit({ operation: 'reply', tweet: result });
      }
      return this.opertaionEE.emit({ operation: 'startInterval' });
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
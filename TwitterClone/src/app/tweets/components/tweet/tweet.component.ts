import { Component, OnInit, Input } from '@angular/core';
import { TweetService, AuthService } from 'src/app/core/services';
import { ITweet, IUser } from 'src/app/core/models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  @Input() tweet: ITweet;
  @Input() user: IUser;

  // currentUser: IUser;
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
    console.log(this.tweet._id);
    this.tweetService.delete(this.tweet._id).subscribe(
      success => {

      }
    );
  }

  star() {
    if (this.favorited === false) {
      this.tweet.startCounter++;
      this.tweetService.favorite(this.tweet._id).subscribe(
        stars => {
          this.tweet.starsUsers = stars;
          this.tweet.startCounter = stars.length;
        }
      );
    } else {
      this.tweet.startCounter--;
      this.tweetService.unfavorite(this.tweet._id).subscribe(
        stars => {
          this.tweet.starsUsers = stars;
          this.tweet.startCounter = stars.length;
        }
      );
    }
    this.favorited = (!this.favorited);
  }

  navigateTo(username: String) {
    this.router.navigate(['../profile/', this.tweet.authorID], { relativeTo: this.route });
  }

  reply() {
    //open pop-up component of post
  }
}

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
    // this.route.data.subscribe(
    //   (data: { tweet: ITweet }) => {
    //     this.tweet = data.tweet;
    //     console.log('Tweet-Component');
    //     console.log(this.tweet);
    //   }
    // );
    console.log('Tweet-Component');

  
        this.canDeleted = (this.user.username === this.tweet.author);
        if (this.tweet.starsUsers.length === 0) {
          this.favorited = false;
        }
        else if (this.tweet.starsUsers.indexOf(this.user.username) !== -1) {
          this.favorited = true;
        }
      }
    // this.authService.currentUser.subscribe(
    //   (userData: IUser) => {
    //     this.currentUser = userData;
    //     this.canDeleted = (this.currentUser.username === this.tweet.author);
    //     if (this.tweet.starsUsers.length === 0) {
    //       this.favorited = false;
    //     }
    //     else if (this.tweet.starsUsers.indexOf(this.currentUser.username) !== -1) {
    //       this.favorited = true;
    //     }
    //   }
    // );

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
      this.tweet.starsUsers.push(this.user.username);
    } else {
      this.tweet.startCounter--;
      this.tweet.starsUsers.splice(this.tweet.starsUsers.indexOf(this.user.username), 1);
    }
    this.favorited = (!this.favorited);
  }

  navigateTo(username: String) {
    this.router.navigate(['../profile/:id', this.tweet.author], { relativeTo: this.route });
  }

  reply() {
    //open pop-up component of post
  }
}

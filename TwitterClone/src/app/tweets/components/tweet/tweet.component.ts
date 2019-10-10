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

  // @Input() tweet: ITweet;

  tweet: ITweet;
  currentUser: IUser;
  canDeleted: boolean;
  favorited: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private tweetService: TweetService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: { tweet: ITweet }) => {
        this.tweet = data.tweet;
      }
    );

    this.authService.currentUser.subscribe(
      (userData: IUser) => {
        this.currentUser = userData;
        this.canDeleted = (this.currentUser.username === this.tweet.author);
        if(this.tweet.starsUsers.indexOf(this.currentUser.username) !== -1){
          this.favorited = true;
        }
      }
    );
  }

  delete() {
    this.tweetService.delete(this.tweet.id).subscribe(
      success => {
        this.router.navigateByUrl('/');
      }
    );
  }

  star() {
    if(this.favorited === false){
      this.tweet.startCounter++;
      this.tweet.starsUsers.push(this.currentUser.username);
    }else{
      this.tweet.startCounter--;
      this.tweet.starsUsers.splice(this.tweet.starsUsers.indexOf(this.currentUser.username),1);
    }
    this.favorited = (!this.favorited);
  }

  navigateTo(username: String) {
    this.router.navigate(['../profile/:username', this.tweet.author], { relativeTo: this.route });
  }

  reply(){
    //open pop-up component of post
  }
}

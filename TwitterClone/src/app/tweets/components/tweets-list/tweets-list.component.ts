import { Component, OnInit, Input } from '@angular/core';
import { TweetService } from 'src/app/core/services/tweet.service';
import { ITweet, IProfile } from 'src/app/core/models';

@Component({
  selector: 'app-tweets-list',
  templateUrl: './tweets-list.component.html',
  styleUrls: ['./tweets-list.component.css']
})
export class TweetsListComponent implements OnInit {

  @Input() user: IProfile;
  tweets: ITweet[] = [
    {
      author: "Oren",
      content: "dajdaskdhakjd",
      createdAt: `${new Date().toLocaleString()}`,
      id: "das1231312",
      starsUsers: [],
      startCounter: 0
    },
    {
      author: "Oren",
      content: "dajdaskdhakjd",
      createdAt: `${new Date().toLocaleString()}`,
      id: "das1231312",
      starsUsers: [],
      startCounter: 0
    },
    {
      author: "Oren",
      content: "dajdaskdhakjd",
      createdAt: `${new Date().toLocaleString()}`,
      id: "das1231312",
      starsUsers: [],
      startCounter: 0
    }
  ];

  constructor(private tweetService: TweetService){}

  ngOnInit() {
    // if(this.user === undefined){
    //   this.tweetService.get().subscribe(
    //     (tweets: ITweet[]) => {
    //       this.tweets = tweets;
    //     }
    //   );
    // }else{
    //   this.tweetService.getUserTweets(this.user.username).subscribe(
    //     (tweets: ITweet[]) => {
    //       this.tweets = tweets;
    //     }
    //   );
    // }
  }

}

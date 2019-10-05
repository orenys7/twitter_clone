import { Component, OnInit } from '@angular/core';
import { TweetService } from 'src/app/core/services/tweet.service';
import { ITweet } from 'src/app/core/models';

@Component({
  selector: 'app-tweets-list',
  templateUrl: './tweets-list.component.html',
  styleUrls: ['./tweets-list.component.css']
})
export class TweetsListComponent implements OnInit {

  // constructor(private tweetService: TweetService) { }

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

  ngOnInit() {
  }

}

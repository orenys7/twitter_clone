import { Component, OnInit } from '@angular/core';
import { TweetService } from 'src/app/core/services/tweet.service';

@Component({
  selector: 'app-tweets-list',
  templateUrl: './tweets-list.component.html',
  styleUrls: ['./tweets-list.component.css']
})
export class TweetsListComponent implements OnInit {

  constructor(private tweetService: TweetService) { }

  ngOnInit() {
  }

}

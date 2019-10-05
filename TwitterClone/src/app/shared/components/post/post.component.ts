import { Component, OnInit } from '@angular/core';
import { TweetService } from 'src/app/core/services';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  // constructor(private tweetService: TweetService) { }

  ngOnInit() {
  }

  textTweet: string ="";

  saveTweet(){
    this.textTweet = "";
  }
}

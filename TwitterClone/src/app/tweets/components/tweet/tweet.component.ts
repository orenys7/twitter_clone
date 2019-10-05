import { Component, OnInit, Input } from '@angular/core';
import { TweetService } from 'src/app/core/services';
import { ITweet } from 'src/app/core/models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  @Input() tweet: ITweet;
  // constructor(private tweetService: TweetService) { }
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  delete() {

  }

  star() {

  }
  navigateTo(username: String) {
    this.router.navigate(['../profile/',], { relativeTo: this.route });
  }
}

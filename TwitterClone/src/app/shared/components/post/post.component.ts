import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TweetService, AuthService } from 'src/app/core/services';
import { FormControl, Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IUser, ITweet, IPost } from 'src/app/core/models';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

class Model {
  textTweet = '';
}
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  @Output() postClickedEE = new EventEmitter();

  model = new Model();
  postForm: FormGroup;
  currentUser: IUser;
  textTweet = new FormControl('', [Validators.required, Validators.email]);
  textPost: string = '';
  errors: {};

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tweetService: TweetService,
    public translate: TranslateService
  ) {
    this.postForm = fb.group({
      textTweet: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(240)]]
    });
  }

  ngOnInit() {
    this.subscriptions.push(this.authService.currentUser.subscribe(
      userData => {
        console.log(userData);
        this.currentUser = userData;
      }
    ));
  }

  get tweetControl(): AbstractControl {
    return this.postForm.get('textTweet');
  }

  checkPostLength(){
    if(this.textPost.length === 0 || this.textPost.length > 240){
      return true;
    }
    return false;
  }

  setPostDetails(): IPost{
    let post: IPost = {
      authorID: this.currentUser._id,
      author: this.currentUser.username,
      authorAvatarUrl: this.currentUser.image,
      content: this.tweetControl.value,
      createdAt: new Date().toLocaleDateString(),
      starCounter: 0,
      starsUsers: []
    };
    return post;
  }

  saveTweet() {
    const post = this.setPostDetails();
    this.textPost = '';
    this.subscriptions.push(this.tweetService.post(post).subscribe(
      tweet => {
        console.log(tweet);
        this.postClickedEE.emit(true);
      },
      err => {
        this.errors = err;
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  
}

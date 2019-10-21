import { Component, OnInit, Output, EventEmitter, OnDestroy, ChangeDetectorRef  } from '@angular/core';
import { TweetService, AuthService } from 'src/app/core/services';
import { FormControl, Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { IUser, IPost } from 'src/app/core/models';
import { Subscription } from 'rxjs';

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
    private cd: ChangeDetectorRef
  ) {
    this.postForm = fb.group({
      textTweet: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(240)]]
    });
  }

  ngOnInit() {
    this.subscriptions.push(this.authService.currentUser.subscribe(
      userData => {
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
    this.subscriptions.push(this.tweetService.post(post).subscribe(
      tweet => {
        this.postForm.reset();
        this.textPost = '';
        this.postClickedEE.emit(true);
        this.cd.detectChanges();
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

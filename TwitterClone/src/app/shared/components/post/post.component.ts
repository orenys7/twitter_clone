import { Component, OnInit } from '@angular/core';
import { TweetService, AuthService } from 'src/app/core/services';
import { FormControl, Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IUser, ITweet, IPost } from 'src/app/core/models';

class Model {
  textTweet = '';
}
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{

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
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.postForm = fb.group({
      textTweet: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(240)]]
    });
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(
      userData => {
        console.log(userData);
        this.currentUser = userData;
      }
    );
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
      startCounter: 0,
      starsUsers: []
    };
    return post;
  }

  saveTweet() {
    const post = this.setPostDetails();
    this.textPost = '';
    console.log('post');
    console.log(post);
    this.tweetService.post(post).subscribe(
      data => {
        console.log(data);
        this.router.navigate([''], { relativeTo: this.route });
      },
      err => {
        this.errors = err;
      }
    );
    // this.postForm.reset();
  }
}

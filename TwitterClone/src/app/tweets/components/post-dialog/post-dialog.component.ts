import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { AuthService, TweetService } from 'src/app/core/services';
import { TranslateService } from '@ngx-translate/core';

class Model {
  textTweet = '';
}

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.css']
})
export class PostDialogComponent implements OnInit {
  
  model = new Model();
  postForm: FormGroup;
  textTweet = new FormControl('', [Validators.required, Validators.email]);
  textPost: string = '';
  errors: {};

  constructor(
    private fb: FormBuilder,
  ) { 
    this.postForm = fb.group({
      textTweet: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(240)]]
    });
  }

  ngOnInit() {
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
  
}

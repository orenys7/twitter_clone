import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { TweetService } from './services/tweet.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
    declarations: [

    ],
    imports: [
      CommonModule, 
    ],
    providers: [
        AuthService,
        TweetService,
        AuthGuard,
    ]
  })
  export class CoreModule { }

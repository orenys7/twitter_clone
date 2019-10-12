import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TweetsListComponent } from './components/tweets-list/tweets-list.component';
import { TweetComponent } from './components/tweet/tweet.component';
import { AngularMaterialModule } from '../shared/layout/material/material.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
      TweetsListComponent,
      TweetComponent,
  ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      AngularMaterialModule,
    ],
    exports: [
      TweetsListComponent,
      TweetComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

  })
  export class TweetsModule { }
  
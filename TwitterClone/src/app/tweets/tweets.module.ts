import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TweetsListComponent } from './components/tweets-list/tweets-list.component';
import { TweetComponent } from './components/tweet/tweet.component';
import { AngularMaterialModule } from '../shared/layout/material/material.module';

@NgModule({
    declarations: [
      TweetsListComponent,
      TweetComponent,
  ],
    imports: [
      FormsModule,
      ReactiveFormsModule,
      AngularMaterialModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

  })
  export class TweetsModule { }
  
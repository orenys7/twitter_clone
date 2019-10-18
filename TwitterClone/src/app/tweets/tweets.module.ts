import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TweetsListComponent } from './components/tweets-list/tweets-list.component';
import { TweetComponent } from './components/tweet/tweet.component';
import { CommonModule } from '@angular/common';
import { TweetsRoutingModule } from './tweets-routing.module';
import { PostDialogComponent } from './components/post-dialog/post-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { AngularMaterialModule } from '../shared/layout/material/material.module';

@NgModule({
  declarations: [
    TweetsListComponent,
    TweetComponent,
    PostDialogComponent,
  ],
  entryComponents: [PostDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TweetsRoutingModule,
    AngularMaterialModule,
    TranslateModule,
  ],
  exports: [
    TweetsListComponent,
    TweetComponent,
    PostDialogComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class TweetsModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedRoutingModule } from './shared-routing.module';
import { AngularMaterialModule } from './layout/material/material.module';
import { MenuComponent } from './layout/menu/menu.component';
import { FullpageDirective } from './directives/fullpage.directive';
import { PostComponent } from './components/post/post.component';
import { FormsModule } from '@angular/forms';
import { PostedTweetComponent } from './components/posted-tweet/posted-tweet.component';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';

@NgModule({
    declarations: [
        MenuComponent,
        PostComponent,
        FullpageDirective,
        PostedTweetComponent,
        ProfileHeaderComponent
    ],
    imports: [
      CommonModule,
      AngularMaterialModule,
      SharedRoutingModule,
      FormsModule
    ],
    exports: [
        MenuComponent,
        PostComponent,
        PostedTweetComponent,
        ProfileHeaderComponent,
        AngularMaterialModule,
    ]
  })
  export class SharedModule { }
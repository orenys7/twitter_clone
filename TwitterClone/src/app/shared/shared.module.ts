import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedRoutingModule } from './shared-routing.module';
import { AngularMaterialModule } from './layout/material/material.module';
import { MenuComponent } from './layout/menu/menu.component';
import { FullpageDirective } from './directives/fullpage.directive';
import { PostComponent } from './components/post/post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { TweetsModule } from '../tweets/tweets.module';

@NgModule({
    declarations: [
        MenuComponent,
        PostComponent,
        FullpageDirective,
        HomeComponent
    ],
    imports: [
      CommonModule,
      AngularMaterialModule,
      SharedRoutingModule,
      TweetsModule,
      FormsModule,
      ReactiveFormsModule,
    ],
    exports: [
        MenuComponent,
        PostComponent,
        AngularMaterialModule,
    ]
  })
  export class SharedModule { }
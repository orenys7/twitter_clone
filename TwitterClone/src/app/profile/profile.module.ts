import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { TweetsModule } from '../tweets/tweets.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProfileHeaderComponent,
    ProfilePageComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    TweetsModule,
    SharedModule
  ],
  exports:[
    ProfilePageComponent
  ]
})
export class ProfileModule { }

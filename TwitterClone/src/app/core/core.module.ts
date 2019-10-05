import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';

import {
  ApiService,
  AuthService,
  JwtService,
  ProfileService,
  TweetService,
  UserService
} from './services';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    AuthService,
    JwtService,
    ProfileService,
    TweetService,
    UserService,
    AuthGuard,
  ],
  declarations: []
})
export class CoreModule { }
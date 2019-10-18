import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
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
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from 'src/environments/environment';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
  // return new TranslateHttpLoader(
  //   httpClient,
  //   environment.server_url + '/assets/i18n/',
  //   '.json'
  // );
}

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
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
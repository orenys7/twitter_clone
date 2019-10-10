import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { ITweet } from '../models/tweet.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor(private apiService: ApiService) { }

  get(): Observable<ITweet[]> {
    return this.apiService.get('/tweets')
      .pipe(map(data => data.tweets));
  }

  getUserTweets(userID): Observable<ITweet[]> {
    return this.apiService.get(`members/${userID}/tweets`)
      .pipe(map(data => data.tweets));
  }

  post(tweet): Observable<ITweet> {
    return this.apiService.post('/tweets', { tweet: tweet })
      .pipe(map(data => data.tweet));
  }

  delete(id) {
    return this.apiService.delete(`/tweets/${id}`);
  }

  favorite(id): Observable<ITweet> {
    return this.apiService.post(`/tweets/${id}/star-toggle`);
  }

  unfavorite(id): Observable<ITweet> {
    return this.apiService.delete(`/tweets/:${id}/star-toggle`);
  }
}

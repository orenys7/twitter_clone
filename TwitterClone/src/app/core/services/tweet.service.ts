import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { ITweet, IPost } from '../models/tweet.model';
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

  getUserTweets(userID: string): Observable<ITweet[]> {
    return this.apiService.get(`/members/${userID}/tweets`)
      .pipe(map(data => data.tweets));
  }

  post(tweet: ITweet | IPost): Observable<ITweet> {
    return this.apiService.post('/tweets', { tweet: tweet })
    .pipe(map(
      data => {
        return data.tweet;
      }
    ));
  }

  delete(id: string) {
    return this.apiService.delete(`/tweets/${id}`);
  }

  favorite(id: string): Observable<string[]> {
    return this.apiService.post(`/tweets/${id}/star-toggle`);
  }

  unfavorite(id: string): Observable<string[]> {
    return this.apiService.post(`/tweets/${id}/star-toggle`);
  }
  
}

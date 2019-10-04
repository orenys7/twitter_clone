import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITweet } from '../models/tweet.model'

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  URL = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  create(tweet: ITweet): Promise<ITweet> {
    this.http.post(this.URL, tweet).toPromise();
  }
  
  getTweets(): Promise<ITweet[]> {
    this.http.get(this.URL).toPromise();
  }

  getTweetByID(id: number): Promise<ITweet> {
    this.http.get(`${this.URL}/:${id}`).toPromise();
  }

  update(tweet: ITweet): Promise<ITweet> {
    this.http.put(this.URL, tweet).toPromise();
  }

  delete(id: number): Promise<void> {
    this.http.delete(`${this.URL}/:${id}`).toPromise();
  }
}

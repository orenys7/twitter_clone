import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  create(tweet: IUser): Promise<IUser> {
    this.http.post(this.URL, tweet).toPromise();
  }

  getUser(username: string, password: string): Promise<IUser> {
    this.http.get(this.URL).toPromise();
  }

  checkIfLoggedIn(): boolean {
    if(localStorage.getItem('Authorize')){
      return true;
    }
    return false;
  }
}
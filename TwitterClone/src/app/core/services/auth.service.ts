import { Injectable } from '@angular/core';
import { IUser, LoginResp } from '../models';
import { BehaviorSubject, ReplaySubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import {  JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<IUser>({} as IUser);
  public currentUser = this.currentUserSubject.asObservable(); 
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (
    private apiService: ApiService,
    private jwtService: JwtService
  ) {}

  setAuth(resp: LoginResp) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(resp.token);
    // Set current user data into observable
    this.currentUserSubject.next(resp.user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as IUser);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type, credentials): Observable<LoginResp> {
    const route = (type === 'login') ? '/login' : '/register';
    return this.apiService.post('/auth' + route, {user: credentials})
      .pipe(map(
      data => {
        this.setAuth(data);
        return data;
      }
    ));
  }

  getCurrentUser(): IUser {
    return this.currentUserSubject.value;
  }
}
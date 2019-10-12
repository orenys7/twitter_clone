import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser, LoginResp } from '../models';
import { BehaviorSubject, ReplaySubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { ApiService } from './api.service';
import {  JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<IUser>({} as IUser);
  public currentUser = this.currentUserSubject.asObservable(); //.pipe(distinctUntilChanged())

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService
  ) {}

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get('/user')
      .subscribe(
        data => this.setAuth(data.user),
        err => this.purgeAuth()
      );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

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
        console.log(data);
        this.setAuth(data);
        console.log(this.currentUser);
        return data;
      }
    ));
  }

  getCurrentUser(): IUser {
    return this.currentUserSubject.value;
  }

  // Update the user on the server (email, pass, etc)
  // update(user): Observable<IUser> {
  //   return this.apiService
  //   .put('/user', { user })
  //   .pipe(map(data => {
  //     // Update the currentUser observable
  //     this.currentUserSubject.next(data.user);
  //     return data.user;
  //   }));
  // }

}
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor( private router: Router, private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(take(1));
  }
}
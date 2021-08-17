import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { UIService } from '../common/ui.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private authService: AuthService,
    protected router: Router,
    protected uiService: UIService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin(next);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkLogin(childRoute);
  }

  canLoad(route: Route) {
    return this.checkLogin();
  }

  checkLogin(route?: ActivatedRouteSnapshot) {
    return this.authService.currentStatus$.pipe(
      map((status) => {
        const roleMatch = this.checkRoleMatch(route, status.userRole);
        const allowLogin = status.isAuthenticated && roleMatch;
        if (!allowLogin) {
          this.uiService.showToast('User is not authorized to login');
          this.router.navigate(['/login'], {
            queryParams: {
              redirectUrl: this.getResolvedUrl(route),
            },
          });
        }
        return allowLogin;
      }),
      take(1)
    );
  }

  checkRoleMatch(route: ActivatedRouteSnapshot, role) {
    if (!route?.data?.expectedRole) {
      return true;
    }
    return role === route.data.expectedRole;
  }

  getResolvedUrl(route: ActivatedRouteSnapshot) {
    if (!route) {
      return '';
    }
    route.pathFromRoot
      .map((r) => r.url.map((segment) => segment.toString()).join('/'))
      .join('/')
      .replace('//', '/');
  }
}

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private router: Router, private auth: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const jwt = this.auth.getToken();
    const authRequest = request.clone({ setHeaders: { authorization: `Bearer ${jwt}` } });

    return next.handle(authRequest).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
        return throwError(err);
      })
    );
  }
}

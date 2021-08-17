import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { Router } from '@angular/router'
import { AuthService } from '../auth/auth.service'
import { catchError } from 'rxjs/operators'

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private router: Router, private auth: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const jwt = this.auth.getToken()
    const authRequest = request.clone({ setHeaders: { authorization: `Bearer ${jwt}` } })

    return next.handle(authRequest).pipe(
      catchError((err)=>{
        if(err.status === 401){
          this.router.navigate(['/login'])
        }
        return throwError(err)
      })
    )
  }
}

import { visitAll } from '@angular/compiler'
import { Injectable } from '@angular/core'
import decode from 'jwt-decode'
import { BehaviorSubject, Observable, pipe, throwError } from 'rxjs'
import { catchError, filter, flatMap, map, mergeMap, tap } from 'rxjs/operators'

import { Role } from '../auth/interfaces/auth'
import { User } from '../auth/user/user'
import { transformError } from '../common/common'
import { CacheService } from './cache.service'

@Injectable()
export abstract class AuthService extends CacheService implements IAuthService {
  private getAndUpdateUserIfAuthenticated = pipe(
    filter((status: IAuthStatus) => status.isAuthenticated),
    mergeMap(() => this.getCurrentUser()),
    map((user) => this.currentUser$.next(user)),
    catchError(transformError)
  )
  readonly currentStatus$ = new BehaviorSubject<IAuthStatus>(defaultStatus)
  readonly currentUser$ = new BehaviorSubject<User>(new User())
  protected readonly resumeCurrentUser$ = this.currentStatus$.pipe(
    this.getAndUpdateUserIfAuthenticated
  )

  protected abstract authProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse>
  protected abstract transformJwtToken(token): IAuthStatus
  protected abstract getCurrentUser(): Observable<User>
  public abstract logout(clearToken: boolean): void

  constructor() {
    super()
    if (this.hasExpiredToken()) {
      this.logout(true)
    } else {
      this.currentStatus$.next(this.getAuthStatusFromToken())
      setTimeout(() => this.resumeCurrentUser$.subscribe())
    }
  }

  login(email: string, password: string): Observable<void> {
    this.clearToken()
    const loginResponse$ = this.authProvider(email, password).pipe(
      map((value) => {
        this.setToken(value.accessToken)
        let token = decode(value.accessToken)
        console.log(token)
        return this.transformJwtToken(token)
      }),
      tap((val) => this.currentStatus$.next(val)),
      this.getAndUpdateUserIfAuthenticated,
      catchError(transformError)
    )
    loginResponse$.subscribe({
      error: (err) => {
        console.log(err)
        this.logout(true)
        return throwError(err)
      },
    })
    return loginResponse$
  }

  getToken(): string {
    return this.getItem('jwt')
  }

  setToken(jwt: string) {
    this.setItem('jwt', jwt)
  }
  clearToken() {
    this.removeItem('jwt')
  }
  protected hasExpiredToken(): boolean {
    const jwt = this.getToken()
    if (jwt) {
      const payload = decode(jwt) as any
      console.log(payload)
      return Date.now() >= payload.exp * 1000
    }
    return true
  }
  protected getAuthStatusFromToken(): IAuthStatus {
    return this.transformJwtToken(decode(this.getToken()))
  }
}

export interface IAuthStatus {
  isAuthenticated: boolean
  userRole: Role
  userId: string
}

export interface IServerAuthResponse {
  accessToken: string
}

export const defaultStatus: IAuthStatus = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: '',
}

export interface IAuthService {
  readonly currentStatus$: BehaviorSubject<IAuthStatus>
  readonly currentUser$: BehaviorSubject<User>
  login(email: string, password: string): Observable<void>
  getToken(): string
}

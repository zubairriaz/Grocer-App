import { Injectable } from '@angular/core'
import { sign } from 'fake-jwt-sign'
import { Observable, of, throwError } from 'rxjs'

import {
  AuthService,
  IAuthStatus,
  IServerAuthResponse,
  defaultStatus,
} from '../auth.service'
import { PhoneType, Role } from '../interfaces/auth'
import { User } from '../user/user'

@Injectable()
export class InMemoryauthService extends AuthService {
  constructor() {
    super()
  }
  private defaultUser = User.Build({
    _id: '5da01751da27cc462d265913',
    email: 'zubair@gmail.com',
    name: { firstName: 'Zubair', lastName: 'Riaz' },
    picture: 'https://secure.gravatar.com/avatar/7cbaa9afb5ca78d97f3c689f8ce6c985',
    role: Role.Manager,
    dateOfBirth: new Date(1980, 1, 1),
    userStatus: true,
    address: {
      line1: '101 Sesame St.',
      city: 'Bethesda',
      state: 'Maryland',
      zip: '20810',
    },
    level: 2,
    phones: [
      {
        id: 0,
        type: PhoneType.Mobile,
        digits: '5555550717',
      },
    ],
  })
  protected authProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse> {
    if (!email.endsWith('@test.com')) {
      return throwError('Failed to Login! .Email must end with @test.com')
    }
    const authStatus: IAuthStatus = {
      isAuthenticated: true,
      userId: this.defaultUser._id,
      userRole: email.toLowerCase().includes('cashier')
        ? Role.Cashier
        : email.toLowerCase().includes('clerk')
        ? Role.Clerk
        : email.toLowerCase().includes('manager')
        ? Role.Manager
        : Role.None,
    }
    this.defaultUser.role = authStatus.userRole
    const response = {
      accessToken: sign(authStatus, 'secret', {
        expiresIn: '1h',
        algorithm: 'none',
      }),
    } as IServerAuthResponse
    return of(response)
  }

  protected transformJwtToken(token: IAuthStatus): IAuthStatus {
    return token
  }
  protected getCurrentUser(): Observable<User> {
    return of(this.defaultUser)
  }
  logout(clearToken: boolean): void {
    if (clearToken) {
      this.clearToken()
    }
    setTimeout(() => this.currentStatus$.next(defaultStatus), 0)
  }
}

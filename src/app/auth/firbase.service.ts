import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService, IAuthStatus, IServerAuthResponse } from './auth.service';
import { defaultStatus } from './auth.service';
import { IUser, Role } from './interfaces/auth';
import { User } from './user/user';

interface IJwtToken {
  email: string;
  iat: number;
  exp: number;
  sub: string;
}

@Injectable({
  providedIn: 'root',
})
export class FirbaseService extends AuthService {
  constructor(private faAuth: AngularFireAuth) {
    super();
  }

  authProvider(email: string, password: string): Observable<IServerAuthResponse> {
    const serverResponse$ = new Subject<IServerAuthResponse>();

    this.faAuth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        const fireBaseUser = res.user;
        fireBaseUser?.getIdToken().then(
          (token) => serverResponse$.next({ accessToken: token } as IServerAuthResponse),
          (err) => serverResponse$.error(err)
        );
      },
      (err) => serverResponse$.error(err)
    );
    return serverResponse$;
  }
  protected transformJwtToken(token: IJwtToken): IAuthStatus {
    if (!token) {
      return;
    }
    return {
      isAuthenticated: token.email ? true : false,
      userId: token.sub,
      userRole: Role.None,
    };
  }
  protected getCurrentUser(): Observable<User> {
    return this.faAuth.user.pipe(map(this.transformFirebaseUser));
  }
  private transformFirebaseUser(firebaseUser): User {
    if (!firebaseUser) {
      return new User();
    }
    return User.Build({
      _id: firebaseUser.uid as string,
      email: firebaseUser.email as string,
      name: {
        firstName: firebaseUser?.displayName?.split(' ')[0] || 'Firebase',
        lastName: (firebaseUser?.displayName?.split(' ')[1] || 'User') as string,
      },
      picture: firebaseUser.photoURL as string,
      role: Role.None,
    } as IUser);
  }
  logout() {
    if (this.faAuth) {
      this.faAuth.signOut();
    }
    this.clearToken();
    this.currentStatus$.next(defaultStatus);
  }
}

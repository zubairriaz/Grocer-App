import { AngularFireAuth } from '@angular/fire/auth';

import { environment } from '../../environments/environment';
import { InMemoryauthService } from '../auth/in-memoryauth/in-memoryauth.service';
import { FirbaseService } from './firbase.service';
import { AuthMode } from './interfaces/auth';

export function authFactory(afAuth: AngularFireAuth) {
  switch (environment.authMode) {
    case AuthMode.InMemeory:
      return new InMemoryauthService();
    case AuthMode.Firebase:
      return new FirbaseService(afAuth);
    case AuthMode.CustomServer:
      return new Error('N/A');
  }
}

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { AuthMode } from '../app/auth/interfaces/auth'

export const environment = {
  production: false,
  authMode: AuthMode.InMemeory,
  firebaseConfig: {
    apiKey: 'AIzaSyCrHvafOM64QIuP5oyTiccqh9I-nIZ6-Ms',
    authDomain: 'grocer-74109.firebaseapp.com',
    projectId: 'grocer-74109',
    storageBucket: 'grocer-74109.appspot.com',
    messagingSenderId: '1064389196456',
    appId: '1:1064389196456:web:e118daf8838777755b209d',
    measurementId: 'G-K7XWR8VJXB',
  },
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

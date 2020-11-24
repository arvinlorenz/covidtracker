// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8100',
  firebase: {
    apiKey: 'AIzaSyAalZnvt6_aIPCtNAfChiCCr8bXKxWd36w',
    authDomain: 'contact-trace-and-menu.firebaseapp.com',
    databaseURL: 'https://contact-trace-and-menu.firebaseio.com',
    projectId: 'contact-trace-and-menu',
    storageBucket: 'contact-trace-and-menu.appspot.com',
    messagingSenderId: '673667601910',
    appId: '1:673667601910:web:0fe3682c331508578263d7',
    measurementId: 'G-KLCRB0YHS9'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

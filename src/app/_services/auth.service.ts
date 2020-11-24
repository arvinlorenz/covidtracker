import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
    ) { }

  private userData$ = new BehaviorSubject(null);
  private userId$ = new BehaviorSubject(null);

  authChanges() {
    this.afAuth.onAuthStateChanged((user: any) => {
      if (user) {
        this.userData$.next(user);
        this.userId$.next(user.uid);
      }
    });
  }
  getUser() {
    return this.userData$.asObservable().pipe(
      switchMap(user => {

        if (user) {
          return from(this.firestore.collection('users').doc(user.uid).get());
        }
        return of(null);
      })
    );
  }

  getUserEmail() {
    return this.userData$.asObservable().pipe(
      switchMap(() => {
        return from(this.afAuth.currentUser);

      }),
      map(currentUser => {
        if (currentUser) {
          return currentUser.email;
        }
      })
    );
  }

  getUserId() {
    return this.userId$.asObservable().pipe(
      tap(user => {
        console.log(user);
      })
    );
  }

  login(email: string, password: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      tap(() => {
        console.log('hhh');
      }),
      catchError((e) => {
        return of(e);
      })
    );
  }

  registration(formValues) {
    return this.afAuth.createUserWithEmailAndPassword(formValues.email, formValues.password)
      .then(async (result) => {
        const userRef: AngularFirestoreDocument = this.firestore.doc(`users/${result.user.uid}`);
        const userData = {
          uid: result.user.uid,
          email: result.user.email,
          ...formValues
        };
        delete userData.password;
        delete userData.confirmPassword;
        userRef.set(userData);

        this.userData$.next(userData);
        return true;
      }).catch((error) => {
        return false;
      });
    }

  updateAccountDetails(formValues) {
    return this.getUserId().pipe(
      switchMap((uid) => {
        const userRef: AngularFirestoreDocument = this.firestore.doc(`users/${uid}`);
        const userData = {
          uid,
          ...formValues
        };
        delete userData.password;
        delete userData.confirmPassword;
        delete userData.email;
        return from(userRef.set(userData));
      })
    );
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['auth', 'sign-in']);
    });
  }
}

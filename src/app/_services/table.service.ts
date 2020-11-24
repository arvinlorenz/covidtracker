import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject, from, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class TableService {
  private uid;
  constructor(
    private authService: AuthService,
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private http: HttpClient) { }


  private tables$ = new BehaviorSubject(null);

  getTables() {
    return this.tables$.asObservable();
  }
  saveTables(email, tables) {
    return  this.authService.getUserId().pipe(
      tap(uid => {
        const tableRef: AngularFirestoreDocument = this.firestore.doc(`tables/${uid}`);
        const tableData = {
          uid,
          tables
        };
        this.uid = uid;
        return from(tableRef.set(tableData));
      }),
      tap(() => {
        console.log('hi');
        this.tables$.next(tables);
      }),
      switchMap(() => {
        return this.http.post('https://us-central1-contact-trace-and-menu.cloudfunctions.net/sendEmail', {
          uid: this.uid,
          tables,
          email
        });
      }),
      catchError(err => of(err))
    );
  }

  fetchTables() {
    return this.authService.getUserId().pipe(
      tap(async (uid) => {
        if (uid) {
          const data = await this.firestore.collection('tables').doc(uid).ref.get();
          const tables = data.data().tables;
          this.tables$.next(tables);
        }
      })
    );
  }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private http: HttpClient
  ) { }


  checkIn(ownerId, customerCheckinData) {
    const customerData = {
      dateAndTime: Date.now(),
      ...customerCheckinData
    };

    return from(this.firestore.collection('checkIns').doc(ownerId).collection('customers').add(customerData)).pipe(
        switchMap(async (promiseData: any) => {
          const clientId = await promiseData.id;
          return this.firestore.collection('checkIns').doc(ownerId).collection('customers').doc(clientId).ref.get();
        })
      );
  }

  // async getCustomerData(id) {
  //   const doc = await this.firestore.collection('customers').doc(id).ref.get().then(doc => {
  //     return doc.data();
  //   });

  // }
}

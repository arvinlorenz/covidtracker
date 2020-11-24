import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CustomerService } from '../_services/customer.service';
import { CheckInModalComponent } from './check-in-modal/check-in-modal.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {
  ownerId;
  tableName;

  name;
  email;
  phoneNumber;

  constructor(private activatedRoute: ActivatedRoute, private modalCtrl: ModalController, private customerService: CustomerService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (!params.ownerId || !params.tableName) {
        return;
      }
      this.ownerId = params.ownerId;
      this.tableName = params.tableName;

    });
  }


  async presentModal(customerData) {
    const modal = await this.modalCtrl.create({
      component: CheckInModalComponent,
      componentProps: {
        ...customerData
      }
    });

    modal.onDidDismiss().then(data => {
      console.log(data);
      if (data.data.addAnother) {
        this.name = '';
        this.email = '';
        this.phoneNumber = '';
      } else {
        this.name = '';
        this.email = '';
        this.phoneNumber = '';
        console.log('ENJOY EATING!');
      }
    });
    return await modal.present();
  }


  checkIn() {
    this.customerService.checkIn(this.ownerId,
      {
        name: this.name,
        email: this.email,
        phoneNumber: this.phoneNumber,
        tableName: this.tableName,
        ownerId: this.ownerId
      }).subscribe(async (data) => {
        const customerData = data.data();
        this.presentModal(customerData);
        console.log(data);
    });

  }

}

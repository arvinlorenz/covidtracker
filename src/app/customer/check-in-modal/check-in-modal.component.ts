import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-check-in-modal',
  templateUrl: './check-in-modal.component.html',
  styleUrls: ['./check-in-modal.component.scss'],
})
export class CheckInModalComponent implements OnInit {

  @Input() name;
  @Input() phoneNumber;
  @Input() email;
  @Input() dateAndTime;

  now = Date.now();

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.name);
  }

  dismiss(addAnother = false) {
    this.modalCtrl.dismiss({
      addAnother
    });
  }

  addAnother() {
    this.dismiss(true);
  }

}

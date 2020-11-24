import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  @Input() userDetails;
  @Input() editMode;
  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    console.log(this.userDetails);
  }

  dismiss(confirmed = false) {
    this.modalCtrl.dismiss({
      confirmed
    });
  }

  async confirm() {
    if (!this.editMode) {
      const user = await this.authService.registration({...this.userDetails});
      if (user) {
        const confirmed = true;
        this.dismiss(confirmed);
      }
    } else {
      this.authService.updateAccountDetails({...this.userDetails}).subscribe((user) => {

          const confirmed = true;
          this.dismiss(confirmed);

      });

    }

  }
}

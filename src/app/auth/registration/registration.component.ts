import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/_services/auth.service';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  editMode = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private modalCtrl: ModalController,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.has('userId')) {
        this.editMode = true;
        this.authService.getUser().subscribe((user) => {
          if (user) {
            console.log(user.data());
            user = user.data();
            this.setForm(
              user.businessName,
              user.businessType,
              user.abntfn,
              user.address.street,
              user.address.suburb,
              user.address.zip,
              user.address.country,
              user.fullname,
            );
          }
        });
      } else {
        this.setForm();
      }
      this.setForm();
    });
  }

  setForm(businessName = null,
          businessType = null,
          abntfn = null,
          street = null,
          suburb = null,
          zip = null,
          country = null,
          fullname = null,
          ) {
    this.form = this.fb.group({
      businessName: [businessName],
      businessType: [businessType],
      abntfn: [abntfn],
      address: this.fb.group({
        street: [street],
        suburb: [suburb],
        zip: [zip],
        country: [country]
      }),
      fullname: [fullname],
      email: [null],
      password: [null],
      confirmPassword: [null]

    });
  }
  async presentModal(formValues, editMode) {
    const modal = await this.modalCtrl.create({
      component: ConfirmationComponent,
      swipeToClose: true,
      componentProps: {
        userDetails: formValues,
        editMode
      }
    });

    modal.onDidDismiss()
      .then((data: any) => {
        if (data.data.confirmed && !this.editMode) {
          this.router.navigateByUrl('/table');
        } else if (data.data.confirmed && this.editMode) {
          this.router.navigateByUrl('/portal');
        }
    });

    return await modal.present();
  }
  async save() {
    if (!this.form.valid) {
      console.log(this.form);
      return;
    }

    await this.presentModal(this.form.value, this.editMode);
  }

  goToLogin() {
    this.router.navigateByUrl('auth/sign-in');
  }

}

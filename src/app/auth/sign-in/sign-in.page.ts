import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  signinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private router: Router,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.signinForm = this.fb.group({
      email: [null],
      password: [null]
    });
  }

  async login() {
    if (!this.signinForm.valid) {
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    }).then((loadingEl) => {
      loadingEl.present();
      this.authService.login(this.signinForm.value.email, this.signinForm.value.password).subscribe((data) => {
        loadingEl.dismiss();
        if (data.user) {
          this.router.navigateByUrl('portal');
        } else {
          this.presentToast(data.message);
          this.signinForm.patchValue({ email: null });
          this.signinForm.patchValue({ password: null });
        }
      });
    });
  }

  goToRegister() {
    this.router.navigateByUrl('auth/registration');
  }

  async presentToast(e) {
    const toast = await this.toastCtrl.create({
      header: 'Error Loging in',
      message: e,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}

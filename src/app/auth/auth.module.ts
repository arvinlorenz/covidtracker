import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import { RegistrationComponent } from './registration/registration.component';
import { ConfirmationComponent } from './registration/confirmation/confirmation.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AuthPageRoutingModule,
  ],
  declarations: [AuthPage, RegistrationComponent, ConfirmationComponent],
  exports: [RegistrationComponent]
})
export class AuthPageModule {}

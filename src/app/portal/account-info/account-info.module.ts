import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountInfoPageRoutingModule } from './account-info-routing.module';

import { AccountInfoPage } from './account-info.page';
import { AuthPageModule } from 'src/app/auth/auth.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AccountInfoPageRoutingModule,
    AuthPageModule
  ],
  declarations: [AccountInfoPage]
})
export class AccountInfoPageModule {}

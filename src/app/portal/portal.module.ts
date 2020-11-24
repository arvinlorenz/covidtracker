import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PortalPageRoutingModule } from './portal-routing.module';

import { PortalPage } from './portal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PortalPageRoutingModule
  ],
  declarations: [PortalPage]
})
export class PortalPageModule {}

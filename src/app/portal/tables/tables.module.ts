import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablesPageRoutingModule } from './tables-routing.module';

import { TablesPage } from './tables.page';
import { TablePageModule } from 'src/app/table/table.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TablesPageRoutingModule,
    TablePageModule
  ],
  declarations: [TablesPage]
})
export class TablesPageModule {}

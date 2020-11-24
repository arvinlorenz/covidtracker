import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablePageRoutingModule } from './table-routing.module';

import { TablePage } from './table.page';
import { TableSetComponent } from './table-set/table-set.component';
import { TableSaveComponent } from './table-save/table-save.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TablePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [TablePage, TableSetComponent, TableSaveComponent],
  exports: [TableSaveComponent]
})
export class TablePageModule {}

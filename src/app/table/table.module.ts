import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablePageRoutingModule } from './table-routing.module';

import { TablePage } from './table.page';
import { TableSetComponent } from './table-set/table-set.component';
import { TableSaveComponent } from './table-save/table-save.component';
import { TableConfirmModalComponent } from './table-save/table-confirm-modal/table-confirm-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TablePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [TablePage, TableSetComponent, TableSaveComponent, TableConfirmModalComponent],
  exports: [TableSaveComponent]
})
export class TablePageModule {}

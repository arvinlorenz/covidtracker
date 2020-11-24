import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableSaveComponent } from './table-save/table-save.component';
import { TableSetComponent } from './table-set/table-set.component';

import { TablePage } from './table.page';

const routes: Routes = [
  {
    path: '',
    component: TablePage,
    children: [
      {
        path: '',
        component: TableSetComponent
      },
      {
        path: 'create/:tableNumber',
        component: TableSaveComponent
      },
      {
        path: 'set-table',
        component: TableSaveComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablePageRoutingModule {}

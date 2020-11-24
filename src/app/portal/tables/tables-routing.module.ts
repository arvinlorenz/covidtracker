import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableSaveComponent } from 'src/app/table/table-save/table-save.component';

import { TablesPage } from './tables.page';

const routes: Routes = [
  {
    path: '',
    component: TablesPage,
    children: [
      {
        path: '',
        component: TableSaveComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesPageRoutingModule {}

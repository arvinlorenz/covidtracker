import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PortalPage } from './portal.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/portal/reports',
    pathMatch: 'full'
  },
  {
    path: '',
    component: PortalPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./reports/reports.module').then( m => m.ReportsPageModule)
      },
      {
        path: 'tables',
        loadChildren: () => import('./tables/tables.module').then( m => m.TablesPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./account-info/account-info.module').then( m => m.AccountInfoPageModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortalPageRoutingModule {}

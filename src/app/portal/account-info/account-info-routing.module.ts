import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from 'src/app/auth/registration/registration.component';

import { AccountInfoPage } from './account-info.page';

const routes: Routes = [

  {
    path: '',
    component: AccountInfoPage,
    children: [{
      path: ':userId',
      component: RegistrationComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountInfoPageRoutingModule {}

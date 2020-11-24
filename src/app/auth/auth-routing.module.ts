import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthPage,
    children: [{
      path: 'registration',
      component: RegistrationComponent

    },
    {
      path: 'sign-in',
      loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule)
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}

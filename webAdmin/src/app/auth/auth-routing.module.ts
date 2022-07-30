import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthShellComponent } from './components/auth-shell/auth-shell.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { AuthForgotPasswordComponent } from './components/auth-forgot-password/auth-forgot-password.component';
import { AuthRegisterComponent } from './components/auth-register/auth-register.component';
import { extract } from '@app/core';

const routes: Routes = [
  {
    path: '',
    component: AuthShellComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {
        path: 'login',
        component: AuthLoginComponent,
        data: { title: extract('Login') }
      },
      {
        path: 'register',
        component: AuthRegisterComponent,
        data: { title: extract('Register') }
      },
      {
        path: 'forgot',
        component: AuthForgotPasswordComponent,
        data: { title: extract('Forgot Password') }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
  static declarations = [
    AuthForgotPasswordComponent,
    AuthLoginComponent,
    AuthRegisterComponent,
    AuthShellComponent
  ];
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_helpers/auth.guard';
import { ChangePwComponent } from './change-pw/change-pw.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // {
  //   path: 'auth',
  //   component: AuthenticationModule,
  //   children: [
  //     {
  //       path: 'login',
  //       component: LoginComponent,
  //     },
  //     { path: 'change-pw', component: ChangePwComponent },
  //   ],
  // },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'change-pw', canActivate: [AuthGuard], component: ChangePwComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AuthenticationRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { ChangePwComponent } from './change-pw/change-pw.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialAllModules } from 'src/shared/material.module';

@NgModule({
  declarations: [LoginComponent, ChangePwComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    MaterialAllModules,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AuthenticationModule {}

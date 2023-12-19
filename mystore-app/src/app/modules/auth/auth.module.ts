import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './pages/login/login.component';
import { RoutesAuth } from './auth.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './pages/logout/logout.component';

@NgModule({
  imports: [
    CommonModule,
    RoutesAuth,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    LogoutComponent
  ]
})
export class AuthModule { }

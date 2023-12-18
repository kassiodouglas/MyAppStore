import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthComponent } from './auth.component';
import { LogoutComponent } from './pages/logout/logout.component';

const routes: Routes = [
  {
    path: "", component: AuthComponent,
    children: [
      { path: "", component: LoginComponent },
      { path: "logout", component: LogoutComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesAuth { }

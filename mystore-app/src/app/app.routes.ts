import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NavbarComponent } from './shared/navbar/navbar.component';

const routes: Routes = [
  { path: "auth", canActivate: [AuthGuard], loadChildren: () => import("./modules/auth/auth.module").then((m) => m.AuthModule) },

  {
    path: "", canActivate: [AuthGuard], component:NavbarComponent,
    children: [
      { path: "", canActivate: [AuthGuard], loadChildren: () => import("./modules/store/store.module").then((m) => m.StoreModule) },
    ]
  },

  { path: "**", redirectTo: "", pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesApp { }

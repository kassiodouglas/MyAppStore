import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LayoutDefaultComponent } from './layouts/layout-default/layout-default.component';

const routes: Routes = [
  { path: "auth", canActivate: [AuthGuard], loadChildren: () => import("./modules/auth/auth.module").then((m) => m.AuthModule)  },

  {
    path: "", canActivate: [AuthGuard], component:LayoutDefaultComponent ,
    children: [
      { path: "", loadChildren: () => import("./modules/store/store.module").then((m) => m.StoreModule) },
      { path: "admin", loadChildren: () => import("./modules/admin/admin.module").then((m) => m.AdminModule) },
    ]
  },

  { path: "**", redirectTo: "", pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesApp { }

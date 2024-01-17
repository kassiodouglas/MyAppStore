import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './pages/users/users.component';


const routes: Routes = [
  {
    path: "", component: AdminComponent,
    children: [
      {path:'usuarios', component:UsersComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesAdmin { }

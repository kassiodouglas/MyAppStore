import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MeComponent } from './pages/me/me.component';

const routes: Routes = [
  {
    path: "", component: StoreComponent,
    children: [
      { path: "", component: DashboardComponent  },
      { path: "meus-dados", component: MeComponent  }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesStore { }

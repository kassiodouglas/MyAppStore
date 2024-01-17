import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { RouterModule } from '@angular/router';
import { RoutesStore } from './store.routes'
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MeComponent } from './pages/me/me.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RoutesStore,
    SharedModule
  ],
  declarations: [
    StoreComponent,
    DashboardComponent,
    MeComponent,
  ]
})
export class StoreModule { }

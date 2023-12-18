import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { RouterModule } from '@angular/router';
import { RoutesStore } from './store.routes'
import { DashboardComponent } from './pages/dashboard/dashboard.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RoutesStore
  ],
  declarations: [
    StoreComponent, 
    DashboardComponent
  ]
})
export class StoreModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { RouterModule } from '@angular/router';
import { RoutesStore } from './store.routes'
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MeComponent } from './pages/me/me.component';
import { MePipe } from 'src/app/pipes/me.pipe';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RoutesStore
  ],
  declarations: [
    StoreComponent,
    DashboardComponent,
    MeComponent,
    MePipe
  ]
})
export class StoreModule { }

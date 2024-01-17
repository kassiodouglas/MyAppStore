import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RoutesAdmin } from './admin.routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersComponent } from './pages/users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RoutesAdmin,
    SharedModule,
    FormsModule,   
    ReactiveFormsModule 
  ],
  declarations: [
    AdminComponent,
    UsersComponent
  ]
})
export class AdminModule { }

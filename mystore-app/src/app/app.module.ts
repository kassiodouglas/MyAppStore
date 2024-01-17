import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RoutesApp } from './app.routes';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SidebaradvModule } from '@kassdoug/sidebaradv';
import { LayoutDefaultComponent } from './layouts/layout-default/layout-default.component';
import { HeaderComponent } from './layouts/layout-default/header/header.component';
import { MePipe } from './shared/pipes/me.pipe';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,    
    LayoutDefaultComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RoutesApp,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SidebaradvModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

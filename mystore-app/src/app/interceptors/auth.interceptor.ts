import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from '../modules/auth/auth.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import * as moment from 'moment';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  counter: number = 0
  isRefreshing: boolean = false


  notifyOptions:any = {  position: 'center-bottom', failure:{background: 'purple'}}


  constructor(
    private router: Router,
    private authService: AuthService
  ) {

   }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    const token = this.authService.getToken()

    if (token) {
      req = this.cloneRequestWithToken(req, token)
    }

    return next.handle(req).pipe(catchError(err => this.handleAuthError(err, next, req)),
      finalize(() => this.isRefreshing = false)
    )
  }


  handleAuthError(err: HttpErrorResponse, next: HttpHandler, req: HttpRequest<any>): Observable<any> {
    if (err && err.status == 401 && !this.isRefreshing) {
      return this.error401(next, req)
    }
    else if (err.status == 500) {
      this.error500(err, next, req)
    }

    const token = this.authService.getToken();
    req = this.cloneRequestWithToken(req, token);
    return next.handle(req);
  }


  cloneRequestWithToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({ headers: request.headers.set("Authorization", "Bearer " + token) })
  }

  error401(next: HttpHandler, req: HttpRequest<any>) {
    this.isRefreshing = true;

    return this.authService.refresh().pipe(
      switchMap((response: any) => {
        console.log('Token Refreshed successfully at ' + moment().format("YYYY-MM-DD HH:mm:ss"));

        this.authService.setToken(response.access_token);
        req = this.cloneRequestWithToken(req, response.access_token);
        this.isRefreshing = false;
        return next.handle(req);
      }),
      catchError((refreshErr: any) => {
        this.authService.destroySession();

        Notiflix.Loading.dots('redirecionando...');
        this.router.navigateByUrl('/auth')
        Notiflix.Loading.remove();
        throw "Token has expired and can no longer be refreshed"
      })
    );
  }

  error500(err: HttpErrorResponse, next: HttpHandler, req: HttpRequest<any>) {
    console.error(err)

    if (err.error.message.includes("Token") && err.error.message.includes("expired"))
      Notiflix.Notify.failure("Sua sessão expirou!", this.notifyOptions)
    else
      Notiflix.Notify.failure("Erro no servidor. Tente novamente, se o erro persistir, contate o suporte!", this.notifyOptions)
    throw err
  }



}

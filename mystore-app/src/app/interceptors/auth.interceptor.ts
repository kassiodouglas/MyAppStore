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

  notifyOptions: any = { failure: { background: 'purple' } }

  constructor(
    private router: Router,
    private authService: AuthService
  ) {

  }


  /** Intercepa a requisição */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.authService.getToken()

    if (token) {
      req = this.cloneRequestWithToken(req, token)
    }

    return next.handle(req).pipe(catchError(err => this.handleAuthError(err, next, req)),
      finalize(() => this.isRefreshing = false)
    )
  }

  /** Clona a requisição adicionando o token */
  cloneRequestWithToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({ headers: request.headers.set("Authorization", "Bearer " + token) })
  }

  /** Captura o erro (se houver) */
  handleAuthError(err: HttpErrorResponse, next: HttpHandler, req: HttpRequest<any>): Observable<any> {

    if (err && err.status == 401 && err.url?.includes('/auth/login')) {
      return this.error401Auth(err, next, req)
    }

    else if (err && err.status == 401 && !this.isRefreshing) {
      return this.error401(next, req)
    }

    else if (err.status == 500) {
      this.error500(err, next, req)
    }

    const token = this.authService.getToken();
    req = this.cloneRequestWithToken(req, token);
    return next.handle(req);
  }

  /** Trata erro 401 no ato do login */
  error401Auth(err: HttpErrorResponse, ext: HttpHandler, req: HttpRequest<any>): Observable<HttpEvent<any>> {
    throw { message: "User or password are invalids", error: err }
  }

  /** Trata erro 401 em requisições gerais */
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

        Notiflix.Loading.dots('Redirecionando...');
        this.router.navigateByUrl('/auth')
        Notiflix.Loading.remove();
        Notiflix.Notify.failure('Sua sessão expirou! Faça o login novamente', this.notifyOptions)

        throw { message: "Token has expired and can no longer be refreshed", error: refreshErr }
      })
    );
  }

  /** Trata o erro 500 em rotas gerais */
  error500(err: HttpErrorResponse, next: HttpHandler, req: HttpRequest<any>) {

    let message = err.message

    if (err.error.message.includes("Token") && err.error.message.includes("expired"))
      message = "Your session has expired"

    throw { message: message, error: err }
  }



}

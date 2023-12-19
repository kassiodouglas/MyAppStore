import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /** Url base do sistema de autenticação */
  urlAuth: string = environment.urlApi + "/auth"

  key_token: string = '__token__'
  key_me: string = '__me__'

  constructor(
    private http: HttpClient,
    private cookieService:CookieService
  ) { }


  /** Realiza o login na api */
  login(data: any): Observable<any> {
    let url = this.urlAuth + "/login"
    return this.http.post<any>(url, data)
  }

  refresh(): Observable<any>{
    let url = this.urlAuth + "/refresh"
    return this.http.get<any>(url)
  }

  /** Realiza o logout na api */
  logout(): Observable<any> {
    let url = this.urlAuth + "/logout"
    return this.http.get<any>(url)
  }

  /** Realiza o pré registro na api*/
  registerNewuser(data:any): Observable<any> {
    let url = this.urlAuth + "/user/register"
    return this.http.post<any>(url, data)
  }

  /** Destroi todos os dados da sessao */
  destroySession(){
    this.cookieService.deleteAll()
  }

  /** Seta o token de acesso */
  setToken(token:string){
    this.cookieService.set(this.key_token,token)
  }

  /** Pega o token atual */
  getToken(){
    return this.cookieService.get(this.key_token)
  }

  getMe(): Observable<any>{
    let url = this.urlAuth + "/me"
    return this.http.get<any>(url)
  }

  /** Seta os dados do usuário autenticado no front */
  setMe(me:any){
    this.cookieService.set(this.key_me,JSON.stringify(me))
  }

  /** Verifica se o usuario esta autenticado */
  authenticated(){
    let token = this.getToken()
    return (token=='') ? false : true
  }

  /** Retorna os dados do usuario autenticado */
  me(){
    return JSON.parse(this.cookieService.get(this.key_me))
  }


}

import { Injectable } from '@angular/core';
import { Router, CanActivate, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../modules/auth/auth.service';
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    const authenticated = this.authService.authenticated()

    //authenticated------------------
    if (authenticated) {

      if (state.url == '/auth') {
        this.router.navigate(['/']);
        return false;
      }

      return true
    }


    //not authenticated-------------

    if (state.url == '/auth')
      return true

    this.router.navigate(['/auth']);
      return false
  }

}

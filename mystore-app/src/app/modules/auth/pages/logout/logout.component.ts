import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { Location } from '@angular/common';


@Component({
  selector: 'logout',
  template: '',
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {

    Notiflix.Loading.circle('Saindo...')

    this.authService.destroySession()

    setTimeout(()=>{
 
      this.router.navigate(['/login'])
      Notiflix.Loading.remove()      
      
    },1000)

  }

}

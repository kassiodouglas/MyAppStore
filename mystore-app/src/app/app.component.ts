import { Component } from '@angular/core';
import * as Notiflix from 'notiflix';
import { fadeAnimation } from 'src/assets/animations';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `<main [@fadeAnimation]="animate">
    <router-outlet #o="outlet"></router-outlet>
  </main>`,
  animations: [fadeAnimation],

})
export class AppComponent {

  animate = ''

  constructor(private router: Router) {
    Notiflix.Notify.init({ position: 'center-top' });
  }

  ngOnInit(): void {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.animate = event.url
      }
    });

  } 






}

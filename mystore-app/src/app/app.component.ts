import { Component } from '@angular/core';
import * as Notiflix from 'notiflix';


@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {

  constructor(){
    Notiflix.Notify.init({position: "center-top"})
  }



}

import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-layout-default',
  templateUrl: './layout-default.component.html',
  styleUrls: ['./layout-default.component.css'],
})
export class LayoutDefaultComponent implements OnInit {
  links: Array<any> = [
    // {
    //   path: '/auth/logout',
    //   label: 'Sair',
    //   icon:'<i class="fa-solid fa-right-from-bracket text-danger"></i>'
    // },
    
    {
      path: '/',
      label: 'Home',
      icon: '<i class="fa-solid fa-house-user"></i>',
    },


    // {
    //   path: 'meus-dados',
    //   label: 'Meus dados',
    //   icon: '<i class="fa-solid fa-address-book"></i>',
    // },
    {
      id:"admin",
      label: 'Administração',
      icon: '<i class="fa-solid fa-user-tie"></i>',
      links: [
        {
          path: '/admin/usuarios',
          label: 'Usuários',
          icon: '<i class="fa-solid fa-users"></i>',
        },
      ],
    },
  ];

  header:any

  constructor() {}

  ngOnInit() {
    this.header = HeaderComponent
  }
}

import { Component, OnInit } from '@angular/core';
import * as Notiflix from 'notiflix';
import { AuthService } from 'src/app/modules/auth/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  counter: number = 0

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {

    setInterval(() => {
      this.counter++
    }, 1000)
  }

  me() {
    this.authService.getMe().subscribe({
      next: (response) => Notiflix.Notify.success(response.name)
    })
  }

}

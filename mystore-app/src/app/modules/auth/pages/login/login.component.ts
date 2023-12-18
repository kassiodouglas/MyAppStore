import { Component, OnInit } from '@angular/core';
import { fadeIn } from 'src/assets/animations';
import { FormBuilder, Validators, ValidationErrors, FormControl, FormGroup } from '@angular/forms';
import * as Notiflix from 'notiflix';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeIn]
})
export class LoginComponent implements OnInit {

  /** Define qual a tela a exibir */
  screen: boolean = true

  /** Define se exibe ou esconde a senha e a confirmação temporariamente */
  seepass: string = 'password'
  seepass_confirm: string = 'password'


  /** Contem o formulario de login */
  formLogin


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {

    this.formLogin = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })

  }



  ngOnInit() {
  }


  /** Troca a visualização da tela */
  changeScreen() {
    this.screen = !this.screen;
  }

  /** Altera a visualização da senha temporariamente */
  seePassword(force: boolean = false) {
    if (force) {
      this.seepass = 'password'
      return
    }
    this.seepass = (this.seepass == 'password') ? 'text' : 'password'

  }

  /** Altera a visualização da confirmação de senha temporariamente */
  seePasswordConfirm(force: boolean = false) {
    if (force) {
      this.seepass_confirm = 'password'
      return
    }
    this.seepass_confirm = (this.seepass_confirm == 'password') ? 'text' : 'password'
  }

  /** Submit do form de login */
  onLoginFormSubmit() {

    if (!this.formLogin.valid) {
      Notiflix.Notify.warning('Verifique os campos obrigatórios!')
      return
    }

    Notiflix.Loading.circle('Autenticando...')


    this.authService.login(this.formLogin.value).subscribe({
      next: (response) => {
        Notiflix.Loading.remove()



        if (response.access_token) {
          this.authService.setToken(response.access_token)

          this.authService.getMe().subscribe({
            next: (response) => {
              this.authService.setMe(response)
              this.router.navigate(['/'])
            }
          })

          return
        }


      },
      error: (err) => {
        Notiflix.Loading.remove()

        console.error(err)
        Notiflix.Notify.failure(err.message)
      }
    })


  }
}

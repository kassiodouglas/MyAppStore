import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ValidationErrors,
  FormControl,
  FormGroup,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  /** Contem o formulario de novo registro */
  formNewLogin;

  /** Define se exibe ou esconde a senha e a confirmação temporariamente */
  seepass: string = 'password';
  seepass_confirm: string = 'password';

  constructor(private formBuilder: FormBuilder) {
    this.formNewLogin = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      login: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      password_confirmation: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          this.passwordMatchValidator.bind(this),
        ],
      ],
    });
  }

  ngOnInit() {}

  /** Verifica se as senhas são iguais no campo de confirmação */
  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (!this.formNewLogin) return null;

    const password = this.formNewLogin.get('password')?.value;
    const confirmPassword = this.formNewLogin.get(
      'password_confirmation'
    )?.value;

    // Verifica se as senhas coincidem
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  /** Altera a visualização da senha temporariamente */
  seePassword(force: boolean = false) {
    if (force) {
      this.seepass = 'password';
      return;
    }
    this.seepass = this.seepass == 'password' ? 'text' : 'password';
  }

  /** Altera a visualização da confirmação de senha temporariamente */
  seePasswordConfirm(force: boolean = false) {
    if (force) {
      this.seepass_confirm = 'password';
      return;
    }
    this.seepass_confirm =
      this.seepass_confirm == 'password' ? 'text' : 'password';
  }
}

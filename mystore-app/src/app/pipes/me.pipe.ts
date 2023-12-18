import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../modules/auth/auth.service';

@Pipe({
  name: 'me'
})
export class MePipe implements PipeTransform {

  constructor(
    private authService: AuthService
  ){}

  transform(value: any, args?: any): any {

    let me = this.authService.me()

    return me[value]
  }

}

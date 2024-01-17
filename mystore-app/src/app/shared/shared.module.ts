import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputErrorComponent } from './inputError/inputError.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TitleComponent } from './title/title.component';
import { RouterModule } from '@angular/router';
import { TileComponent } from './tile/tile.component';
import { MePipe } from './pipes/me.pipe';


@NgModule({
  imports: [
    CommonModule,
    NgbModule, 
    RouterModule
  ],
  declarations: [
    InputErrorComponent, 
    TitleComponent, 
    TileComponent, 
    MePipe
  ],
  exports:[
    InputErrorComponent,
    TitleComponent,
    TileComponent, MePipe
  ]
})
export class SharedModule { }

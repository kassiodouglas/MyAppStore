import { Component, OnInit } from '@angular/core';
import { fadeIn } from 'src/assets/animations';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss'],
  animations:[fadeIn]
})
export class MeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

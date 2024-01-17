import { Component, OnInit, Input, SimpleChanges,OnChanges } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'inputError',
  templateUrl: './inputError.component.html',
  styleUrls: ['./inputError.component.scss']
})
export class InputErrorComponent implements OnInit {

  @Input() form: any
  instance: any
  @Input() inputName: any
  @Input() messages: any

  @Input() styler = 'message'

  constructor() { }

  ngOnInit() {

    this.instance = this.form.controls[this.inputName]
  }



}

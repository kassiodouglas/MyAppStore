import { Component, OnInit,Input } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'titler',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  @Input() title!:string
  @Input() subtitle!:string

  @Input() level:number = 2
  titleLevel = 'fs1'
  subTitleLevel = 'fs3'

  @Input() breadcumb:boolean = false
  urlActual:string = ''

  constructor(
    private route:Router
  ) { }

  ngOnInit() {
    this.setLevel()
    this.geRoute()
  }

  setLevel(){  
    let titleLevel = (this.level > 5 || this.level < 1) ? 1 : this.level;
    let subTitleLevel = (titleLevel > 5 || titleLevel < 1) ? 3 : titleLevel + 2;
    subTitleLevel = (subTitleLevel > 5) ? 5 : subTitleLevel

    this.titleLevel = `fs${titleLevel}`
    this.subTitleLevel = `fs${subTitleLevel}`
  }

  geRoute(){
    this.urlActual = this.route.url
    console.log(this.route)
  }



}

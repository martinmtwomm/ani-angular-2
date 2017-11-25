import {ElementRef, Input, NgModule, Renderer, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {CarouselModule} from 'ng2-bootstrap/ng2-bootstrap';
import {Http} from "@angular/http";



@NgModule({
  imports: [CommonModule, CarouselModule],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})


export class HomeModule {


  ngOnInit() {

  }


}

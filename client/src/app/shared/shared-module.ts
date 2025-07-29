import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Footer } from './components/footer/footer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Footer,
  ],
  exports: [Footer]
})
export class SharedModule { }

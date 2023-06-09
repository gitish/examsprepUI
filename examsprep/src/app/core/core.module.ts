import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageFooterComponent } from './page-footer/page-footer.component';



@NgModule({
  declarations: [PageHeaderComponent, PageFooterComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    PageHeaderComponent,
    PageFooterComponent
  ]


})
export class CoreModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CategoryComponent
    
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ModalModule.forRoot(),
    FormsModule
  ]
})
export class CategoryModule { }

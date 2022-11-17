import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductComponent
    
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ModalModule.forRoot(),
    FormsModule
  ]
})
export class ProductModule { }

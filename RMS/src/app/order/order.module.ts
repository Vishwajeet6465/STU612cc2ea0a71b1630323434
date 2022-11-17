import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrderComponent,
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ModalModule.forRoot(),
    FormsModule
  ]
})
export class OrderModule { }

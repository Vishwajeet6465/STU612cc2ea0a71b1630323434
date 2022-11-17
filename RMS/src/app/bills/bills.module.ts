import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillsRoutingModule } from './bills-routing.module';
import { BillsComponent } from './bills.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BillsComponent
    
  ],
  imports: [
    CommonModule,
    BillsRoutingModule,
    ModalModule.forRoot(),
    FormsModule
  ]
})
export class BillsModule { }

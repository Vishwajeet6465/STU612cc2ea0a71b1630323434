import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { Bill } from '../shared/modals/bill';
import { OrderBillService } from '../shared/services/order-bill.service';
declare var $:any;
@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {
  @ViewChild('billsModal', { static: false }) billsModal?: ModalDirective;
  @ViewChild('deleteModal', { static: false }) deleteModal?: ModalDirective;
  type:string='';
  bill : Bill= new Bill();
  billList: Bill[] = new Array<Bill>();
  searchText:string='';

  constructor(private orderBillService: OrderBillService) { }

  ngOnInit(): void {
    this.getBillList();
  }

  getBillList() {
    this.orderBillService.getViewBillList().subscribe((res: Bill[]) => {
    if(res.length !== 0){
      this.billList = res;
    }

    });
  }

  searchCustomer(){
    if(this.searchText.length >= 3){
      this.orderBillService.getViewBillList().subscribe((res: Bill[]) => {
        if(res.length !== 0){
          this.billList = res.filter(x=>x.customerName.toLowerCase().includes(this.searchText.toLowerCase()));
        }
      })
    } else{
    this.getBillList();
    }
  }
  openModal(bill:Bill): void {
    this.bill=bill;
      this.billsModal!.show();
  }

  
  getTotalQty(){
    return this.bill.productVM.reduce((n, {quantity}) => n + quantity, 0);
  }
  closeProductModal(form: NgForm) {
    debugger
    form.resetForm();
    form.reset();
    this.bill = new Bill();
    this.billsModal!.hide();
  }

  
  deleteBill(bill:Bill){
  this.deleteModal?.show();
  this.bill = bill;
}

  confirmDeleteBill(){
    var index = this.billList.findIndex(a => a.id === this.bill.id);
    this.billList.splice(index,1);
    this.closeDeleteModal();
  }
  
  closeDeleteModal(){
    this.bill = new Bill();
    this.deleteModal?.hide();
  }

  print(divName:string,bill:Bill){
    debugger
    this.bill=bill;
    setTimeout(()=>{printPage(divName)},2000)
    
  }

}

function printPage(divName:string) {
  debugger
  var contentToPrint = document.getElementById(divName)!.innerHTML;
  var windowPopup = window.open();
  windowPopup!.document.write('<html><head><link rel="stylesheet" type="text/css" href="" /></head><body onload="window.print();window.close()">' + contentToPrint + '</body></html>');
  windowPopup!.document.close();
  window.close();
} 



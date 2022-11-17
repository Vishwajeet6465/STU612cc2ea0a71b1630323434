import { NgFor } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { Bill } from '../shared/modals/bill';
import { ProductVM } from '../shared/modals/product-vm';
import { OrderBillService } from '../shared/services/order-bill.service';
import { Product } from '../shared/modals/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  @ViewChild('productModal', { static: false }) productModal?: ModalDirective;
  @ViewChild('deleteModal', { static: false }) deleteModal?: ModalDirective;
  type: string = '';
  bill: Bill = new Bill();
  productVM: ProductVM = new ProductVM();
  productVMList: ProductVM[] = new Array<ProductVM>();
  dropdownProductList: DropdwonProduct[] = new Array<DropdwonProduct>();

  constructor(private orderBillService: OrderBillService, private router:Router) { }

  ngOnInit(): void {
  }


  openProductModal(form: NgForm): void {
    if (form.valid) {
      this.getProductDropdownList();
      this.productModal!.show();
    }
  }

  getProductDropdownList() {
    this.orderBillService.getProductDropdownList().subscribe((res: Product[]) => {
      this.dropdownProductList = res.map(x => {
        return {
          id: +x.id,
          name: x.name,
          price: x.price,
          categoryName: x.category.name,
        }
      });

    });
  }

  onChangeProduct(event: Event) {
    debugger
    var id = +(event.target as HTMLInputElement).value;
    var currentProduct = this.dropdownProductList.filter(x => x.id === id)[0];
    this.productVM.name = currentProduct?.name!;
    this.productVM.price = currentProduct?.price!;
    this.productVM.categoryName = currentProduct?.categoryName!;
  }

  onQuantityChange() {
    this.productVM.total = this.productVM.price * this.productVM.quantity;
  }

  addProduct(form: NgForm) {
    debugger
    if (form.valid && this.productVM.total !== 0) {
      this.productVMList.push(JSON.parse(JSON.stringify(this.productVM)));
      this.closeProductModal(form);
    }
  }

  closeProductModal(form: NgForm) {
    debugger
    form.resetForm();
    form.reset();
    this.productVM = new ProductVM();
    this.productModal!.hide();
  }


  deleteProduct(product: ProductVM) {
    this.deleteModal?.show();
    this.productVM = product;
  }

  confirmDeleteProduct() {
    var index = this.productVMList.findIndex(a => a.id === this.productVM.id);
    this.productVMList.splice(index,1);
   this.closeDeleteModal();
  }

  closeDeleteModal(){
    this.productVM = new ProductVM();
    this.deleteModal?.hide();
  }

  generateBill(submitBillForm: NgForm){
    if(submitBillForm.valid){
      if(this.productVMList.length !== 0){
        var totalCost = this.productVMList.reduce((n, {total}) => n + total, 0);
        this.bill.billId=new Date().getUTCMilliseconds();
        this.bill.customerName=this.bill.customerName;
        this.bill.mobileNo= this.bill.mobileNo;
        this.bill.productVM=this.productVMList;
        this.bill.total=+totalCost;
        this.bill.createdBy='Admin';
        this.bill.createdDate=new Date();
        this.bill.upadatedBy='Admin';
        this.bill.updatedDate= new Date();
        this.bill.isActive=true;
        this.orderBillService.generateBill(this.bill).subscribe((res:any)=>{
          debugger
          if(res){
            
            this.router.navigate(['/bills']);
          }
        })
      } else{
        alert('please add products');
      }
    }
  }

}

export class DropdwonProduct {
  id: number;
  name: string;
  price: number;
  categoryName: string;
  constructor() {
    this.id = 0;
    this.name = '';
    this.price = 0;
    this.categoryName = '';
  }
}
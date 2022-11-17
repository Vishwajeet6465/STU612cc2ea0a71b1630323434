import { Component, OnInit,ViewChild } from '@angular/core';
import { NgFor } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CategoryVM, Product } from '../shared/modals/product';
import { ProductService} from '../shared/services/product.service';
import { Category } from '../shared/modals/category';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @ViewChild('productModal', { static: false }) productModal?: ModalDirective;
  @ViewChild('deleteModal', { static: false }) deleteModal?: ModalDirective;
  type:string='';
  product : Product= new Product();
  productList: Product[]= new Array<Product>();
  categoryDropdownList: CategoryVM[]= new Array<CategoryVM>();
  searchVM:SearchVM=new SearchVM();
  constructor(private productService : ProductService) { }

  ngOnInit(): void {
    this.getCategoryDropdownList();
    this.getProductList();
  }

  searchProducts(searchForm:NgForm){
    if(searchForm.valid){
      debugger
      this.productService.getCategoryList().subscribe((res:Product[]) => {
        if(res.length !== 0){
          this.productList = res.filter(x=>x.category.id === +this.searchVM.categoryID);
          if(this.searchVM.productName.length >= 3){
            this.productList = this.productList.filter(x=>x.name.toLowerCase().includes(this.searchVM.productName.toLowerCase()));
          }
        }
      });
      
    }
  }

  resetProducts(searchForm:NgForm){
    searchForm.reset();
    this.getProductList();
  }
  
  getProductList(){
    this.productService.getCategoryList().subscribe((res:Product[]) => {
      if(res.length !== 0){
        this.productList = res;
      }
    })
  }

  openProductModal(product:Product): void {
    debugger
    this.getCategoryDropdownList();
    if(this.type==='Update'){
      this.product = JSON.parse(JSON.stringify(product));
    }
    this.productModal?.show();
  }

  getCategoryDropdownList(){
    this.productService.getCategoryDropdownList().subscribe((res: CategoryVM[]) =>{
      this.categoryDropdownList = res.map( x => {
        return {
          id: +x.id,
          name: x.name,
        }
      })
    })
  }
  addProduct(form:NgForm){
    if (form.valid){
      debugger
      // this.product.id=null!;
      this.product.isActive=true;
      this.product.createdBy='Admin';
      this.product.createdDate=new Date();
      this.product.upadatedBy='Admin';
      this.product.updatedDate= new Date();
      this.productService.addProduct(this.product).subscribe((res:any) => {
        if (res != null){
          this.getProductList();
          this.closeProductModal(form);
        }
      })
    }
  }

  onChangeCategory(event : Event){
    var id = +(event.target as HTMLInputElement).value;
    var obj = this.categoryDropdownList.filter(x => x.id === id)[0];
    this.product.category.id = obj.id;
    this.product.category.name = obj.name;
  }

  updateProduct(form:NgForm){
    if (form.valid){
      this.product.isActive=true;
      this.product.createdBy='Admin';
      this.product.createdDate=new Date();
      this.product.upadatedBy='Admin';
      this.product.updatedDate= new Date();
      this.productService.updateProduct(this.product).subscribe((res: any) => {
        if(res != null){
    this.getProductList();
          this.closeProductModal(form);
          alert('Product Updated Successfully.');
        }
      })
    }
  }

  closeProductModal(form:NgForm){
    form.reset();
    this.product = new Product();
    this.product.category = new CategoryVM();
    this.product.category.id=0;
    this.productModal!.hide();
  }

deleteProduct(product:Product){
  this.deleteModal?.show();
  this.product = product;
}

  confirmDeleteProduct(){
    this.product.isActive=false;
    this.product.createdBy='Admin';
    this.product.createdDate=new Date();
    this.product.upadatedBy='Admin';
    this.product.updatedDate= new Date();
    this.productService.updateProduct(this.product).subscribe((res:any)=>{
      debugger
      if(res !== null){
        this.closeDeleteModal();
        alert('Product deleted successfully.');
      }
    });
  }

  closeDeleteModal(){
    this.product = new Product();
    this.getProductList();
    this.deleteModal!.hide();
  }

}


export class CategoryDropdown{
  id:number;
  name:string;
  

  constructor(){
    this.id=null!;
    this.name='';
  }
}

export class SearchVM{
  categoryID:number;
  productName:string;
  constructor(){
    this.categoryID=0;
    this.productName=null!;
  }
}
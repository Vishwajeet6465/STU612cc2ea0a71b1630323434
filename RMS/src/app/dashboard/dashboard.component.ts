import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Bill } from '../shared/modals/bill';
import { Category } from '../shared/modals/category';
import { Product } from '../shared/modals/product';
import { DashboardService} from '../shared/services/dashboard.service';


@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  productList: Product[]= new Array<Product>();
  billList: Bill[]= new Array<Bill>();
  categoryList: Category[]= new Array<Category>();

  constructor(private dashboardService: DashboardService, private router:Router) {
  }

  ngOnInit(): void {
    this.getCategoryList();
    this.getProductList();
    this.getViewBillList();
  
  }

  getCategoryList(){
    this.dashboardService.getCategoryList().subscribe((res:Category[]) =>{
      if(res.length !== 0){
        this.categoryList=res;

      }
    })
  }

  getProductList(){
    this.dashboardService.getProductList().subscribe((res:Product[]) =>{
      if(res.length !== 0){
        this.productList=res;

      }
    })
  }

  getViewBillList(){
    this.dashboardService.getViewBillList().subscribe((res:Bill[]) =>{
      if(res.length !== 0){
        this.billList=res;

      }
    })
  }

  goToScreen(callFrom:string){
    if(callFrom==='Category'){
      this.router.navigate(['/category']);
    }
    if(callFrom==='Product'){
      this.router.navigate(['/product']);
    }
    if(callFrom==='Bill'){
      this.router.navigate(['/bills']);
    }
  }

  
}

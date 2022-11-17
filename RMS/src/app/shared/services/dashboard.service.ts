import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Bill} from '../modals/bill';
import { Category} from '../modals/category';
import { Product} from '../modals/product';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  productUrl : string = "http://localhost:3000/products";
  billUrl : string = "http://localhost:3000/bills";
  categoryUrl : string = "http://localhost:3000/categories";
  

  constructor(private http : HttpClient) { }

  getViewBillList(){
    return this.http.get<Bill[]>(`${this.billUrl}?isActive=true`)
  }

  getCategoryList(){
    return this.http.get<Category[]>(`${this.categoryUrl}?isActive=true`);
  }

  getProductList(){
    return this.http.get<Product[]>(`${this.productUrl}?isActive=true`);
    }
}

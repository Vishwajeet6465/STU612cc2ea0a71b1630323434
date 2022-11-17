import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../modals/product';
import { Bill } from '../modals/bill';

@Injectable({
  providedIn: 'root'
})
export class OrderBillService {
  productUrl : string = "http://localhost:3000/products";
  billUrl : string = "http://localhost:3000/bills";
  constructor(private http : HttpClient) { }

  getProductDropdownList(){
    return this.http.get<Product[]>(`${this.productUrl}?isActive=true`);
  }

  getViewBillList(){
    return this.http.get<Bill[]>(`${this.billUrl}?isActive=true`)
  }

  generateBill(bill:Bill){
    return this.http.post(this.billUrl,bill);
  }

 
}

import { Injectable } from '@angular/core';
import { Product } from '../modals/product';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Category } from '../modals/category';
var headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  categoryUrl : string = 'http://localhost:3000/categories';
  productUrl : string = 'http://localhost:3000/products';
  constructor(private http : HttpClient) { }

  getCategoryDropdownList(){
    return this.http.get<Category[]>(`${this.categoryUrl}?isActive=true`);
  }

  addProduct(product:Product){
    return this.http.post(this.productUrl,product);
  }

  updateProduct(product:Product){
    return this.http.put<Product>(this.productUrl + '/' + product.id, product, headerOption);
  }

  getCategoryList(){
  return this.http.get<Product[]>(`${this.productUrl}?isActive=true`);
  }
}

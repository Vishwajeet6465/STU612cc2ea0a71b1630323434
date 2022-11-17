import { Injectable } from '@angular/core';
import { Category } from '../modals/category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
var headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  categoryUrl : string = "http://localhost:3000/categories";
  constructor(private http : HttpClient) {}

  getCategoryList(){
    return this.http.get<Category[]>(`${this.categoryUrl}?isActive=true`);
  }

  addCategory(category:Category){
    return this.http.post(this.categoryUrl,category);
  }

  updateCategory(category:Category){
    return this.http.put<Category>(this.categoryUrl + '/' + category.id, category, headerOption);
  }
}

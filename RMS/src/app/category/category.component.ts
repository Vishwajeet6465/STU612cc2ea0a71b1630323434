import { NgFor } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Category } from '../shared/modals/category';
import { CategoryService} from '../shared/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @ViewChild('categoryModal', { static: false }) categoryModal?: ModalDirective;
  @ViewChild('deleteModal', { static: false }) deleteModal?: ModalDirective;
  type:string='';
  category : Category= new Category();
  categoryList: Category[]= new Array<Category>();
  searchText:string='';
  
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList(){
    this.categoryService.getCategoryList().subscribe((res:Category[])=>{
      if(res.length !== 0){
        this.categoryList = res;
      }
    })
  }

  searchCategories(){
    if(this.searchText.length >= 3){
      this.categoryService.getCategoryList().subscribe((res:Category[])=>{
        if(res.length !== 0){
          this.categoryList = res.filter(x=>x.name.toLowerCase().includes(this.searchText.toLowerCase()));
        }
      })
    } else{
    this.getCategoryList();
    }
  }

  openCategoryModal(category:Category): void {
    debugger
    if(this.type === 'Update'){
      this.category = category;
    } 
    this.categoryModal!.show();
  }

  closeCategoryModal(form: NgForm) {
    form.resetForm();
    form.reset();
    this.category = new Category();
    this.getCategoryList();
    this.categoryModal!.hide();
  }

  addCategory(form:NgForm){
    if (form.valid) {
      this.category.isActive=true;
      this.category.createdBy='Admin';
      this.category.createdDate=new Date();
      this.category.upadatedBy='Admin';
      this.category.updatedDate= new Date();
      this.categoryService.addCategory(this.category).subscribe((res:any)=>{
        if(res !== null){
          this.closeCategoryModal(form);
          alert('Category added successfully');
        }
      });
    }
  }

  updateCategory(form:NgForm){
    if (form.valid){
      this.category.isActive=true;
      this.category.createdBy='Admin';
      this.category.createdDate=new Date();
      this.category.upadatedBy='Admin';
      this.category.updatedDate= new Date();
      this.categoryService.updateCategory(this.category).subscribe((res:any)=>{
        if(res !== null){
          this.closeCategoryModal(form);
          alert('Category updated successfully');
        }
      });
    }
  }

deleteCategory(category:Category){
  this.deleteModal?.show();
  this.category = category;
}

confirmDeleteCategory(){
  this.category.isActive=false;
  this.category.createdBy='Admin';
  this.category.createdDate=new Date();
  this.category.upadatedBy='Admin';
  this.category.updatedDate= new Date();
  this.categoryService.updateCategory(this.category).subscribe((res:any)=>{
    debugger
    if(res !== null){
      this.closeDeleteModal();
      alert('Category deleted successfully');
    }
  });
  
}

closeDeleteModal(){
  this.category = new Category();
  this.getCategoryList();
  this.deleteModal?.hide();
}

}



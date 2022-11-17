
export class Product {
    id: number;
    name: string;
    price:number;
    category:CategoryVM;
    createdDate: Date;
    createdBy:string;
    updatedDate: Date;
    upadatedBy:string;
    isActive:boolean;

    constructor(){
        this.id = null!;
        this.name = '';
        this.price =null!;
        this.category = new CategoryVM();
        this.createdDate = null!;
        this.createdBy = null!;
        this.updatedDate = null!;
        this.upadatedBy = null!;
        this.isActive=true;
    }
   
}

export class CategoryVM{
    id: number;
    name:string;
    constructor(){
        this.id = 0;
        this.name = null!;
    }
}

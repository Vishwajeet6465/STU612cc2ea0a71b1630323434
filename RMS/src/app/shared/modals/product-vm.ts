export class ProductVM {

    id: number;
    name: string;
    price: number;
    quantity: number;
    total: number;
    categoryName:string;
    createdDate:Date;
    createdBy:boolean;
    updatedDate:Date;
    upadatedBy:boolean;
    isActive:boolean;
    constructor(){
        this.id= null!;
        this.name= null!;
        this.price= null!;
        this.quantity= null!;
        this.total= null!;
        this.categoryName=null!;
        this.createdDate=null!;
        this.createdBy=null!;
        this.updatedDate=null!;
        this.upadatedBy=null!;
        this.isActive=null!;
    }
}

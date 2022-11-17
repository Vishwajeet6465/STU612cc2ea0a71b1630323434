import { ProductVM } from './product-vm';

export class Bill {
    id:number;
        billId: number;
        customerName: string;
        mobileNo: number;
        total:number;
        productVM:ProductVM[];
        createdDate: Date;
        createdBy:string;
        updatedDate: Date;
        upadatedBy:string;
        isActive:boolean;
    constructor(){
        this.id= null!;
        this.billId= null!;
        this.customerName='' ;
        this.mobileNo=null!;
        this.total=null!;
        this.productVM = new Array<ProductVM>();
        this.createdDate=null!;
        this.createdBy=null!;
        this.updatedDate=null!;
        this.upadatedBy=null!;
        this.isActive = true;
    }
    
}

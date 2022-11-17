import { BitwiseOperator } from "typescript/lib/tsserverlibrary";

export class Category {
    id: number;
    name: string;
    isActive: boolean;
    createdDate: Date;
    createdBy:string;
    updatedDate: Date;
    upadatedBy:string;


    constructor(){
        this.id=0;
        this.name='';
        this.createdBy=null!;
        this.isActive=null!;
        this.createdDate= null!;
        this.updatedDate= null!;
        this.upadatedBy= null!;
    }
}

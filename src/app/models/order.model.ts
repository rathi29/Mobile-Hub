import { Mobile } from "./mobile.model";

export interface Order {
    oderId?:number;
    orderPrice?:number;
    quantity?:number;
    mobiles?:Mobile[]
    
}

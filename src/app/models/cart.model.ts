import { Customer } from "./customer.model";
import { Mobile } from "./mobile.model";

export interface Cart {

    cartId?:number;
    mobiles?:any[];
    totalAmount?:number;
    customer?:Customer

}

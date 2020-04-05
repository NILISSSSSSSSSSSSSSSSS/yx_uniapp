import {DefaultModel} from "./DefaultModel";

export class CustomerModel extends DefaultModel{
    constructor() {
        super();
    }
    
    getKey() {
        return "CustomerModel"
    }
    
    getIsLocal() {
        return false;
    }
}

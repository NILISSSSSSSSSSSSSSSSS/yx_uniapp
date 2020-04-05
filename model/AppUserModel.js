

import {DefaultModel} from "./DefaultModel";

export class AppUserModel extends DefaultModel{
    constructor() {
        super();
    }
    
    getKey() {
        return "AppUserModel"
    }
    
    getIsLocal() {
        return false;
    }
}

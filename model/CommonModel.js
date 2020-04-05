import {DefaultModel} from "./DefaultModel";

// 包含的key: enterAppTime(存的16位时间戳), 
export class CommonModel extends DefaultModel{
    constructor() {
        super();
    }

    getKey() {
        return "CommonModel"
    }
    
    getIsLocal() {
        return true;
    }
}

import {DefaultModel} from "../DefaultModel";


// 位置消息
export class PositionChartModel extends DefaultModel{
    constructor() {
        super();
    }

    getKey() {
        return "PositionChartModel"
    }
    
    getIsLocal() {
        return true;
    }
}

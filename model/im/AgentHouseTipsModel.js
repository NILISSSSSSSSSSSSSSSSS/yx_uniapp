import {DefaultModel} from "../DefaultModel";


export class AgentHouseTipsModel extends DefaultModel{
    constructor() {
        super();
    }

    getKey() {
        return "AgentHouseTipsModel"
    }
    
    getIsLocal() {
        return true;
    }
}

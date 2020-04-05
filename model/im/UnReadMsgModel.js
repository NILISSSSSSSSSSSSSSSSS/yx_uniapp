import {DefaultModel} from "../DefaultModel";


export class UnReadMsgModel extends DefaultModel{
    constructor() {
        super();
    }

    getKey() {
        return "UnReadMsgModel"
    }
    
    getIsLocal() {
        return true;
    }
}

// 未读语音
export class UnReadVoiceModel extends DefaultModel{
    constructor() {
        super();
    }
    
    getKey() {
        return "UnReadVoiceModel"
    }
    
    getIsLocal() {
        return true;
    }
}

export class UnReadRemindModel extends DefaultModel{
    constructor() {
        super();
    }
    
    getKey() {
        return "UnReadRemindModel"
    }
    
    getIsLocal() {
        return true;
    }
}

import {DefaultModel} from "../DefaultModel";


export class RemindSetModel extends DefaultModel{
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

// 更新消息提醒状态
export class UpRemindStatus {
    // 更新是否开启声音提醒  1 开启 2 关闭
    static voiceStatus(status = 1) {
        new RemindSetModel().setModel(status, "voiceStatus");
    }
    
    // 更新是否开启震动提醒  1 开启  2 关闭
    static shakeStatus(status = 1) {
        new RemindSetModel().setModel(status, "shakeStatus");
    }
}

// 获取im消息提醒状态
export class GetRemindStatus {
    // 获取声音开启状态
    static voiceStatus() {
        let model = new RemindSetModel().getModel() || {};
        return model.voiceStatus || 1;
    }
    
    // 获取震动开启状态
    static shakeStatus() {
        let model = new RemindSetModel().getModel() || {};
        return model.shakeStatus || 1;
    }
}

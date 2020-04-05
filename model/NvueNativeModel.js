


import {DefaultModel} from "./DefaultModel";

// 两端通信
export class NvueNativeModel extends DefaultModel{
    constructor() {
        super();
    }

    getKey() {
        return "NvueNativeModel"
    }

    getIsLocal() {
        return false;
    }
}
export class SetNvueNativeModel {
    // im实例
    static imChartClass(imChartClass) {
        new NvueNativeModel().setModel(imChartClass, "imChartClass");
    }
}
export class GetNvueNativeModel {
    // im实例
    static imChartClass() {
        return new NvueNativeModel().getIsLocal("imChartClass");
    }
}

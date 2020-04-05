import {RequestApi, RequestApiItem} from "../utils/RequestApi";
import {GetLoginModel} from "../model/LoginSuccessModel";


// 登录 java
export class LoginAppJava extends RequestApi{
    constructor(request) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = request;
        super(item);
    }
    
    getUrl() {
        return "/newBuildWeb/openApi/init/login";
    }
    
    getNeedClientKey() {
        return false;
    }
}

// 忘记密码 java
export class ForgetPassword extends RequestApi{
    constructor(request) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = request;
        super(item);
    }
    
    getUrl() {
        return "/newBuildWeb/openApi/init/forgetPassword";
    }
    
    getNeedClientKey() {
        return false;
    }
}

// 获取验证码 java
export class GetVerificationCode extends RequestApi{
    constructor(request) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = request;
        super(item);
    }
    
    getUrl() {
        return "/newBuildWeb/app/sendMessage/getVerificationCode";
    }
    
    getNeedClientKey() {
        return false;
    }
}

// 头像上传后绑定到用户 java
export class UploadUserPhoto extends RequestApi{
    constructor(request) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = request;
        super(item);
    }
    
    getUrl() {
        return "/newBuildWeb/user/uploadUserPhoto";
    }
    
    getNeedClientKey() {
        return true;
    }
}

// 检查更新 java
export class CheckNewVersion extends RequestApi{
    constructor(request) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = request;
        super(item);
    }

    getUrl() {
        return "/newBuildWeb/openApi/upgrade/checkNewVersion";
    }

    getNeedClientKey() {
        return true;
    }
}

// 设置免打扰 java
export class SetDistractionFree extends RequestApi{
    constructor(request) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = request;
        super(item);
    }
    
    getUrl() {
        return "/newBuildWeb/user/setDistractionFree";
    }
    
    getNeedClientKey() {
        return true;
    }
}

// 修改登录密码 java
export class ModifyPassword extends RequestApi{
    constructor(request) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = request;
        super(item);
    }
    
    getUrl() {
        return "/newBuildWeb/openApi/init/modifyPassword";
    }
    
    getNeedClientKey() {
        return true;
    }
    
    getHeader() {
        if (GetLoginModel.getAccountSource() == 2) {
            return {
                deviceType: 2
            };
        }
        
        return {};
    }
}

// 修改支付密码 java
export class UpdatePayPwd extends RequestApi{
    constructor(request) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = request;
        super(item);
    }
    
    getUrl() {
        return "/newBuildWeb/pad/userManage/updatePayPwd";
    }
    
    getNeedClientKey() {
        return true;
    }
    
    getHeader() {
        if (GetLoginModel.getAccountSource() == 2) {
            return {
                deviceType: 2
            };
        }
        
        return {};
    }
}

// 退出登录 java
export class ExitLogin extends RequestApi{
    constructor(request) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = request;
        super(item);
    }
    
    getUrl() {
        return "/newBuildWeb/openApi/init/evitLogin";
    }
    
    getNeedClientKey() {
        return true;
    }
    
    checkClientKey() {
        return false;
    }
}

// 判断账号来源
export class GetSetting extends RequestApi{
    constructor(request) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = request;
        super(item);
    }
    
    getUrl() {
        return "/newBuildWeb/pad/userManage/getSetting";
    }
    
    getNeedClientKey() {
        return true;
    }
    
    checkClientKey() {
        return true;
    }
}

// 个人信息
export class PersonalCenter extends RequestApi{
    constructor(request) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = request;
        super(item);
    }
    
    getUrl() {
        return "/newBuildWeb/dvlp/org/personalCenter";
    }
    
    getNeedClientKey() {
        return true;
    }
    
    checkClientKey() {
        return true;
    }
}

// 我的 - 成交信息
export class BuildUserData extends RequestApi{
    constructor(request) {
        let item = new RequestApiItem();
        item.domain = "java";
        item.data = request;
        super(item);
    }
    
    getUrl() {
        return "/newBuildWeb/dvlp/build/buildUserData";
    }
    
    getNeedClientKey() {
        return true;
    }
    
    checkClientKey() {
        return true;
    }
}

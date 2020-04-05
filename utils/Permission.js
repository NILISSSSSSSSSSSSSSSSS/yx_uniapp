

export class Permission {
    isIos = false;
    constructor() {
        if (uni.getSystemInfoSync().platform === "ios") {
            this.isIos = true;
        }
    }

    // 开启设置权限页面
    openSet() {
        if (this.isIos) {
            let UIApplication = plus.ios.import("UIApplication");
            let application2 = UIApplication.sharedApplication();
            let NSURL2 = plus.ios.import("NSURL");
            let setting2 = NSURL2.URLWithString("app-settings:");
            application2.openURL(setting2);
            plus.ios.deleteObject(setting2);
            plus.ios.deleteObject(NSURL2);
            plus.ios.deleteObject(application2);
            return;
        }

        let Intent = plus.android.importClass("android.content.Intent");
        let Settings = plus.android.importClass("android.provider.Settings");
        let Uri = plus.android.importClass("android.net.Uri");
        let mainActivity = plus.android.runtimeMainActivity();
        let intent = new Intent();
        intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
        let uri = Uri.fromParts("package", mainActivity.getPackageName(), null);
        intent.setData(uri);
        mainActivity.startActivity(intent);
    }

    // 判断是否开启相机权限 1: 永久拒绝 2：临时拒绝 3：同意
    photoPermission(callback = function () {}) {
        // #ifndef APP-PLUS
        callback(3);
        // #endif

        // #ifdef APP-PLUS
        if (!this.isIos) {
            plus.android.requestPermissions(['android.permission.CAMERA'], function(e){
                if(e.deniedAlways.length>0){	//权限被永久拒绝
                    callback(1);
                    // 弹出提示框解释为何需要定位权限，引导用户打开设置页面开启
                    console.log('Always Denied!!! '+e.deniedAlways.toString());
                }
                if(e.deniedPresent.length>0){	//权限被临时拒绝
                    callback(2);
                    // 弹出提示框解释为何需要定位权限，可再次调用plus.android.requestPermissions申请权限
                    console.log('Present Denied!!! '+e.deniedPresent.toString());
                }
                if(e.granted.length>0){	//权限被允许
                    callback(3);
                    //调用依赖获取定位权限的代码
                    console.log('Granted!!! '+e.granted.toString());
                }
            }, function(e){
                callback(1);
                console.log('Request Permissions error:'+JSON.stringify(e));
            });
        }

        if (this.isIos) {
            let result = 1;
            let AVCaptureDevice = plus.ios.import("AVCaptureDevice");
            let authStatus = AVCaptureDevice.authorizationStatusForMediaType('vide');
            console.log("authStatus:" + authStatus);
            if (authStatus == 3) {
                result = 3;
            }
            callback(result);
            plus.ios.deleteObject(AVCaptureDevice);
        }
        // #endif
    }

    // 判断是否开启语音权限 1: 永久拒绝 2：临时拒绝 3：同意
    voicePermission(callback = function () {}) {
        // #ifndef APP-PLUS
        callback(3);
        // #endif

        // #ifdef APP-PLUS
        if (!this.isIos) {
            plus.android.requestPermissions(['android.permission.RECORD_AUDIO'], function(e){
                if(e.deniedAlways.length>0){	//权限被永久拒绝
                    callback(1);
                    // 弹出提示框解释为何需要定位权限，引导用户打开设置页面开启
                    console.log('Always Denied!!! '+e.deniedAlways.toString());
                }
                if(e.deniedPresent.length>0){	//权限被临时拒绝
                    callback(2);
                    // 弹出提示框解释为何需要定位权限，可再次调用plus.android.requestPermissions申请权限
                    console.log('Present Denied!!! '+e.deniedPresent.toString());
                }
                if(e.granted.length>0){	//权限被允许
                    callback(3);
                    //调用依赖获取定位权限的代码
                    console.log('Granted!!! '+e.granted.toString());
                }
            }, function(e){
                callback(1);
                console.log('Request Permissions error:'+JSON.stringify(e));
            });
        }

        if (this.isIos) {
            let avaudiosession = plus.ios.import("AVAudioSession");
            let avaudio = avaudiosession.sharedInstance();
            let permissionStatus = avaudio.recordPermission();
            console.log("permissionStatus:" + permissionStatus);
            let result = 1;
            if (permissionStatus == 1684369017 || permissionStatus == 1970168948) {
                result = 3;
            }
            callback(result);
            plus.ios.deleteObject(avaudiosession);
        }
        // #endif
    }
    
    // 判断是否开启地理位置权限  1: 永久拒绝 2：临时拒绝 3：同意
    locationPermission(callback = function () {}) {
        if (this.isIos) {
            let cllocationManger = plus.ios.import("CLLocationManager");
            let result = cllocationManger.locationServicesEnabled();
            console.log("系统定位开启:" + result);
            plus.ios.deleteObject(cllocationManger);
            callback(result ? 3 : 1);
            return;
        }
        
        let context = plus.android.importClass("android.content.Context");
        let locationManager = plus.android.importClass("android.location.LocationManager");
        let main = plus.android.runtimeMainActivity();
        let mainSvr = main.getSystemService(context.LOCATION_SERVICE);
        let result = mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER);
        console.log("系统定位开启:" + result);
        callback(result ? 3 : 1);
    }
}

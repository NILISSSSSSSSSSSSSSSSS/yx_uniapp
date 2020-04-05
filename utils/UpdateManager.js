

// 小程序更新
export class UpWxApp {
    constructor() {
        // #ifdef MP
        this.up();
        // #endif
    }

    up() {
        if (!uni.getUpdateManager) return;

        const updateManager = uni.getUpdateManager();

        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            console.log(res.hasUpdate);
        });

        updateManager.onUpdateReady(function (res) {
            uni.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                showCancel: false,
                confirmColor: "#0084ff",
                confirmText: "立即更新",
                success(res) {
                    if (res.confirm) {
                        updateManager.applyUpdate();
                    }
                }
            });
        });

        // 新的版本下载失败
        updateManager.onUpdateFailed(function (res) {
            uni.showModal({
                title: '温馨提示',
                content: '新版本更新失败！请联系客服。',
                showCancel: false,
                confirmColor: "#0084ff",
                confirmText: "我知道了"
            });
        });
    }
}


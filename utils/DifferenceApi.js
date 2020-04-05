

// 由于部分api在不同环境有差异无法使用,所以这个文件的价值得到了体现
export class DifferenceApi {
    // 拨打电话
    makePhoneCall(tel = "") {
        if(!tel) {
            uni.showToast({
            	icon: "none",
                title: "暂无电话，无法拨打"
            });
            return;
        }

        // #ifdef MP-ALIPAY
        my.makePhoneCall({ number: tel });
        // #endif
        // #ifndef MP-ALIPAY
         uni.makePhoneCall({
            phoneNumber: tel
        });
        // #endif
    }

    // 查询节点信息
    boundingClientRect(node = "", page = this) {
        return new Promise((resolve, reject) => {
            if(!node) {
                resolve({});
                return;
            }

            // #ifdef MP-ALIPAY
            this.createSelectorQuery(page)
               .select(node).boundingClientRect().exec((ret) => {
                   resolve((ret && ret[0] ? ret[0] : {}));
               });
            // #endif

            // #ifndef MP-ALIPAY
            this.createSelectorQuery(page)
                .select(node).boundingClientRect(data => {
                   resolve(data || {});
                }).exec();
            // #endif
        });
    }

    // 创建节点
    createSelectorQuery(page = this) {
        // #ifdef H5
        return uni.createSelectorQuery();
        // #endif

        // #ifdef MP-ALIPAY
        return my.createSelectorQuery().in(page);
        // #endif
    
        // #ifdef APP-PLUS
        return uni.createSelectorQuery();
        // #endif

        // #ifndef MP-ALIPAY || H5 || APP-PLUS
        return uni.createSelectorQuery().in(page);
        // #endif
    }

	// 授权获取code
    getAuthCode(callback = function () {}) {
        // #ifdef MP-ALIPAY
        my.getAuthCode({
            scopes: 'auth_user',
            success: (res) => {
               callback({code: res.authCode});
            },
        });
        // #endif

        // #ifdef MP-BAIDU
        swan.login({
            success: function (res) {
               callback({code: res.code});
            },
        });
        // #endif

        // #ifndef MP-WEIXIN
        uni.login({
        	success: function (loginRes) {
               callback({code: res.code});
            }
        });
        // #endif
    }

    // 设置title
    setNavigationBarTitle(info = {}) {
        // #ifdef MP-ALIPAY
        my.setNavigationBar(info);
        // #endif

        // #ifndef MP-ALIPAY
        uni.setNavigationBarTitle(info);
        // #endif
    }
    
    // toast
    showToast(text, icon = "none", position = "bottom") {
        // #ifdef APP-PLUS
        plus.nativeUI.toast(text);
        // #endif
        
        // #ifndef APP-PLUS
        uni.showToast({title: text, icon: icon, position: position, mask: true});
        // #endif
    }
}

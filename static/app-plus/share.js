

import {Const} from "../../utils/Const";
import {Config} from "../../utils/config";
import {ConsoleModel} from "../../model/ConsoleModel";
import {formatDate} from "../../utils/common";


// 初始化分享按钮
export class InitShareMenu {
    shareList = [];
    alphaBg = null;  // 弹窗初始化val
    shareMenu = null;  // 按钮初始化val

	// shareList 传 分享的实例化类 例如[new ShareWxAppToSession(params)]
    constructor(shareList) {
    	if (!shareList || shareList.length === 0) {
            shareList = [];
		}
        this.shareList = shareList;
	}

	// 如果是ts，则这个方法要写成private
    init(callback = function () {}) {
    	// #ifdef APP-PLUS || APP-PLUS-NVUE
    	let that = this;
		//以下为计算菜单的nview绘制布局，为固定算法，使用者无关关心
        let screenWidth = plus.screen.resolutionWidth;
        //以360px宽度屏幕为例，上下左右边距及2排按钮边距留25像素，图标宽度55像素，同行图标间的间距在360宽的屏幕是30px，但需要动态计算，以此原则计算4列图标分别的left位置
        //图标下的按钮文字距离图标5像素，文字大小12像素
        //底部取消按钮高度固定为44px
        //TODO 未处理横屏和pad，这些情况6个图标应该一排即可
        let marginTop = 25,//上间距
            marginLeft=25,//左间距
            iconWidth = 55,//图标宽宽
            iconHeight=55,//图标高度
            icontextSpace = 10,//图标与文字间距
            textHeight = 12;//文字大小
        let left1 = marginLeft / 360 * screenWidth;
        let colNumber = Math.floor(screenWidth/(iconWidth+marginLeft));
        let i=(screenWidth-(iconWidth+marginLeft)*colNumber-marginLeft)/(colNumber+1);
        let initMargin=marginLeft+i;
        let itemWidth=iconWidth+initMargin;
        let itemHeight=iconHeight+icontextSpace+textHeight+marginTop;
        let textTop=iconHeight+icontextSpace;
        let shareMenu = new plus.nativeObj.View("shareMenu", { //创建底部图标菜单
            bottom: '0px',
            left: '0px',
            height: Math.ceil(that.shareList.length/colNumber)*itemHeight+marginTop+44+1+'px',
            width: '100%',
            backgroundColor: 'rgb(255,255,255)'
        });
        let alphaBg = new plus.nativeObj.View("alphaBg", { //先创建遮罩层
            top: '0px',
            left: '0px',
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)'
        });
        alphaBg.addEventListener("click", function() { //处理遮罩层点击
            alphaBg.hide();
            shareMenu.hide();
        });

        //绘制底部图标菜单的内容
        shareMenu.draw([
            {
                tag: 'rect',//菜单顶部的分割灰线
                color: '#f5f5f5',
                position: {
                    top: '0px',
                    height: '1px'
                }
            },
            {
                tag: 'font',
                id: 'sharecancel',//底部取消按钮的文字
                text: '取消',
                textStyles: {
                    size: '16px',
                    color: "#ff5400"
                },
                position: {
                    bottom: '0px',
                    height: '44px'
                }
            },
            {
                tag: 'rect',//底部取消按钮的顶部边线
                color: '#f5f5f5',
                position: {
                    bottom: '45px',
                    height: '1px'
                }
            }
        ]);
        this.shareList.map((v,k)=>{
            let time=new Date().getTime();
            let row=Math.floor(k/colNumber);
            let col=k%colNumber;
            let item=[{
                src:v.getBtnConfig().icon,
                id:Math.random()*1000+time,
                tag:"img",
                position:{
                    top:row*itemHeight+marginTop,
                    left:col*itemWidth+initMargin,
                    width:iconWidth,
                    height:iconWidth
                }
            },{
                text:v.getBtnConfig().text,
                id:Math.random()*1000+time,
                tag:"font",
                textStyles:{
                    size: textHeight
                },
                position:{
                    top:row*itemHeight+textTop,
                    left:col*itemWidth+initMargin,
                    width:iconWidth,
                    height:iconWidth
                }
            }];
            shareMenu.draw(item);
        });
        shareMenu.addEventListener("click", function(e) { //处理底部图标菜单的点击事件，根据点击位置触发不同的逻辑
        	if (e.screenY > plus.screen.resolutionHeight - 44) { //点击了底部取消按钮
                alphaBg.hide();
                shareMenu.hide();
                return;
            }

            //屏幕左右边缘5像素及菜单顶部5像素不处理点击
            if (e.clientX < 5 || e.clientX > screenWidth - 5 || e.clientY < 5) {
				return;
            }

            //点击了图标按钮
			let x = e.clientX;
			let y = e.clientY;
			let colIdx = Math.floor(x/itemWidth);
			let rowIdx = Math.floor(y/itemHeight);
			let clickIndex = colIdx+rowIdx*colNumber;
            that.hide();
            that.shareList[clickIndex].initConfig(function (res) {
                callback(clickIndex, res);
            });
        });
        this.alphaBg = alphaBg;
        this.shareMenu = shareMenu;
        // #endif
	}

	// 关闭
    hide() {
    	if (!this.alphaBg || !this.shareMenu) return;

        this.alphaBg.hide();
        this.shareMenu.hide();
	}

	// 显示
	show() {
        if (!this.alphaBg || !this.shareMenu) return;

        this.alphaBg.show();
        this.shareMenu.show();
	}
}

// 分享default
export class ShareDefault {
	weiXinProvider = "weixin";  // 微信provider(分享服务提供商)
	qqProvider = "qq";  // qq provider
	weiBoProvider = "sinaweibo";  // 微博 provider
    WXSceneSession = "WXSceneSession";  // 分享到聊天界面
    WXSenceTimeline = "WXSenceTimeline";  // 分享到朋友圈
    WXSceneFavorite = "WXSceneFavorite";  // 分享到微信收藏
	wxAppProEnv = 0;
	wxAppBetaEnv = 2;
	wxAppDevEnv = 1;

    constructor(props) {}

    // 获取分享配置参数
    getConfig() {
    	class ShareConfig {
            provider = "";  // 分享服务提供商
			// 1: 纯文字   2: 纯图片  3: 音乐(支持度provider: weixin、qq)
			// 4: 视频(支持度provider: weixin、sinaweibo)
            type = 0;  // 分享类型。默认图文 0(支持度provider: weixin、sinaweibo)  5: 微信小程序
            title = "";  // 标题
            scene = "";  //  provider 为 weixin 时必选
            summary = "";  // 摘要(type 为 1 时必选)
            href = "";  // 跳转链接(type 为 0 时必选)
            imageUrl = "";  // 图片地址，type为0时，图片大小于 20Kb(type 为 0、2、5 时必选)
            mediaUrl = "";  // 音视频地址(type 为 3、4 时必选)
			// 分享小程序必要参数(type 为 5 时必选)
            miniProgram = {
                id: "",   // 微信小程序原始id
				path: "", // 点击链接进入的页面
                type: this.wxAppProEnv, // 微信小程序版本类型 0-正式版；1-测试版；2-体验版。默认值为0。
                webUrl: 'http://uniapp.dcloud.io'
			};
            success = () => {};
            fail = () => {};
            complete = () => {};
		}
		return new ShareConfig();
	}

	// 初始化配置
	initConfig(successCallback = function () {}, failCallback = function () {}) {
    	let obj = this.returnConfig();
    	let params = {};
        obj.success = function(res) {
        	uni.showToast({title: "分享成功", icon: "none"});
            successCallback(res);
		};
        obj.fail = function(err) {
            console.log(JSON.stringify(err));
        	let val = new ConsoleModel().setModel() || [];
        	let time = new Date().getTime();
        	let dateVal = new formatDate(new Date(time));
            val.push({
                id: time,
                name: dateVal.getYear() + "年" + dateVal.getMonth() + "月" + dateVal.getDay() + "日"
                    + " " + dateVal.getHour() + ": " + dateVal.getMinute(),
                key: "分享失败",
                value: JSON.stringify(err)
            });
            new ConsoleModel().setModel(val);
        	uni.showToast({title: "分享失败" + JSON.stringify(err), icon: "none"});
            failCallback(err);
		};
        for (let key in obj) {
            if (obj[key] === "") continue;

            params[key] = obj[key];
        }
        uni.share(params);
	}

	// 返回自定义配置
	returnConfig() {
    	return this.getConfig();
	}

	// 按钮文案和icon
	getBtnConfig() {
    	return {};
	}
}

// 分享小程序给好友
export class ShareWxAppToSession extends ShareDefault {
    imageUrl = "";
    path = "";
    title = "";

	constructor(imageUrl, path, title) {
		super();
        this.imageUrl = imageUrl;
        this.path = path;
        this.title = title;
    }

    returnConfig() {
		let map = new Map()
			.set("dev", this.wxAppDevEnv)
			.set("beta", this.wxAppBetaEnv)
			.set("pro", this.wxAppProEnv);
		let config = this.getConfig();
		config.provider = this.weiXinProvider;
		config.scene = this.WXSceneSession;
		config.type = 5;
		config.title = this.title;
		config.imageUrl = this.imageUrl;
        config.miniProgram.id = Const.wxAppOriginalId;
        config.miniProgram.path = this.path;
        config.miniProgram.type = map.has(Config.env) ? map.get(Config.env) : this.wxAppProEnv;
		return config;
	}

	getBtnConfig() {
		return {
            icon:"/static/app-plus/sharemenu/wx.png",
            text:"微信好友"
		}
	}
}

// 分享到微信朋友圈
export class ShareWxWebToTimeline extends ShareDefault {
    imageUrl = "";
    href = "";
    title = "";

    constructor(imageUrl, href, title) {
        super();
        this.imageUrl = imageUrl;
        this.href = href;
        this.title = title;
    }

    returnConfig() {
        let config = this.getConfig();
        config.provider = this.weiXinProvider;
        config.scene = this.WXSenceTimeline;
        config.type = 0;
        config.title = this.title;
        config.imageUrl = this.imageUrl;
        config.href = this.href;
        return config;
    }

    getBtnConfig() {
        return {
            icon:"/static/app-plus/sharemenu/pyq.png",
            text:"朋友圈"
        }
    }
}

// 分享给qq好友
export class ShareWebToQQSession extends ShareDefault {
    imageUrl = "";
    href = "";
    title = "";

    constructor(imageUrl, href, title) {
        super();
        this.imageUrl = imageUrl;
        this.href = href;
        this.title = title;
    }

    returnConfig() {
        let config = this.getConfig();
        config.provider = this.qqProvider;
        config.scene = this.WXSceneSession;
        config.type = 0;
        config.title = this.title;
        config.imageUrl = this.imageUrl;
        config.href = this.href;
        return config;
    }

    getBtnConfig() {
        return {
			icon:"/static/app-plus/sharemenu/qq.png",
			text:"qq好友"
        }
    }
}

// 分享到微博
export class ShareWebToWeiBoTimeline extends ShareDefault {
    imageUrl = "";
    href = "";
    title = "";

    constructor(imageUrl, href, title) {
        super();
        this.imageUrl = imageUrl;
        this.href = href;
        this.title = title;
    }

    returnConfig() {
        let config = this.getConfig();
        config.provider = this.weiBoProvider;
        config.scene = this.WXSceneSession;
        config.type = 0;
        config.summary = "我在优优好房上看到一套很不错的房源，你也来看看！";
        config.title = this.title;
        config.imageUrl = this.imageUrl;
        config.href = this.href;
        return config;
    }

    getBtnConfig() {
        return {
			icon:"/static/app-plus/sharemenu/weibo.png",
			text:"微博"
        }
    }
}

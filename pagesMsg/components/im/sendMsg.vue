<template>
	<view class="send_msg_cont">
		<view class="send_msg f_r_b">
			<view class="send_msg_left f_r_s">
				<image @click.stop="changeVoiceType" :class="[voiceMap[voiceBtnShow].className]"
					   :src="voiceMap[voiceBtnShow].src" mode="aspectFit"></image>

				<input class="send_input f_r_s" placeholder="请输入聊天内容"
					   @input="sendTextInput" @focus="sendTextFocus" v-show="!voiceBtnShow"
					   :focus="inputFocus" cursor-spacing="4"
					   :adjust-position="adjustPosition"
					   placeholder-style="color: #c0c1c3;"
					   confirm-type="发送" confirm-hold="true" @confirm="sendTextBtn"
					   :value="inputText"/>

				<view @touchstart="recordStart" @touchend="recordEnd"
					 @touchmove.stop.prevent="recordMove"
					 :class="[isAnBtn ? 'anzhu_btn_active' : '' ]"
					 class="anzhu_btn" v-if="voiceBtnShow">
					<text class="anzhu_btn_text">{{ isAnBtn ? '松开 发送' : '按住 说话' }}</text>
				</view>
			</view>

			<view class="send_msg_right f_r_e">
				<image @click.stop="changeEmojiType" :class="[emojiMap[emojiBtnShow].className]"
					   :src="emojiMap[emojiBtnShow].src"></image>

				<image v-if="!inputText" class="send_more_type"
					   src="http://cdn.haofang.net/static/xfyx-uniapp/msg/more_send.png"
					   @click.stop="lookMoreSendType"></image>

				<view @click.stop="sendTextBtn" v-if="inputText"
					  class="send_text_btn f_r_c">
					<text class="send_text">发送</text>
				</view>
			</view>
		</view>

		<!-- 表情swiper -->
		<view v-if="emojiBtnShow" class="send_emoji_list">
			<swiper class="send_emoji_swiper" indicator-dots indicator-active-color="#999999" indicator-color="#e5e5e5">
				<block v-for="(info, key) in emojiSwiperList" :key="key">
					<swiper-item class="send_emoji_swiper_item f_r_s">
						<view @click="addEmoji(emojiItem)" class="send_emoji_item_view f_r_c"
							v-for="(emojiItem, index) in info" :key="index">
							<image mode="aspectFit" class="send_emoji_img" :src="emojiItem.img"></image>
						</view>

						<view @click="delEmoji" class="send_emoji_del f_c_c">
							<view class="send_emoji_del_img"></view>
						</view>
					</swiper-item>
				</block>
			</swiper>
		</view>

		<!-- 更多功能 -->
		<view v-if="moreTypeShow" class="send_more_type_list f_r_s">
			<view @click="senMoreMsg(item)" class="send_more_type_item f_c_c"
				 :style="{'margin-right': (index+1)%3 == 0 ? '0' : ''}"
				 v-for="(item, index) in moreSendTypeList" :key="index">
				<image class="send_more_img_view" :src="item.imgSrc"></image>
				<view class="send_more_text">{{ item.text }}</view>
			</view>
		</view>

		<!--录音弹窗-->
		<view @touchmove.stop.prevent="" v-if="voiceTcShow" class="voice_tc_view f_c_c">
			<view :class="[voiceCancelSend ? 'voice_tc_cont_active':'']" class="voice_tc_cont f_c_c">
				<view class="voice_tc_time">{{ voiceCancelSend ? '' : voiceTimeLength }}</view>
				<image v-if="voiceCancelSend" class="che_hui" src="http://cdn.haofang.net/static/xffx-uniapp/msg/chehui.png"></image>
				<image v-if="!voiceCancelSend" class="send_voice_new" src="http://cdn.haofang.net/static/xffx-uniapp/msg/send_voice_new.png"></image>
				<view v-if="voiceCancelSend" class="voice_tc_des">{{ voiceTcDes }}</view>
				<view v-if="!voiceCancelSend" class="voice_tc_des" :class="[voiceCancelSend ? 'voice_cancel_send' : '']">{{ voiceTcDes }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { Notify } from "@/utils/Notify.js";
	import { Notification } from "@/utils/Notification.js";
	import { ChartDetailItem, DealChartDetail, GetEmojiMap } from "@/utils/ImChart.js";
	import { formatTimeNew } from "@/utils/common.js";
	import { DealLastMsgTime, ImSendMessage } from "@/utils/ImChart.js";
    import {ImEvaluateDeal} from "@/utils/ImEvaluateDeal";
	import {Permission} from "../../../utils/Permission";
	import {GpsInfoModel} from "../../../model/GpsInfoModel";
	import {PositionChartItem} from "../../../utils/ImChart";
	import {DifferenceApi} from "../../../utils/DifferenceApi";

	// #ifndef MP-ALIPAY || H5
	let recorderManager = null;
	// #endif
	let NcClickInfoTimeOutVal = null;
	let privateData = {
		addEmojiList: [],
		recordTimeOutVal: null,
        voiceStartTime: 0,  // 录音开始时间
		isClickPhoto: false,  // 是否点击过相机
		haveLocationAuthSetting: false, // 是否有地理位置权限
	};

	export default {
		data() {
			return {
                adjustPosition: true,

				oftenUseBtnShow: false,   // 常用语和输入法切换
				oftenUseMap: {
					false : {
						src: "http://cdn.haofang.net/static/uuminiapp/im/useful-word.png",
						className: "chang_yong_yu"
					},
					true : {
						src: "http://cdn.haofang.net/static/uuminiapp/im/keyboard-new.png",
						className: "chang_input_icon"
					}
				},

				emojiBtnShow: false,   // 表情和输入法的切换
				emojiMap: {
					false: {
						src: "http://cdn.haofang.net/static/xfyx-uniapp/msg/emoji_send.png",
						className: "emoji_type_input"
					},
					true: {
						src: "http://cdn.haofang.net/static/xfyx-uniapp/msg/emoji_send.png",
						className: "key_type_input"
					}
				},

				// 语音切换
				voiceBtnShow: false,
				voiceMap: {
					false: {
						src: "http://cdn.haofang.net/static/xfyx-uniapp/msg/voice_send.png",
						className: "voice_type_input"
					},
					true: {
						src: "http://cdn.haofang.net/static/xffx-uniapp/msg/keyword_new.png",
						className: "voice_type_input"
					}
				},

				// input focus
				inputFocus: false,

				moreTypeShow: false,  // 更多

				// 常用语列表
				oftenUserList: [
					'这套房子的情况能给我详细介绍一下吗？',
					'什么时候可以看房呢？',
					'这套房子价格怎样？是必须全款吗？',
					'可以按揭吗？商贷/公积金贷都可以吗？',
					'有装修比较新的房子吗？',
					'这房子房东还有抵押吗？',
					'你们公司收佣是多少呢？',
					'你好，我想要这个区套三双卫的精装房，能帮我推荐几套合适的房子吗？',
					'我想看看附近的学区房，麻烦给我推荐一下，谢谢！',
					'你好，我想咨询几个买房问题',
					'你们会帮忙办理过户等后续手续吗？',
					'小区环境怎么样？还有周边的交通和配套如何？',
					'有啥优惠政策没？'
				],

				// 表情swiper
				emojiSwiperList: {},

				// 更多功能列表
				moreSendTypeList: [
					{
						event: "getPhoto",
						imgSrc: "http://cdn.haofang.net/static/xfyx-uniapp/msg/ablum_send.png",
						text: "相册",
						size: "55%",
						className: "album_send"
					},
					{
						event: "getTakePhoto",
						imgSrc: "http://cdn.haofang.net/static/xfyx-uniapp/msg/photo_send.png",
						text: "拍摄",
						size: "55%",
						className: "camera_send"
					},
					{
						event: "getPosition",
						imgSrc: "http://cdn.haofang.net/static/xfyx-uniapp/msg/position_send.png",
						text: "位置",
						size: "55%",
						className: "camera_send"
					}
				],

				// 语音录制相关参数
				voiceTcShow: false,
				voiceTimeLength: "00:00",
				voiceTcDes: "手指上滑，取消发送",
				voiceCancelSend: false, // 是否是取消发送语音

				// input text
				inputText: "",
				isPingBi: false,  // 是否是屏蔽
				startRecord: false,  // 开始录音
				isService: false,  // 是否是客服
                haveVoiceAuthSetting: false,  // 是否有语音权限
			}
		},

		props: {
			messageId: {
				type: String,
				default: ""
			},
			isShield: {
				type: String | Number,
				default: 0
			},
            chartList: {
			    type: Array,
				default() {
			        return [];
				}
			}
		},

		watch: {
			isShield() {
				if(this.isShield == 1) {
					this.isPingBi = true;
				} else{
					this.isPingBi = false;
				}
			},
            chartList() {
				this.initShowEvaluateBtn();
			}
		},

		mounted() {
            this.initShowEvaluateBtn();
            let that = this;
			this.initEmojiSwiperData();
			// 监听点击scroll区域
			new Notification().addObserver(this, "ClickChartDetailScroll", Notify.ClickChartDetailScroll.Name);
			this.isPingBi = !!(this.isShield == 1);
			this.isService = !!(this.messageId == this.ImChart.getServiceId());
			// #ifdef MP
			uni.getSetting({
				success(res) {
					that.haveVoiceAuthSetting = res.authSetting['scope.record'] || false;
					privateData.haveLocationAuthSetting = res.authSetting['scope.userLocation'] || false;
				}
			});
			// #endif

			// #ifdef APP-PLUS
			setTimeout(() => {
				that.checkHaveVoicePermission();
			}, 300);
			// #endif
		},

		destroyed() {
		    // 反注册通知
		    new Notification().removeObserverAllNotification(this);
		},

		methods: {
		    // 判断是否显示评价按钮
			initShowEvaluateBtn() {
                // 动态判断显示评价按钮
                new ImEvaluateDeal(this.chartList).showEvaluateBtn((val) => {
                    // console.error("--showEvaluateBtn---",val);
					// 先不显示
                    val = false;
                    let moreSendTypeList = this.moreSendTypeList;
                    let evaluateHas = moreSendTypeList.findIndex(info => {
                        return info.event === "evaluateSend";
                    });
                    do {
                        if (!val) {
                            if (evaluateHas !== -1) {
                                moreSendTypeList.splice(evaluateHas, 1);
                            }
                            break;
                        }

                        let evaluateItem = {
                            event: "evaluateSend",
                            imgSrc: "http://cdn.haofang.net/static/kdbweb/zdzfminiapp/zdzfPlatform/common/evaluate.png",
                            text: "评价",
                            size: "50%",
                        };
                        if (evaluateHas === -1) {
                            moreSendTypeList.push(evaluateItem);
                        }
                    }while (false);
                    this.moreSendTypeList = moreSendTypeList;
                });
			},

			// 初始化表情
			initEmojiSwiperData() {
				let map = new GetEmojiMap().dealEmojiSwiperData();
				this.emojiSwiperList = map.emojiList || {};
			},

			// 切换常用语和文字输入
			changeOftenUseType() {
				this.oftenUseBtnShow = !this.oftenUseBtnShow;
				if(this.oftenUseBtnShow) {
					this.emojiBtnShow = false;
					this.moreTypeShow = false;
				}
                this.$emit("OnMoreSendChanged", this.oftenUseBtnShow);
				this.NcClickInfo();
			},

			// 切换表情和文字输入
			changeEmojiType() {
				this.emojiBtnShow = !this.emojiBtnShow;
				if(this.emojiBtnShow) {
					this.oftenUseBtnShow = false;
					this.moreTypeShow = false;
				}
                this.$emit("OnMoreSendChanged", this.oftenUseBtnShow);

				this.NcClickInfo({
					type: "emoji",
					value: this.emojiBtnShow
				});
			},

			// 切换语音和文字输入
			changeVoiceType() {
				this.voiceBtnShow = !this.voiceBtnShow;
				if(this.voiceBtnShow) {
					this.oftenUseBtnShow = false;
					this.moreTypeShow = false;
				}
				this.$emit("OnMoreSendChanged", this.oftenUseBtnShow);
				this.NcClickInfo();
				if(!this.voiceBtnShow) {
					this.inputFocus = true;
				}else {
					this.inputFocus = false;
				}
			},

			// 切换更多功能
			lookMoreSendType() {
				if(this.startRecord) {
					this.startRecord = false;
					return;
				}

				this.moreTypeShow = !this.moreTypeShow;
				if(this.moreTypeShow) {
					this.oftenUseBtnShow = false;
					this.emojiBtnShow = false;
				}
                this.$emit("OnMoreSendChanged", this.moreTypeShow);
				this.NcClickInfo({
					type: "more",
					value: this.moreTypeShow
				});
			},

			// 点击scroll区域的回调
			ClickChartDetailScroll() {
                let that = this;
                this.moreTypeShow = false;
                this.oftenUseBtnShow = false;
                this.emojiBtnShow = false;
                this.$emit("OnMoreSendChanged", false);
                this.NcClickInfo({type: "normal", disabledScroll: true});
			},

			// 点击推送
			NcClickInfo(info = {}) {
				clearTimeout(NcClickInfoTimeOutVal);
				NcClickInfoTimeOutVal = null;
				NcClickInfoTimeOutVal = setTimeout(() => {
					if (uni.getSystemInfoSync().platform === "ios") {
						info.disabledScroll = true
					}
					new Notification().postNotification(Notify.ClickChartMoreInfo.Name, info);
				}, 100);
			},

			// 更多点击
			senMoreMsg(item) {
				if(this.isPingBi && item.event != "pingBiChart") {
					uni.showToast({
						title: '您已把对方屏蔽，解除屏蔽后才能进行联系',
						icon: 'none',
						duration: 2000
					});
					return;
				}

				this[item.event](item);
			},

			// 选择图片
			getPhoto(item) {
				this.getTakePhoto(item, ["album"]);
			},
			// 拍照
			getTakePhoto(item, sourceType = ["camera"]) {
				let that = this;
				new Permission().photoPermission((val) => {
					if (val === 1) {
						uni.showModal({
							title: "",
							content: "请打开设置-允许相机权限",
							showCancel: false,
							confirmText: "去开启",
							confirmColor: "#3396fb",
							success: (res) => {
								if(res.confirm) {
									new Permission().openSet();
								}
							}
						});
						return;
					}

					if (val === 3) {
						uni.chooseImage({
							count: 9,
							sourceType: sourceType,
							success: function(res) {
								for (let tempSrc of (res.tempFilePaths || [])) {
									// #ifdef H5
									let canvas = document.createElement('canvas');
									let ctx = canvas.getContext('2d');
									let img = new Image;
									img.crossOrigin = 'Anonymous';
									img.onload = function(){
										//生成比例
										let width = img.width, height = img.height;
										//计算缩放比例
										let maxLen = 720;
										let rate = 1;
										let widthBi = parseInt(width/maxLen);
										let heightBi = parseInt(height/maxLen);
										if(widthBi >= 1.6 || heightBi >= 1.6) {
											rate =  0.6 - ( 0.7*(widthBi > heightBi ? widthBi : heightBi)/10);
											if(rate < 0.15) {
												rate = 0.15
											}
										}
										img.width = width * rate;
										img.height = height * rate;
										//生成canvas
										let ctx = canvas.getContext("2d");
										canvas.width = img.width;
										canvas.height = img.height;
										ctx.drawImage(img, 0, 0, img.width, img.height);
										let base64 = canvas.toDataURL('image/jpeg', 0.9);
										canvas = null;
										that.uploadImg(base64);
									};
									img.src = tempSrc;
									// #endif

									// #ifdef  APP-PLUS
									that.uploadImg(tempSrc);
									// #endif

									// #ifdef MP
									that.uploadImg(tempSrc);
									// #endif
								}
							},
						});
					}
				});
			},
			// 上传图片
			uploadImg(url = "") {
				if(!url) {
					this.DifferenceApi.showToast("暂无图片路径，无法发送");
					return;
				}

				if(!this.messageId) {
					this.DifferenceApi.showToast("暂无收件人id");
					return;
				}

				let time = new Date().getTime();
				new ImSendMessage(this.messageId).sendImage(url)
					.then((file) => {
						let item = new ChartDetailItem();
						item.type = "img";
						item.content = file.url;
						item.width = file.w;
						item.height = file.h;
						item.mySend = true;
						item.isRead = false;
						item.timeStr = time;
						item.isSendUser = true;
						item.time = formatTimeNew(time);
						item.showTime = DealLastMsgTime.checkShowTime(this.messageId, time);
						DealLastMsgTime.setTime(time, this.messageId);
						new Notification().postNotification(Notify.UpChartMsgChanged.Name, item);
					});
			},

			// 发送常用语
			sendOftenUseMsg(text = "") {
				if(this.isPingBi) {
					uni.showToast({
						title: '您已把对方屏蔽，解除屏蔽后才能进行联系',
						icon: 'none',
						duration: 2000
					});
					return;
				}

				this.sendTextMsgCommon(text);
			},
			// 发送input
			sendTextInput(e) {
				let value = e.detail.value;
				value = value.replace(/(^\s*)|(\s*$)/g, "");
				this.inputText = value;
			},
			// input focus
			sendTextFocus(e) {
				this.NcClickInfo();
				this.$emit("onInputFocus", {height: e.detail.height});
			},
			// 发送btn
			sendTextBtn() {
				if(this.isPingBi) {
					uni.showToast({
						title: '您已把对方屏蔽，解除屏蔽后才能进行联系',
						icon: 'none',
						duration: 2000
					});
					return;
				}

				this.sendTextMsgCommon(this.inputText);
				this.inputText = "";
			},
			// 添加表情
			addEmoji(item) {
				this.inputText += item.fileName;
				privateData.addEmojiList.push(item.fileName);
			},
			// 删除表情
			delEmoji() {
				if(privateData.addEmojiList.length === 0) return;

				let str = this.inputText;
				let delFileName = privateData.addEmojiList[privateData.addEmojiList.length - 1];
				let i = str.lastIndexOf(delFileName);
				str = str.substring(0,i) + str.substring(i+delFileName.length,str.length);
				this.inputText = str;
			},
			// 发送的通用方法
			sendTextMsgCommon(text) {
				new ImSendMessage(this.messageId).sendText(text)
					.then(() => {
						let emoji =  new DealChartDetail().dealEmoji(text);
						let item = new ChartDetailItem();
						item.type = "text";
						item.content = text;
						item.mySend = true;
						item.timeStr = new Date().getTime();
						item.time = formatTimeNew(new Date().getTime());
						item.emoji = emoji;
						item.isRead = false;
						item.hasEmoji = (emoji[1].length > 0);
						item.showTime = DealLastMsgTime.checkShowTime(this.messageId, new Date().getTime());
						DealLastMsgTime.setTime(new Date().getTime(), this.messageId);
						new Notification().postNotification(Notify.UpChartMsgChanged.Name, item);
					});
			},


			// 发送视频
            videoSend() {
			    let that = this;
                uni.chooseVideo({
                    count: 1,
                    sourceType: ['camera', 'album'],
                    compressed: true,
                    success: function (res) {
                        new ImSendMessage(that.messageId).sendVideo(res.tempFilePath)
							.then(url => {
                                let item = new ChartDetailItem();
                                item.type = "video";
                                item.content = res.tempFilePath;
                                item.mySend = true;
                                item.isRead = false;
                                item.timeStr = new Date().getTime();
                                item.time = formatTimeNew(new Date().getTime());
                                item.showTime = DealLastMsgTime.checkShowTime(that.messageId, new Date().getTime());
                                DealLastMsgTime.setTime(new Date().getTime(), that.messageId);
                                new Notification().postNotification(Notify.UpChartMsgChanged.Name, item);
							});
                    }
                });
			},

			// 屏蔽
			pingBiChart() {
				this.ImChart.blockMsg(this.messageId, !(this.isPingBi))
					.then(res => {
						this.isPingBi = !this.isPingBi;
					});
			},

			// 切换语音发送
			voiceSend() {
				this.startRecord = true;
			},
			// 隐藏语音发送
			hideRecord() {
				this.startRecord = false;
			},

			// 判断是否有录音权限 app-plus
			checkHaveVoicePermission(callback = function () {}) {
				let that = this;
				if (that.haveVoiceAuthSetting) {
					callback(that.haveVoiceAuthSetting);
					return;
				}

				// #ifdef APP-PLUS
				if (uni.getSystemInfoSync().platform !== "ios") {
					plus.android.requestPermissions(['android.permission.RECORD_AUDIO'], function(e){
						if(e.deniedAlways.length>0){	//权限被永久拒绝
							that.haveVoiceAuthSetting = false;
							callback(that.haveVoiceAuthSetting);
							// 弹出提示框解释为何需要定位权限，引导用户打开设置页面开启
							console.log('Always Denied!!! '+e.deniedAlways.toString());
						}
						if(e.deniedPresent.length>0){	//权限被临时拒绝
							that.haveVoiceAuthSetting = false;
							// 弹出提示框解释为何需要定位权限，可再次调用plus.android.requestPermissions申请权限
							console.log('Present Denied!!! '+e.deniedPresent.toString());
						}
						if(e.granted.length>0){	//权限被允许
							that.haveVoiceAuthSetting = true;
							//调用依赖获取定位权限的代码
							console.log('Granted!!! '+e.granted.toString());
						}
					}, function(e){
						that.haveVoiceAuthSetting = false;
						console.log('Request Permissions error:'+JSON.stringify(e));
						callback(that.haveVoiceAuthSetting);
					});
				}

				if (uni.getSystemInfoSync().platform === "ios") {
					let avaudiosession = plus.ios.import("AVAudioSession");
					let avaudio = avaudiosession.sharedInstance();
					let permissionStatus = avaudio.recordPermission();
					console.log("permissionStatus:" + permissionStatus);
					if (permissionStatus == 1684369017 || permissionStatus == 1970168948) {
						that.haveVoiceAuthSetting = false;
						callback(that.haveVoiceAuthSetting);
						console.log("麦克风权限没有开启");
					} else {
						that.haveVoiceAuthSetting = true;
						console.log("麦克风权限已经开启");
					}
					plus.ios.deleteObject(avaudiosession);
				}
				// #endif
			},
			// 开启权限
			// 跳转到**应用**的权限页面
			gotoAppPermissionSetting() {
				if (uni.getSystemInfoSync().platform === "ios") {
					let UIApplication = plus.ios.import("UIApplication");
					let application2 = UIApplication.sharedApplication();
					let NSURL2 = plus.ios.import("NSURL");
					let setting2 = NSURL2.URLWithString("app-settings:");
					application2.openURL(setting2);
					plus.ios.deleteObject(setting2);
					plus.ios.deleteObject(NSURL2);
					plus.ios.deleteObject(application2);
				} else {
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
			},
			// 监听录音结束
			onRecordStop() {
				let that = this;
				recorderManager.onStop((res) => {
					if(!that.haveVoiceAuthSetting || that.voiceCancelSend) return;

					// 小于1s的录音舍弃
					if(new Date().getTime() - privateData.voiceStartTime < 800) {
						return;
					}

					if(res.duration < 800) {
						that.DifferenceApi.showToast("录音时间太短");
						return;
					}

					if(!res.tempFilePath) {
						that.DifferenceApi.showToast("录音失败,暂无文件");
						return;
					}

					let time = new Date().getTime();
					new ImSendMessage(this.messageId).sendVoice(res.tempFilePath,
							time - privateData.voiceStartTime)
						.then((msg) => {
							let item = new ChartDetailItem();
							item.type = "voice";
							item.content = msg.file.url;
							item.mySend = true;
							item.isRead = false;
							item.timeStr = time;
							item.isSendUser = true;
							item.voiceLength = msg.file.dur ? Math.round(Number(msg.file.dur)/1000) : 1;
							item.time = formatTimeNew(time);
							item.showTime = DealLastMsgTime.checkShowTime(this.messageId, new Date().getTime());
							DealLastMsgTime.setTime(time, this.messageId);
							new Notification().postNotification(Notify.UpChartMsgChanged.Name, item);
						});
				});
			},
			// 录音开始
			recordStart(e) {
				let that = this;
				this.voiceCancelSend = false;
				that.voiceTimeLength = "00:00";
				privateData.startInfo = e.changedTouches[0];
				// #ifdef H5
				privateData.voiceStartTime = new Date().getTime();
				that.upRecordStart();
				// #endif

				// #ifdef APP-PLUS
				that.checkHaveVoicePermission((val) => {
					if (!val) {
						uni.showModal({
							title: "",
							content: "请打开设置-允许录音权限",
							showCancel: false,
							confirmText: "去开启",
							confirmColor: "#3396fb",
							success: (res) => {
								if(res.confirm) {
									that.gotoAppPermissionSetting();
								}
							}
						});
						return;
					}

					recorderManager = uni.getRecorderManager();
					privateData.voiceStartTime = new Date().getTime();
					that.upRecordStart();
				});
				// #endif

				// #ifdef MP
				if(that.haveVoiceAuthSetting) {
					recorderManager = uni.getRecorderManager();
					privateData.voiceStartTime = new Date().getTime();
					that.upRecordStart();
					return;
				}

				uni.getSetting({
					success(res) {
						that.haveVoiceAuthSetting = res.authSetting['scope.record'] || false;
						if(res.authSetting['scope.record'] != undefined && !res.authSetting['scope.record']) {
							uni.showModal({
								title: '授权提示',
								showCancel: true,
								content: '要先允许使用[录音权限]才可以发送哦',
								confirmText:'去设置',
								confirmColor: "#4ebb62",
								success: function(res) {
									if (res.confirm) {
										uni.openSetting({
											success: (res1) => {
												if(res1.authSetting['scope.record']){
													privateData.haveVoiceAuthSetting = true;
												}
											}
										});
									}
								}
							});
							return;
						}

						recorderManager = uni.getRecorderManager();
						privateData.voiceStartTime = new Date().getTime();
					}
				});
				// #endif
			},
			// 录音手指移动
			recordMove(e) {
				let endPageY = e.changedTouches[0].pageY || "";
				let startPageY = privateData.startInfo.pageY || "";
				if(endPageY < startPageY && (startPageY - endPageY) > 100) {
					this.voiceTcDes = "松开手指，取消发送";
					this.voiceCancelSend = true;
				}else {
					this.voiceTcDes = "手指上滑，取消发送";
					this.voiceCancelSend = false;
				}
			},
			// 录音结束
			recordEnd(e) {
				this.voiceTcShow = false;
				privateData.endInfo = e.changedTouches[0];
				clearInterval(privateData.recordTimeInterval);
				privateData.recordTimeInterval = null;
				// #ifndef H5
				clearTimeout(privateData.recordTimeOutVal);
				privateData.recordTimeOutVal = null;

				if(recorderManager) {
					recorderManager.stop();
					recorderManager = null;
				}
				// #endif
			},
			// 更新录音开始动画
			upRecordStart() {
				let that = this;
				clearTimeout(privateData.recordTimeOutVal);
				privateData.recordTimeOutVal = null;
				privateData.recordTimeOutVal = setTimeout(() => {
					let options = {
						duration: 600000,
						sampleRate: 44100,
						numberOfChannels: 1,
						encodeBitRate: 192000,
						format: 'mp3'
					};
					// #ifdef H5
					that.voiceTcShow = true;
					let intervalTimeVal = 0;
					privateData.recordTimeInterval = setInterval(() => {
						intervalTimeVal++;
						let voiceTimeLength = "00:" + intervalTimeVal;
						if (intervalTimeVal < 10) {
							voiceTimeLength = "00:0" + intervalTimeVal;
						}
						if(intervalTimeVal >= 60) {
							let minute = parseInt(intervalTimeVal/60);
							let second = intervalTimeVal%60;
							voiceTimeLength = (minute < 10 ? "0" + minute : minute) + ":" + (second < 10 ? "0" + second : second);
						}
						that.voiceTimeLength = voiceTimeLength;
					}, 1000);
					// #endif

					// #ifndef H5
					if(recorderManager) {
						recorderManager.start(options);
						that.voiceTcShow = true;
						console.error("--that.voiceTcShow--", that.voiceTcShow);
						that.onRecordStop();
						let intervalTimeVal = 0;
						function dealVoiceTime() {
							intervalTimeVal++;
							let voiceTimeLength = "00:" + intervalTimeVal;
							if (intervalTimeVal < 10) {
								voiceTimeLength = "00:0" + intervalTimeVal;
							}
							if(intervalTimeVal >= 60) {
								let minute = parseInt(intervalTimeVal/60);
								let second = intervalTimeVal%60;
								voiceTimeLength = (minute < 10 ? "0" + minute : minute) + ":" + (second < 10 ? "0" + second : second);
							}
							that.voiceTimeLength = voiceTimeLength;
						}
						dealVoiceTime();
						privateData.recordTimeInterval = setInterval(() => {
							dealVoiceTime();
						}, 1000);
					}
					// #endif
				}, 300);
			},

			// 显示评价
            evaluateSend() {
				new ImEvaluateDeal(this.chartList).checkIsCanEvaluate(val => {
				    console.log("---判断是否能够显示评价---", val);
				    if (!val) {
						uni.showModal({
							title: "",
							content: "我最近未给你提供服务，请咨询结束后为我评价，我将做的更好哦！",
							showCancel: false,
							confirmText: "我知道了",
                            confirmColor: "#ff5400"
						});
						return;
					}

					this.$emit("onEvaluateChanged", {show: true});
				});
			},

			// 选择地理位置
			getPosition() {
				let that = this;
				let gpsInfo = new GpsInfoModel().getModel("gpsInfo") || {};
				if (privateData.haveLocationAuthSetting) {
					uni.chooseLocation({
						success: function (res) {
							let locationItem = new PositionChartItem();
							locationItem.lat = Number(res.latitude);
							locationItem.lng = Number(res.longitude);
							locationItem.address = res.address;
							locationItem.name = res.name;
							if(!that.messageId) {
								new DifferenceApi().showToast("暂无收件人id");
								return;
							}

							let time = new Date().getTime();
							new ImSendMessage(that.messageId)
									.sendLocation(locationItem)
									.then((info) => {
										locationItem.staticImg = info.url;
										let item = new ChartDetailItem();
										item.type = "position";
										item.content = locationItem;
										item.mySend = true;
										item.isRead = false;
										item.timeStr = time;
										item.isSendUser = true;
										item.time = formatTimeNew(time);
										item.showTime = DealLastMsgTime.checkShowTime(that.messageId, time);
										DealLastMsgTime.setTime(time, that.messageId);
										new Notification().postNotification(Notify.UpChartMsgChanged.Name, item);
									});
						}
					});
					return;
				}

				uni.getSetting({
					success(res) {
						privateData.haveLocationAuthSetting = res.authSetting['scope.userLocation'] || false;
						if(res.authSetting['scope.userLocation'] != undefined && !res.authSetting['scope.userLocation']) {
							uni.showModal({
								title: '授权提示',
								showCancel: true,
								content: '要先允许使用[地理位置权限]才可以发送哦',
								confirmText:'去设置',
								confirmColor: "#4ebb62",
								success: function(res) {
									if (res.confirm) {
										uni.openSetting({
											success: (res1) => {
												if(res1.authSetting['scope.userLocation']){
													privateData.haveLocationAuthSetting = true;
												}
											}
										});
									}
								}
							});
							return;
						}

						privateData.haveLocationAuthSetting = true;
					}
				});
			}
		}
	}
</script>

<style scoped>
	/*发送*/
	.send_msg_cont{
		width: 100%;
		background-color: #FFFFFF;
		align-items: center;
	}
	.send_msg{
		width:100%;
		background-color:#fff;
		height: 100upx;
		line-height: 100upx;
		padding-top: 0;
		padding-bottom: 0;
		padding-left: 26upx;
		padding-right: 26upx;
		box-sizing: border-box;
		align-items: center;
	}
	.send_msg_left{
		width: 550upx;
		padding-right: 2px;
		box-sizing: border-box;
		align-items: center;
	}
	.send_msg_right{
		flex: 0;
		align-items: center;
	}
	.send_more_type{
		width: 46upx;
		height: 46upx;
		margin-top: auto;
		margin-bottom: auto;
		margin-right: 0;
		margin-left: 0;
		flex-shrink: 0;
	}
	.emoji_type_input,.key_type_input{
		width: 46upx;
		height: 46upx;
		margin-top: auto;
		margin-bottom: auto;
		margin-right: 30upx;
		margin-left: 0;
		flex-shrink: 0;
	}
	.voice_type_input{
		height: 46upx;
		width: 46upx;
		margin-top: auto;
		margin-bottom: auto;
		margin-right: 20upx;
		margin-left: 0;
		flex-shrink: 0;
	}
	.anzhu_btn{
		height: 74upx;
		line-height: 74upx;
		background-color: #f8f8f8;
		border-radius: 8upx;
		flex: 1;
		text-align: center;
		box-sizing: border-box;
		font-size: 32upx;
		color: #191f25;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.anzhu_btn_text{
		font-size: 32upx;
		color: #191f25;
		height: 74upx;
		line-height: 74upx;
		text-align: center;
	}
	.anzhu_btn_active{
		background-color: #ebebeb!important;
	}
	.send_input{
		height: 67upx;
		line-height: 67upx;
		background-color: #ffffff;
		flex: 1;
		text-align: left;
		margin-left: 0;
		margin-right: 0;
		padding-top: 0;
		padding-bottom: 0;
		padding-left: 16upx;
		padding-right: 20upx;
		box-sizing: border-box;
		font-size: 32upx;
		color: #101D36;
	}
	.send_text_btn{
		width:90upx;
		height:65upx;
		line-height: 65upx;
		color:#ffffff;
		background-color:#3396fb;
		text-align:center;
		font-size:26upx;
		border-radius:6upx;
		margin-top: auto;
		margin-bottom: auto;
		margin-left: 0;
		margin-right: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.send_text{
		line-height: 65upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		color:#ffffff;
		font-size:26upx;
	}

	/* 表请输入 */
	.send_emoji_list{
		height: 430upx;
		padding-top: 20upx;
		background: #FFFFFF;
		border-top: 1upx solid #e7e7e7;
		width: 100%;
		box-sizing: border-box;
	}
	.send_emoji_swiper,.send_emoji_swiper_item{
		width: 100%;
		height: 100%;
	}
	.send_emoji_swiper_item{
		flex-wrap: wrap;
		padding-bottom: 40upx;
		box-sizing: border-box;
	}
	.send_emoji_item_view,.send_emoji_del{
		width: 14.2%;
		height: 80upx;
		flex-shrink: 0;
	}
	.send_emoji_img{
		height: 80%;
		width: 100%;
		margin: auto;
	}
	.send_emoji_del_img{
		margin: auto;
		background:url(http://cdn.haofang.net/static/uuminiapp/pageNewUi/im_detail_sprites.png)  no-repeat;
		background-size:306px 45px;
		height:32px;
		width:32px;
		background-position:-91px 0;
	}

	/* 更多 */
	.send_more_type_list{
		flex-wrap: wrap;
		width: 100%;
		padding-top: 40upx;
		padding-bottom: 40upx;
		padding-left: 40upx;
		padding-right: 40upx;
		background-color: #ffffff;
		border-top-width: 1upx;
		border-top-style: solid;
		border-top-color: #e7e7e7;
		box-sizing: border-box;
	}
	.send_more_type_item{
		flex-shrink: 0;
		margin-right: 75upx;
	}
	.send_more_type_item:nth-child(3n){
		margin-right: 0;
	}
	.send_more_img_view{
		width: 104upx;
		height: 104upx;
		background-color: #f9f9f9;
		box-sizing: border-box;
		align-items: center;
	}
	.album_send{
		width: 42upx;
		height: 42upx;
		margin: auto;
	}
	.camera_send{
		width: 50upx;
		height: 42upx;
		margin: auto;
	}
	.send_more_text{
		line-height:50upx;
		font-size: 28upx;
		color: #191f25;
		text-align: center;
		margin-top: 10upx;
	}

	/*语音弹窗*/
	.voice_tc_view{
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 88;
		background: transparent;
		align-items: center;
	}
	.voice_tc_cont{
		align-items: center;
		background-color: rgba(0,0,0,0.5);
		z-index: 99999;
		border-radius: 30upx;
		width: 250upx;
		height: 250upx;
	}
	.voice_tc_cont_active{
		background-color: rgba(250,87,65, 0.9);
	}
	.voice_tc_time{
		text-align: center;
		font-size: 24upx;
		color: #ffffff;
		letter-spacing: 2upx;
		height: 26upx;
		line-height: 26upx;
	}
	.che_hui{
		width: 82upx;
		height: 108upx;
		margin-left: auto;
		margin-right: auto;
		margin-top: -2upx;
		margin-bottom: 36upx;
	}
	.send_voice_new{
		width: 55upx;
		height: 87upx;
		margin-left: auto;
		margin-right: auto;
		margin-top: 28upx;
		margin-bottom: 28upx;
	}
	.voice_tc_des{
		text-align: center;
		font-size: 24upx;
		color: rgba(255,255,255,0.8);
	}
</style>

(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/components/adviser"],{"339f":function(t,e,n){"use strict";var i=n("6bf2"),o=n.n(i);o.a},"4b3f":function(t,e,n){"use strict";n.r(e);var i=n("ca83"),o=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);e["default"]=o.a},"67f5":function(t,e,n){"use strict";n.r(e);var i=n("6b51"),o=n("4b3f");for(var a in o)"default"!==a&&function(t){n.d(e,t,function(){return o[t]})}(a);n("339f");var s=n("2877"),c=Object(s["a"])(o["default"],i["a"],i["b"],!1,null,null,null);e["default"]=c.exports},"6b51":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return o})},"6bf2":function(t,e,n){},ca83:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n("68bf"),o=n("6594"),a=n("a0ec"),s=n("10c9"),c=n("baf9"),r=n("b843"),u=(n("2647"),n("451a")),d=n("e26c"),f=n("835c"),l=n("0513"),h=n("21b0");function g(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function m(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var C=function t(){g(this,t),m(this,"title",""),m(this,"content",""),m(this,"time",""),m(this,"actId","")},I=function t(){g(this,t)};m(I,"cityId",""),m(I,"custId","");var v={data:function(){var t=new i.formatDate(new Date);return{buildName:"",todayDay:t.getDay(),todayMonthYear:"".concat(t.getYear(),".").concat(t.getMonth()),daiKanNum:"",dealNum:"",jieYongNum:"",customGenJinInfo:{haveCustom:!1,unLookMsgNum:0,lastMsgText:"",time:""},buildDtList:null,scanModel:{}}},mounted:function(){this.initData(),(new c.Notification).addObserver(this,"UpChartMsgChanged",s.Notify.UpChartMsgChanged.Name),(new c.Notification).addObserver(this,"PageShowChange",s.Notify.PageShowChange.Name),(new c.Notification).addObserver(this,"ImLinkSuccessChange",s.Notify.ImLinkSuccessChange.Name),(new c.Notification).addObserver(this,"ScanConfirmChange",s.Notify.ScanConfirmChange.Name)},destroyed:function(){(new c.Notification).removeObserverAllNotification(this)},methods:{ScanConfirmChange:function(t,e){var n=this;this.scanModel=e,setTimeout(function(){n.$refs.modal.show()},100)},onModalChanged:function(t){var e=this;t?new h.CheckCustInfoByQrCode({custId:this.scanModel.custId,cityId:this.scanModel.cityId,status:this.scanModel.status}).send().then(function(t){t.errCode===a.Const.success?e.DifferenceApi.showToast(t.errMsg||"操作成功"):e.DifferenceApi.showToast(t.errMsg||"操作失败")}):new h.CheckCustInfoByQrCode({custId:this.scanModel.custId,cityId:this.scanModel.cityId,status:0}).send().then(function(t){t.errCode===a.Const.success?e.DifferenceApi.showToast(t.errMsg||"操作成功"):e.DifferenceApi.showToast(t.errMsg||"操作失败")})},UpChartMsgChanged:function(){this.initRemindList(),this.initRemindMsg()},ImLinkSuccessChange:function(){this.initData()},PageShowChange:function(t,e){"index"===e.source&&this.initData()},initData:function(){this.buildName=o.GetLoginModel.getBuildName(),this.initBuildSignInfo(),this.initRemindList(),this.initRemindMsg(),this.initBuildDtList()},initBuildSignInfo:function(){var t=this;new r.GetStatisticalAnalysis({statisitcType:0,timeSegmentation:1}).send().then(function(e){if(e.errCode!==a.Const.success)return Promise.reject(e);var n=e.data||{};t.daiKanNum=n.seeCount||"0",t.dealNum=n.dealCount||"0",t.jieYongNum=n.settleCount||"0"}).catch(function(e){t.DifferenceApi.showToast(e.errMsg||"获取楼盘信息失败")})},initRemindMsg:function(){this.customGenJinInfo.unLookMsgNum=u.UpUnReadNumTab.getUnReadNum(d.ProjectConfigConst.remindMsgMessageId)||0},initRemindList:function(){var t=this;this.ImChart.imChartVal&&this.ImChart.getHistoryOriginal(d.ProjectConfigConst.remindMsgMessageId).then(function(e){var n=e&&e.msgs||[],o=t.customGenJinInfo;if(0!==n.length){n=n.sort(new i.compare("time").maxToMin());var a=JSON.parse(n[0].content),s=a.data||{};o.haveCustom=!0,o.lastMsgText=s.CONTENT||"暂无内容",o.time=(0,i.formatTimeNew)(n[0].time||(new Date).getTime()),t.customGenJinInfo=o}else t.customGenJinInfo.haveCustom=!1})},initBuildDtList:function(){var t=this;return new f.GetActivityList({pageRows:3,pageOffset:1}).send().then(function(e){if(e.errCode!==a.Const.success)return Promise.reject(e);var n=e.data&&e.data.actList||[];n=n.slice(0,3);var o=[],s=!0,c=!1,r=void 0;try{for(var u,d=n[Symbol.iterator]();!(s=(u=d.next()).done);s=!0){var f=u.value;if(f.promotionId){f.date=f.date.replace(/-/g,"/");var l=new i.formatDate(new Date(f.date)),h=new C;h.actId=f.promotionId,h.title=f.title,h.content=f.actContent,h.photoAddr=f.photoAddr||a.Const.houseDefaultImg,h.time="".concat(l.getYear(),"-").concat(l.getMonth(),"-").concat(l.getDay()," ").concat(l.getHour(),":").concat(l.getSecond()),o.push(h)}}}catch(g){c=!0,r=g}finally{try{s||null==d.return||d.return()}finally{if(c)throw r}}t.buildDtList=o}).catch(function(e){t.DifferenceApi.showToast(e.errMsg||"获取楼盘动态失败")})},goToRemindMsg:function(){u.UpUnReadNumTab.removeReadNum(d.ProjectConfigConst.remindMsgMessageId),this.customGenJinInfo.unLookMsgNum=0,t.navigateTo({url:"/pagesMsg/remindMsg/remindMsg"})},goToBuildDtDetail:function(e){t.navigateTo({url:"/pagesBuild/buildDetail/distributionDynamicDetail?actId="+e.actId})},lookMoreBuildDt:function(){t.navigateTo({url:"/pagesBuild/buildDetail/distributionDynamic"})},goToDengJi:function(){t.navigateTo({url:"/pagesCustomer/customerRegistration/customerRegistration"})},scanConfirmCustom:function(){var e=this,n=(new l.GpsInfoModel).getModel("cityInfo")||{};I.cityId=n.cityId||1,t.scanCode({success:function(n){var i=n.result||"";!i||-1===i.indexOf("#")||i.split("#").length<3||!i.split("#")[2]?e.DifferenceApi.showToast("二维码错误"):(t.showLoading({title:"解析中..."}),I.custId=i.split("#")[2],new h.GetCustInfoAfterScanQrcode({custId:I.custId,cityId:I.cityId}).send().then(function(e){var n=e.data||{};if(t.hideLoading(),e.errCode!==a.Const.success)return Promise.reject(e);2!==n.status?3===n.status&&(new c.Notification).postNotification(s.Notify.ScanConfirmChange.Name,{title:"温馨提示",content:"客户处于报备有效期内，是否接受带看？",confirmText:"允许带看",cancelText:"无效带看",cancelColor:"#3396fb",confirmColor:"#3396fb",custId:I.custId,cityId:I.cityId,status:2}):(new c.Notification).postNotification(s.Notify.ScanConfirmChange.Name,{title:"温馨提示",content:"经纪人于".concat(n.visitEarlyTime,'前报备此客户，不符合楼盘"提前').concat(n.reportEarly,'报备"的规则。是否接受此次带看？'),confirmText:"允许带看",cancelText:"无效带看",cancelColor:"rgba(0,0,0,0.6)",confirmColor:"#3396fb",custId:I.custId,cityId:I.cityId,status:n.status})}).catch(function(n){t.hideLoading(),e.DifferenceApi.showToast(n.errMsg||"确客失败")}))}})},buildErrorImg:function(t){var e=this.buildDtList[t]||{};e.photoAddr=a.Const.houseDefaultImg,this.$set(this.buildDtList,t,e)}}};e.default=v}).call(this,n("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/index/components/adviser-create-component',
    {
        'pages/index/components/adviser-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("67f5"))
        })
    },
    [['pages/index/components/adviser-create-component']]
]);
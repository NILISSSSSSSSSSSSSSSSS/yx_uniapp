(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesCustomer/signInfo/signInfo"],{"12ca":function(t,e,i){"use strict";i.r(e);var n=i("fa24"),s=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);e["default"]=s.a},"214a":function(t,e,i){"use strict";var n,s=function(){var t=this,e=t.$createElement;t._self._c},o=[];i.d(e,"b",function(){return s}),i.d(e,"c",function(){return o}),i.d(e,"a",function(){return n})},"5a22":function(t,e,i){"use strict";(function(t){i("3ea8"),i("921b");n(i("66fd"));var e=n(i("9cfb"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("6e42")["createPage"])},"9cfb":function(t,e,i){"use strict";i.r(e);var n=i("214a"),s=i("12ca");for(var o in s)"default"!==o&&function(t){i.d(e,t,function(){return s[t]})}(o);i("c4e3");var u,a=i("f0c5"),c=Object(a["a"])(s["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],u);e["default"]=c.exports},aec4:function(t,e,i){},c4e3:function(t,e,i){"use strict";var n=i("aec4"),s=i.n(n);s.a},fa24:function(t,e,i){"use strict";(function(t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=i("2c59"),o=i("a538"),u=i("aea1"),a=i("5962"),c=i("3830"),r=i("64cf"),h=i("3567"),f={},d={data:function(){return{cityId:"",custId:"",houseNo:"",houseArea:"",dealAmount:"",commission:"",custStatus:"",directCustomer:0,huXinTypeList:null,huXinIndex:"",checkHuXin:""}},onLoad:function(e){f=e,console.log(t(e,"--signInfo接收页面参数--"," at pagesCustomer\\signInfo\\signInfo.vue:107"))},onShow:function(){this.iniData(),this.cityId=f.cityId||"",this.custId=f.custId||"",this.houseNo=f.houseNo||"",this.custStatus=f.custStatus||"",this.houseArea=f.houseArea||"",this.dealAmount=f.dealAmount||"",this.commission=f.commission||"",this.directCustomer=f.directCustomer||"",this.checkHuXin=f.layoutNo||""},methods:{inputHouseNo:function(t){this.houseNo=t.detail.value},inputHouseArea:function(t){this.houseArea=t.detail.value},inputDealAmount:function(t){this.dealAmount=t.detail.value},inputCommission:function(t){this.commission=t.detail.value},confirmBtn:function(){var t=this;this.huXinTypeList&&0===this.huXinTypeList.length?this.DifferenceApi.showToast("请先添加户型"):this.huXinIndex?this.houseNo?this.houseArea?this.dealAmount?this.commission||0!=this.directCustomer?(n.showLoading({title:"请求中...",mask:s.Config.mask}),new u.RequestOrSign({cityId:this.cityId,custId:this.custId,custStatus:this.custStatus,houseNo:this.houseNo,houseArea:this.houseArea,dealAmount:this.dealAmount,commission:this.commission,layoutNo:this.checkHuXin}).send().then(function(e){if(n.hideLoading(),e.errCode!==o.Const.success)return Promise.reject(e);var i=(new h.CustomerModel).getModel()||"";i.userId&&(new r.ImSendMessage).sendNotifyMsg("ld_"+i.userId),t.DifferenceApi.showToast("签约成功"),setTimeout(function(){n.navigateBack({delta:1})},1e3)}).catch(function(e){n.hideLoading(),t.DifferenceApi.showToast(e.errMsg||"请求失败")})):this.DifferenceApi.showToast("请输入预计结佣金额"):this.DifferenceApi.showToast("请输入成交金额"):this.DifferenceApi.showToast("请输入产权面积"):this.DifferenceApi.showToast("请输入房号"):this.DifferenceApi.showToast("请选择户型")},iniData:function(){var t=this,e=a.GetLoginModel.getBuildId();new c.GetBuildLayouts({buildId:e}).send().then(function(e){if(e.errCode!==o.Const.success)return Promise.reject(e);if(e.data&&e.data.layoutNo&&0===e.data.layoutNo.length)t.huXinTypeList=[];else{var i=[],n=!0,s=!1,u=void 0;try{for(var a,c=e.data.layoutNo[Symbol.iterator]();!(n=(a=c.next()).done);n=!0){var r=a.value;i.push({value:r})}}catch(f){s=!0,u=f}finally{try{n||null==c.return||c.return()}finally{if(s)throw u}}if(t.checkHuXin)for(var h in i)i[h].value==t.checkHuXin&&(t.huXinIndex=h);t.huXinTypeList=i}}).catch(function(e){t.DifferenceApi.showToast(e.errMsg||"服务器开小差了,请稍后再试")})},huXinChangePicker:function(t){this.huXinTypeList?(this.huXinIndex=t.target.value,this.checkHuXin=this.huXinTypeList[t.target.value].value):this.DifferenceApi.showToast("请先添加户型")},addLayout:function(){this.DifferenceApi.showToast("请先添加户型")}}};e.default=d}).call(this,i("0de9")["default"],i("6e42")["default"])}},[["5a22","common/runtime","common/vendor"]]]);
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesCustomer/applyRenGou/applyRenGou"],{"0e59":function(t,e,i){},"11f7":function(t,e,i){"use strict";(function(t){i("3ea8"),i("921b");n(i("66fd"));var e=n(i("990e"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("6e42")["createPage"])},"356c":function(t,e,i){"use strict";i.r(e);var n=i("ffd6"),o=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);e["default"]=o.a},"3a1f":function(t,e,i){"use strict";var n,o=function(){var t=this,e=t.$createElement;t._self._c},s=[];i.d(e,"b",function(){return o}),i.d(e,"c",function(){return s}),i.d(e,"a",function(){return n})},"4ec9":function(t,e,i){"use strict";var n=i("0e59"),o=i.n(n);o.a},"990e":function(t,e,i){"use strict";i.r(e);var n=i("3a1f"),o=i("356c");for(var s in o)"default"!==s&&function(t){i.d(e,t,function(){return o[t]})}(s);i("4ec9");var u,a=i("f0c5"),c=Object(a["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],u);e["default"]=c.exports},ffd6:function(t,e,i){"use strict";(function(t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i("2c59"),s=i("a538"),u=i("aea1"),a=i("3830"),c=i("5962"),r={},h={data:function(){return{cityId:"",custId:"",houseNo:"",houseArea:"",dealAmount:"",commission:"",custStatus:"",directCustomer:0,huXinTypeList:null,huXinIndex:"",checkHuXin:"",layoutNo:""}},onLoad:function(e){r=e,console.log(t(e,"--applyRenGou接收页面参数--"," at pagesCustomer\\applyRenGou\\applyRenGou.vue:105"))},onShow:function(){this.iniData(),this.cityId=r.cityId||"",this.custId=r.custId||"",this.houseNo=r.houseNo||"",this.dealAmount=r.dealAmount||"",this.houseArea=r.houseArea||"",this.commission=r.commission||"",this.custStatus=r.custStatus||"",this.directCustomer=r.directCustomer||"",this.checkHuXin=r.layoutNo||""},methods:{inputHouseNo:function(t){this.houseNo=t.detail.value},inputHouseArea:function(t){this.houseArea=t.detail.value},inputDealAmount:function(t){this.dealAmount=t.detail.value},inputCommission:function(t){this.commission=t.detail.value},confirmBtn:function(){var t=this;this.huXinTypeList&&0===this.huXinTypeList.length?this.DifferenceApi.showToast("请先添加户型"):this.huXinIndex?this.houseNo?this.houseArea?this.dealAmount?this.commission||0!=this.directCustomer?(n.showLoading({title:"请求中...",mask:o.Config.mask}),new u.RequestOrConfirmBuy({cityId:this.cityId,custId:this.custId,custStatus:this.custStatus,houseNo:this.houseNo,houseArea:this.houseArea,dealAmount:this.dealAmount,commission:this.commission,layoutNo:this.checkHuXin}).send().then(function(e){if(n.hideLoading(),e.errCode!==s.Const.success)return Promise.reject(e);t.DifferenceApi.showToast("申请认购成功"),setTimeout(function(){n.navigateBack({delta:1})},1e3)}).catch(function(e){n.hideLoading(),t.DifferenceApi.showToast(e.errMsg||"请求失败")})):this.DifferenceApi.showToast("请输入预计结佣金额"):this.DifferenceApi.showToast("请输入成交金额"):this.DifferenceApi.showToast("请输入产权面积"):this.DifferenceApi.showToast("请输入房号"):this.DifferenceApi.showToast("请选择户型")},iniData:function(){var t=this,e=c.GetLoginModel.getBuildId();new a.GetBuildLayouts({buildId:e}).send().then(function(e){if(e.errCode!==s.Const.success)return Promise.reject(e);if(e.data&&e.data.layoutNo&&0===e.data.layoutNo.length)t.huXinTypeList=[];else{var i=[],n=!0,o=!1,u=void 0;try{for(var a,c=e.data.layoutNo[Symbol.iterator]();!(n=(a=c.next()).done);n=!0){var r=a.value;i.push({value:r})}}catch(f){o=!0,u=f}finally{try{n||null==c.return||c.return()}finally{if(o)throw u}}if(t.checkHuXin)for(var h in i)i[h].value==t.checkHuXin&&(t.huXinIndex=h);t.huXinTypeList=i}}).catch(function(e){t.DifferenceApi.showToast(e.errMsg||"服务器开小差了,请稍后再试")})},huXinChangePicker:function(t){this.huXinTypeList?(this.huXinIndex=t.target.value,this.checkHuXin=this.huXinTypeList[t.target.value].value):this.DifferenceApi.showToast("请先添加户型")},addLayout:function(){this.DifferenceApi.showToast("请先添加户型")}}};e.default=h}).call(this,i("0de9")["default"],i("6e42")["default"])}},[["11f7","common/runtime","common/vendor"]]]);
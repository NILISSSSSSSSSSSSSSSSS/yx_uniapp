(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesStaff/customerTransfer/chooseStaff"],{"032b":function(e,t,n){"use strict";n.r(t);var r=n("d694"),c=n("a064");for(var s in c)"default"!==s&&function(e){n.d(t,e,function(){return c[e]})}(s);n("7ace");var a=n("2877"),o=Object(a["a"])(c["default"],r["a"],r["b"],!1,null,null,null);t["default"]=o.exports},"42fc":function(e,t,n){"use strict";(function(e){n("d3e9"),n("921b");r(n("66fd"));var t=r(n("032b"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"7ace":function(e,t,n){"use strict";var r=n("7dd6"),c=n.n(r);c.a},"7dd6":function(e,t,n){},a064:function(e,t,n){"use strict";n.r(t);var r=n("cc84"),c=n.n(r);for(var s in r)"default"!==s&&function(e){n.d(t,e,function(){return r[e]})}(s);t["default"]=c.a},cc84:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n("a0ec"),c=n("e41b"),s=n("bcff");function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u=function(){return n.e("pagesStaff/components/staffCustomer").then(n.bind(null,"3729"))},i=function e(){a(this,e)};o(i,"custIds",""),o(i,"brokerId",null);var f={components:{staffCustomer:u},data:function(){return{userList:null,checkImgSrc:"http://cdn.haofang.net/static/xfldDeveloper/customer/yg_check.png",checkedImgSrc:"http://cdn.haofang.net/static/xfldDeveloper/customer/yg_checked.png",checkedCustId:null,default_avatar:""}},onShow:function(){this.initData()},onLoad:function(e){i.custIds=e.custIds,i.brokerId=e.brokerId},methods:{initData:function(){var e=this;(new c.GetAllUserList).send().then(function(t){if(t.errCode!==r.Const.success)return Promise.reject(t);if(t.data.userList&&t.data.userList.length<0)e.userList=[];else{var n=[],c=!0,s=!1,a=void 0;try{for(var o,u=t.data.userList[Symbol.iterator]();!(c=(o=u.next()).done);c=!0){var f=o.value;f.userId!=i.brokerId&&n.push(f)}}catch(d){s=!0,a=d}finally{try{c||null==u.return||u.return()}finally{if(s)throw a}}e.userList=n,e.checkedCustId=e.userList[0].userId,e.default_avatar=r.Const.imDefaultHeadImg,console.log(e.userList,"--this.userList--")}}).catch(function(t){console.log(t),e.DifferenceApi.showToast(t.errMsg||"服务器开小差啦!请稍后再试")})},checkedUserChange:function(e){console.log(e.detail.value,"-------e"),this.checkedCustId=e.detail.value},confirmBtn:function(){var t=this,n={sourceUserId:i.brokerId,targetUserId:this.checkedCustId,custIds:i.custIds};console.log(n,"--确认移交--"),e.showLoading({title:"移交中...",mask:!0}),new s.TransferCust(n).send().then(function(n){if(n.errCode!==r.Const.success)return Promise.reject(n);e.hideLoading(),e.navigateBack({delta:2}),t.DifferenceApi.showToast("移交成功")}).catch(function(e){console.log(e),t.DifferenceApi.showToast(e.errMsg||"服务器开小差啦!请稍后再试")})}}};t.default=f}).call(this,n("543d")["default"])},d694:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement;e._self._c},c=[];n.d(t,"a",function(){return r}),n.d(t,"b",function(){return c})}},[["42fc","common/runtime","common/vendor"]]]);
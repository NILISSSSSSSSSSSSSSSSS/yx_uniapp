(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesStaff/customerTransfer/chooseCustomer"],{1466:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=n("bcff"),a=n("a0ec");function c(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var u=function(){return n.e("pagesStaff/components/staffCustomer").then(n.bind(null,"3729"))},s=function t(){c(this,t)};o(s,"brokerId",null),o(s,"checkcustIds",[]);var i={components:{staffCustomer:u},data:function(){return{customerData:null,checkImgSrc:"http://cdn.haofang.net/static/xfldDeveloper/customer/yg_check.png",checkedImgSrc:"http://cdn.haofang.net/static/xfldDeveloper/customer/yg_checked.png",checkedCustMap:{},isCheckAll:!1}},onShow:function(){this.initData()},onLoad:function(t){s.brokerId=t.userId},methods:{initData:function(){var t=this;s.brokerId&&new r.GetCustListForStaff({brokerId:s.brokerId}).send().then(function(e){if(e.errCode!==a.Const.success)return Promise.reject(e);e.data&&e.data.custList&&(t.customerData=e.data.custList);var n=!0,r=!1,c=void 0;try{for(var o,u=t.customerData[Symbol.iterator]();!(n=(o=u.next()).done);n=!0){var s=o.value;s.layout=s.layout?s.layout.split(","):[]}}catch(i){r=!0,c=i}finally{try{n||null==u.return||u.return()}finally{if(r)throw c}}console.log(t.customerData,"--this.customerData--")}).catch(function(e){console.log(e),t.DifferenceApi.showToast(e.errMsg||"服务器开小差啦!请稍后再试")})},checkedCustChange:function(t){var e={},n=!0,r=!1,a=void 0;try{for(var c,o=(t.detail.value||[])[Symbol.iterator]();!(n=(c=o.next()).done);n=!0){var u=c.value;e[Number(u)]=!0}}catch(i){r=!0,a=i}finally{try{n||null==o.return||o.return()}finally{if(r)throw a}}this.checkedCustMap=e,s.checkcustIds=t.detail.value,s.checkcustIds.length!==this.customerData.length?this.isCheckAll=!1:this.isCheckAll=!0},checkAll:function(){if(this.isCheckAll=!this.isCheckAll,this.isCheckAll){var t={},e=!0,n=!1,r=void 0;try{for(var a,c=this.customerData[Symbol.iterator]();!(e=(a=c.next()).done);e=!0){var o=a.value;t[Number(o.custId)]=!0}}catch(u){n=!0,r=u}finally{try{e||null==c.return||c.return()}finally{if(n)throw r}}this.checkedCustMap=t}else this.checkedCustMap={}},goToNext:function(){var e=[];for(var n in this.checkedCustMap)this.checkedCustMap[n]&&e.push(n);0!==e.length?(e=e.join(","),console.log(e,"---custIds---"),t.navigateTo({url:"/pagesStaff/customerTransfer/chooseStaff?custIds="+e+"&brokerId="+s.brokerId})):this.DifferenceApi.showToast("请选择客户")}}};e.default=i}).call(this,n("543d")["default"])},"17b1":function(t,e,n){"use strict";n.r(e);var r=n("7b44"),a=n("2d49");for(var c in a)"default"!==c&&function(t){n.d(e,t,function(){return a[t]})}(c);n("28c7");var o=n("2877"),u=Object(o["a"])(a["default"],r["a"],r["b"],!1,null,null,null);e["default"]=u.exports},"28c7":function(t,e,n){"use strict";var r=n("430f"),a=n.n(r);a.a},"2d49":function(t,e,n){"use strict";n.r(e);var r=n("1466"),a=n.n(r);for(var c in r)"default"!==c&&function(t){n.d(e,t,function(){return r[t]})}(c);e["default"]=a.a},"430f":function(t,e,n){},"7b44":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"a",function(){return r}),n.d(e,"b",function(){return a})},"967d":function(t,e,n){"use strict";(function(t){n("d3e9"),n("921b");r(n("66fd"));var e=r(n("17b1"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["967d","common/runtime","common/vendor"]]]);
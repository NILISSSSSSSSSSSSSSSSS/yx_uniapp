(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesCustomer/archiveCustomerList/archiveCustomerList"],{"0373":function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement,e=(t._self._c,{title:"拨打电话",content:t.phone,confirmText:"呼叫",cancelColor:"rgba(0,0,0,0.6)",confirmColor:"#3396fb"});t.$mp.data=Object.assign({},{$root:{a0:e}})},i=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return i})},"0f07":function(t,n,e){"use strict";(function(t){e("d3e9"),e("921b");o(e("66fd"));var n=o(e("49e6"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},3121:function(t,n,e){},"49e6":function(t,n,e){"use strict";e.r(n);var o=e("0373"),i=e("72d2");for(var r in i)"default"!==r&&function(t){e.d(n,t,function(){return i[t]})}(r);e("d0ce");var a=e("2877"),s=Object(a["a"])(i["default"],o["a"],o["b"],!1,null,null,null);n["default"]=s.exports},"72d2":function(t,n,e){"use strict";e.r(n);var o=e("8ed7"),i=e.n(o);for(var r in o)"default"!==r&&function(t){e.d(n,t,function(){return o[t]})}(r);n["default"]=i.a},"8ed7":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=e("22d5");function i(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function r(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var a=function(){return e.e("components/scrollLoading").then(e.bind(null,"d59e"))},s=function(){return e.e("components/screenCustomer").then(e.bind(null,"ea18"))},u=function(){return e.e("components/screenCustomerOfDirectCustomer").then(e.bind(null,"8954"))},c=function(){return e.e("components/noData").then(e.bind(null,"210b"))},f=function t(){i(this,t)};r(f,"archiveId","");var l={components:{scrollLoading:a,screenCustomer:s,screenCustomerOfDirectCustomer:u,noData:c},data:function(){return{list:null,pageRows:10,pageOffset:1,keyword:"",isScrollIng:!1,haveMore:!0,phone:"",customer_sex_man_img:"http://cdn.haofang.net/static/xffx-uniapp/customer/man.png",customer_sex_waman_img:"http://cdn.haofang.net/static/xffx-uniapp/customer/waman.png",customer_phone_img:"http://cdn.haofang.net/static/xffx-uniapp/customer/phone.png",is_directCustomer_img:"http://cdn.haofang.net/static/xffx-uniapp/customer/zhike.png"}},onLoad:function(n){f.archiveId=n.archiveId,n.name&&(t.setNavigationBarTitle({title:n.name}),setTimeout(function(){t.setNavigationBarTitle({title:n.name})},500))},onShow:function(){setTimeout(function(){t.startPullDownRefresh()},100)},onReachBottom:function(){this.scrollBottom()},onPullDownRefresh:function(){var n=this;this.pageOffset=1,this.initData().then(function(e){n.list=e,t.stopPullDownRefresh()}).catch(function(){t.stopPullDownRefresh()})},methods:{initData:function(){var t=this,n=this,e={pageRows:n.pageRows,pageOffset:n.pageOffset,keyword:n.keyword,archiveId:f.archiveId};return new o.GetCustomerListByStatus(e).send().then(function(e){if(200!=e.errCode)return t.DifferenceApi.showToast(e.errMsg||"服务器开小差了,请稍后再试"),[];if(!e.data.custList)return n.haveMore=!1,n.isScrollIng=!1,[];e.data.custList.length<n.pageRows?n.haveMore=!1:n.haveMore=!0;var o=!0,i=!1,r=void 0;try{for(var a,s=e.data.custList[Symbol.iterator]();!(o=(a=s.next()).done);o=!0){var u=a.value;u.intentionLayout=u.intentionLayout.split(","),u.isCanCall=!0,t.VerifyPhone(u.custMobile)&&(u.isCanCall=!1)}}catch(c){i=!0,r=c}finally{try{o||null==s.return||s.return()}finally{if(i)throw r}}return n.isScrollIng=!1,e.data.custList||[]}).catch(function(n){return t.DifferenceApi.showToast(n.errMsg||"服务器开小差了,请稍后再试"),n})},scrollBottom:function(){var t=this,n=this;!n.isScrollIng&&n.haveMore&&(n.isScrollIng=!0,n.pageOffset++,n.initData().then(function(n){t.list=(t.list||null).concat(n)}))},goToCustomerDetailView:function(n){t.navigateTo({url:"/pagesCustomer/customerDetail/customerDetail?custId="+n.custId+"&cityId="+n.cityId})},goToCallPhoneView:function(t){this.phone=t,this.$refs.modal.show()},onModalChanged:function(t){t&&this.DifferenceApi.makePhoneCall(this.phone)},VerifyPhone:function(t){if(!t)return!1;var n=/[*]+/;return!!n.test(t)}}};n.default=l}).call(this,e("543d")["default"])},d0ce:function(t,n,e){"use strict";var o=e("3121"),i=e.n(o);i.a}},[["0f07","common/runtime","common/vendor"]]]);
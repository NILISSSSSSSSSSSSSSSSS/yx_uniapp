(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesCustomer/archiveManage/archiveManage"],{"1a07":function(e,t,n){"use strict";n.r(t);var a=n("5065"),i=n("8108");for(var r in i)"default"!==r&&function(e){n.d(t,e,function(){return i[e]})}(r);n("d053");var o,s=n("f0c5"),c=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);t["default"]=c.exports},5065:function(e,t,n){"use strict";var a,i=function(){var e=this,t=e.$createElement,n=(e._self._c,{title:"温馨提示",content:e.phone,confirmText:"呼叫",cancelColor:"rgba(0,0,0,0.6)",confirmColor:"#3396fb"});e.$mp.data=Object.assign({},{$root:{a0:n}})},r=[];n.d(t,"b",function(){return i}),n.d(t,"c",function(){return r}),n.d(t,"a",function(){return a})},"6f92":function(e,t,n){},8108:function(e,t,n){"use strict";n.r(t);var a=n("9f24"),i=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,function(){return a[e]})}(r);t["default"]=i.a},"9f24":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n("aea1"),i=n("a538"),r=n("1675");function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c=function(){return n.e("components/scrollLoading").then(n.bind(null,"b2e1"))},u=function(){return n.e("components/noData").then(n.bind(null,"d720"))},l=function e(){o(this,e),s(this,"headerImg",""),s(this,"deptName",""),s(this,"name",""),s(this,"firstName",""),s(this,"num",0),s(this,"archiveId",""),s(this,"cityId",""),s(this,"phone","")},f=function e(){o(this,e)};s(f,"pageRows",10),s(f,"pageOffset",1),s(f,"timeOutVal",null);var h={components:{scrollLoading:c,noData:u},data:function(){return{requestInfo:{searchArchiveName:""},list:null,isScrollIng:!1,haveMoreData:!0,phone:""}},onShow:function(){setTimeout(function(){e.startPullDownRefresh()},100)},onPullDownRefresh:function(){var t=this;f.pageOffset=1,this.initData().then(function(n){t.list=n,e.stopPullDownRefresh()}).catch(function(){e.stopPullDownRefresh()})},methods:{inputName:function(e){var t=this;this.requestInfo.searchArchiveName=e.detail.value,clearTimeout(f.timeOutVal),f.timeOutVal=setTimeout(function(){f.pageOffset=1,t.initData().then(function(e){t.list=e})},250)},removeName:function(){var e=this;this.requestInfo.searchArchiveName="",f.pageOffset=1,this.initData().then(function(t){e.list=t})},initData:function(){var e=this,t={pageRows:f.pageRows,pageOffset:f.pageOffset,keyword:this.requestInfo.searchArchiveName};return this.isScrollIng=!0,new a.GetBrokerList(t).send().then(function(n){if(n.errCode!==i.Const.success)return Promise.reject(n);var a=n.data||{},o=a.list||[];e.isScrollIng=!1,t.pageRows>o.length&&(e.haveMoreData=!1);var s=[],c=!0,u=!1,f=void 0;try{for(var h,d=o[Symbol.iterator]();!(c=(h=d.next()).done);c=!0){var m=h.value,v=new l;v.deptName=m.deptName||"",v.name=m.brokerName||"",v.headerImg=m.brokerAvatarUrl||"",v.headerImg&&(v.headerImg=(new r.Utils).dealImgSrcSize(v.headerImg,120,120)),v.firstName=m.brokerName?m.brokerName.substring(0,1):"",v.num=m.custCount||0,v.archiveId=m.archiveId||"",v.cityId=m.brokerCityId||"",v.phone=m.brokerMobile||"",s.push(v)}}catch(g){u=!0,f=g}finally{try{c||null==d.return||d.return()}finally{if(u)throw f}}return s}).catch(function(t){return e.isScrollIng=!1,e.DifferenceApi.showToast(t.errMsg||"获取失败"),t})},scrolltolower:function(e){var t=this;!this.isScrollIng&&this.haveMoreData&&(this.isScrollIng=!0,f.pageOffset++,this.initData().then(function(e){t.list=(t.list||[]).concat(e)}))},goToList:function(t){e.navigateTo({url:"/pagesCustomer/archiveCustomerList/archiveCustomerList?archiveId="+t.archiveId+"&name="+t.name})},goChart:function(t){e.navigateTo({url:"/pagesMsg/msgDetail/msgDetail?messageId="+t.archiveId+"&name="+t.name})},takePhone:function(e){this.phone=e.phone,this.$refs.modal.show()},onModalChanged:function(e){e&&(this.phone?this.DifferenceApi.makePhoneCall(this.phone):this.DifferenceApi.showToast("暂无电话"))}}};t.default=h}).call(this,n("6e42")["default"])},d053:function(e,t,n){"use strict";var a=n("6f92"),i=n.n(a);i.a},e119:function(e,t,n){"use strict";(function(e){n("3ea8"),n("921b");a(n("66fd"));var t=a(n("1a07"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])}},[["e119","common/runtime","common/vendor"]]]);
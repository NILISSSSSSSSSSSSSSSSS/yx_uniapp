(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesMsg/systemMsg/systemMsg"],{"06c4":function(t,e,n){},"5e9a":function(t,e,n){"use strict";(function(t){n("3ea8"),n("921b");i(n("66fd"));var e=i(n("ca03"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},a628:function(t,e,n){"use strict";var i=n("06c4"),a=n.n(i);a.a},c288:function(t,e,n){"use strict";var i,a=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"b",function(){return a}),n.d(e,"c",function(){return o}),n.d(e,"a",function(){return i})},ca03:function(t,e,n){"use strict";n.r(e);var i=n("c288"),a=n("eeb4");for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);n("a628");var c,r=n("f0c5"),s=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],c);e["default"]=s.exports},d61e:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n("2b2e"),a=n("b0ea"),o=n("64cf"),c=n("fb1c"),r=n("5969");function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function l(t,e,n){return e&&u(t.prototype,e),n&&u(t,n),t}function f(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var d=function(){function t(){s(this,t),f(this,"content",""),f(this,"time",(new Date).getTime()),f(this,"cityId","1"),f(this,"customId",""),f(this,"iconPath",""),f(this,"title","")}return l(t,[{key:"getMapItem",value:function(){var t=(new Map).set("申请带看",{icon:"http://cdn.haofang.net/static/xfldDeveloper/msg/sq_dk.png",title:"申请带看"}).set("申请认购",{icon:"http://cdn.haofang.net/static/xfldDeveloper/msg/sq_rg.png",title:"申请认购"}).set("申请签约",{icon:"http://cdn.haofang.net/static/xfldDeveloper/msg/sq_qy.png",title:"申请签约"}).set("申请结佣",{icon:"http://cdn.haofang.net/static/xfldDeveloper/msg/sq_jy.png",title:"申请结佣"});return t.has(this.title)?t.get(this.title):null}}]),t}(),m={data:function(){return{list:null}},onLoad:function(){o.UpUnReadNumTab.removeReadNum(c.ProjectConfigConst.systemMsgMessageId),(new i.Notification).addObserver(this,"ImLinkSuccessChange",a.Notify.ImLinkSuccessChange.Name),this.initData()},methods:{ImLinkSuccessChange:function(){this.initData()},initData:function(){var t=this;this.ImChart.imChartVal&&setTimeout(function(){t.ImChart.getHistoryOriginal(c.ProjectConfigConst.systemMsgMessageId).then(function(e){var n=e&&e.msgs||[];n=n.sort(new r.compare("time").maxToMin());var i=[],a=!0,o=!1,c=void 0;try{for(var s,u=n[Symbol.iterator]();!(a=(s=u.next()).done);a=!0){var l=s.value,f=l.content&&JSON.parse(l.content).data||{},m=new d;m.cityId=f.cityId,m.content=f.content||"",m.time=(0,r.formatTimeNew)(l.time),m.customId=f.custId,m.title=f.title||"";var h=m.getMapItem();h?m.iconPath=h?h.icon:"":(m.photo=f.PHOTO||"",m.type="default",i.push(m))}}catch(g){o=!0,c=g}finally{try{a||null==u.return||u.return()}finally{if(o)throw c}}t.list=i})},150)},goToCustomDetail:function(e){t.navigateTo({url:"/pagesCustomer/customerDetail/customerDetail?custId="+e.customId+"&cityId="+e.cityId})}}};e.default=m}).call(this,n("6e42")["default"])},eeb4:function(t,e,n){"use strict";n.r(e);var i=n("d61e"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);e["default"]=a.a}},[["5e9a","common/runtime","common/vendor"]]]);
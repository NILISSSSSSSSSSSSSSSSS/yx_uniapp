(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesMsg/components/im/me/videoMeView"],{"0876":function(e,t,n){},"347e":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=function(){return n.e("pagesMsg/components/im/readStatus").then(n.bind(null,"e8e4"))},a={data:function(){return{playVideoIng:!1,falseVal:!1,windowHeight:"40%"}},components:{readStatus:i},props:{item:{type:Object,default:{}}},mounted:function(){var t=e.getSystemInfoSync();this.windowHeight=t.windowWidth+"px",this.videoValue=e.createVideoContext("myVideo")},methods:{playVideo:function(){this.playVideoIng=!0,this.videoValue.play()},closeVideo:function(){this.playVideoIng=!1,this.videoValue.pause()}}};t.default=a}).call(this,n("543d")["default"])},3744:function(e,t,n){"use strict";n.r(t);var i=n("a23a"),a=n("ce7e");for(var o in a)"default"!==o&&function(e){n.d(t,e,function(){return a[e]})}(o);n("c1be");var u=n("2877"),c=Object(u["a"])(a["default"],i["a"],i["b"],!1,null,"33829ff7",null);t["default"]=c.exports},a23a:function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement;e._self._c},a=[];n.d(t,"a",function(){return i}),n.d(t,"b",function(){return a})},c1be:function(e,t,n){"use strict";var i=n("0876"),a=n.n(i);a.a},ce7e:function(e,t,n){"use strict";n.r(t);var i=n("347e"),a=n.n(i);for(var o in i)"default"!==o&&function(e){n.d(t,e,function(){return i[e]})}(o);t["default"]=a.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pagesMsg/components/im/me/videoMeView-create-component',
    {
        'pagesMsg/components/im/me/videoMeView-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("3744"))
        })
    },
    [['pagesMsg/components/im/me/videoMeView-create-component']]
]);

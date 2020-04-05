(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesMsg/components/im/receive/videoReceiveView"],{"39b9":function(t,e,n){"use strict";var i=n("5113"),o=n.n(i);o.a},4241:function(t,e,n){"use strict";n.r(e);var i=n("4e7e"),o=n.n(i);for(var u in i)"default"!==u&&function(t){n.d(e,t,function(){return i[t]})}(u);e["default"]=o.a},"4e7e":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{playVideoIng:!1,falseVal:!1,windowHeight:"40%"}},computed:{videoFirstImg:function(){return this.item.content+"?vframe"}},props:{item:{type:Object,default:function(){return{}}}},mounted:function(){var e=t.getSystemInfoSync();this.windowHeight=e.windowWidth+"px"},methods:{playVideo:function(){this.$emit("videoPlayChange",{url:this.item.content,videoFirstImg:this.videoFirstImg})},closeVideo:function(){this.playVideoIng=!1,this.videoValue.pause(),this.videoValue.stop()}}};e.default=n}).call(this,n("543d")["default"])},5113:function(t,e,n){},"568c":function(t,e,n){"use strict";n.r(e);var i=n("6f76"),o=n("4241");for(var u in o)"default"!==u&&function(t){n.d(e,t,function(){return o[t]})}(u);n("39b9");var a=n("2877"),r=Object(a["a"])(o["default"],i["a"],i["b"],!1,null,"348775e2",null);e["default"]=r.exports},"6f76":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return o})}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pagesMsg/components/im/receive/videoReceiveView-create-component',
    {
        'pagesMsg/components/im/receive/videoReceiveView-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("568c"))
        })
    },
    [['pagesMsg/components/im/receive/videoReceiveView-create-component']]
]);

(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesStaff/components/staffCustomer"],{2408:function(t,e,a){"use strict";var s=a("5ddc"),u=a.n(s);u.a},3525:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement;t._self._c},u=[];a.d(e,"a",function(){return s}),a.d(e,"b",function(){return u})},3729:function(t,e,a){"use strict";a.r(e);var s=a("3525"),u=a("f0bc");for(var n in u)"default"!==n&&function(t){a.d(e,t,function(){return u[t]})}(n);a("2408");var r=a("2877"),o=Object(r["a"])(u["default"],s["a"],s["b"],!1,null,"2ed4e1ed",null);e["default"]=o.exports},"38e1":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={props:{item:{type:Object,default:function(){return{}}},isNew:{type:String|Number,default:function(){return""}},isGoDetail:{type:Boolean,default:function(){return!0}}},data:function(){return{statusText:{"-3":"带看过期",1:"待审核",2:"待确客",3:"待认购",4:"待签约",5:"待结佣",6:"已结佣",7:"已退佣","-2":"已过期","-1":"撤销认购",0:"无效"},statusClass:{1:"status_orange",2:"status_orange",3:"status_orange",4:"status_orange",5:"status_orange",6:"status_green",7:"status_gray","-2":"status_gray","-1":"status_gray",0:"status_gray","-3":"status_gray"},directCustomerStatusText:{3:"待认购",4:"待签约",5:"已签约","-1":"撤销认购"},directCustomerStatusClass:{3:"status_orange",4:"status_orange",5:"status_green","-1":"status_gray"}}},methods:{goToCustomerDetailView:function(e){t.navigateTo({url:"/pagesCustomer/customerDetail/customerDetail?custId="+e.custId+"&cityId="+e.cityId+"&custName="+e.custName+"&isNew="+this.isNew})}}};e.default=a}).call(this,a("543d")["default"])},"5ddc":function(t,e,a){},f0bc:function(t,e,a){"use strict";a.r(e);var s=a("38e1"),u=a.n(s);for(var n in s)"default"!==n&&function(t){a.d(e,t,function(){return s[t]})}(n);e["default"]=u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pagesStaff/components/staffCustomer-create-component',
    {
        'pagesStaff/components/staffCustomer-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("3729"))
        })
    },
    [['pagesStaff/components/staffCustomer-create-component']]
]);

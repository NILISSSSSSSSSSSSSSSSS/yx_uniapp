(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/collectFormId"],{"52c4":function(e,n,t){},"7fe2":function(e,n,t){"use strict";t.r(n);var o=t("de8a"),r=t("bc0d");for(var d in r)"default"!==d&&function(e){t.d(n,e,function(){return r[e]})}(d);t("b15e");var c=t("2877"),u=Object(c["a"])(r["default"],o["a"],o["b"],!1,null,null,null);n["default"]=u.exports},b0d8:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=t("983c"),r=t("6594"),d=t("cb99"),c={methods:{formSubmit:function(e){var n=e.detail.formId;console.log("CollectFormId",n);var t=(new o.UserInfoModel).getModel("openId")||"",c=r.GetLoginModel.getUserId()||"";c&&t&&(n.indexOf("mock one")>=0||e.detail&&e.detail.formId&&new d.CollectFormId({formId:e.detail.formId,userId:c,openId:t,formSource:"xfldyx"}).send())}}};n.default=c},b15e:function(e,n,t){"use strict";var o=t("52c4"),r=t.n(o);r.a},bc0d:function(e,n,t){"use strict";t.r(n);var o=t("b0d8"),r=t.n(o);for(var d in o)"default"!==d&&function(e){t.d(n,e,function(){return o[e]})}(d);n["default"]=r.a},de8a:function(e,n,t){"use strict";var o=function(){var e=this,n=e.$createElement;e._self._c},r=[];t.d(n,"a",function(){return o}),t.d(n,"b",function(){return r})}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/collectFormId-create-component',
    {
        'components/collectFormId-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("7fe2"))
        })
    },
    [['components/collectFormId-create-component']]
]);

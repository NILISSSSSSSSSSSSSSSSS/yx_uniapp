(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesSet/changePayPassword/changePayPassword"],{"05df":function(e,s,t){"use strict";var o=t("6010"),n=t.n(o);n.a},"3dc4":function(e,s,t){"use strict";var o=function(){var e=this,s=e.$createElement;e._self._c},n=[];t.d(s,"a",function(){return o}),t.d(s,"b",function(){return n})},6010:function(e,s,t){},"79f9":function(e,s,t){"use strict";t.r(s);var o=t("3dc4"),n=t("8d84");for(var i in n)"default"!==i&&function(e){t.d(s,e,function(){return n[e]})}(i);t("05df");var a=t("2877"),r=Object(a["a"])(n["default"],o["a"],o["b"],!1,null,null,null);s["default"]=r.exports},"8d84":function(e,s,t){"use strict";t.r(s);var o=t("f061"),n=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(s,e,function(){return o[e]})}(i);s["default"]=n.a},d892:function(e,s,t){"use strict";(function(e){t("d3e9"),t("921b");o(t("66fd"));var s=o(t("79f9"));function o(e){return e&&e.__esModule?e:{default:e}}e(s.default)}).call(this,t("543d")["createPage"])},f061:function(e,s,t){"use strict";(function(e){Object.defineProperty(s,"__esModule",{value:!0}),s.default=void 0;var o=t("8c03"),n=t("a0ec"),i=t("2f2e"),a=t("8b8e"),r=t("6594"),f={data:function(){return{keywordImgMap:{1:{src:"http://cdn.haofang.net/static/xfyx-uniapp/tool/show_key.png",className:"show_key"},2:{src:"http://cdn.haofang.net/static/xfyx-uniapp/tool/hide_key.png",className:"hide_key"}},oldPasswordType:2,newPasswordType:2,confirmPasswordType:2,requestInfo:{oldPassword:"",newPassword:"",confirmPassword:""},payPasswordStatus:r.GetLoginModel.getPayPwd()||0}},onLoad:function(){e.setNavigationBarTitle({title:1==r.GetLoginModel.getPayPwd()?"修改支付密码":"设置支付密码"})},methods:{inputOldPassword:function(e){this.requestInfo.oldPassword=e.detail.value},inputNewPassword:function(e){this.requestInfo.newPassword=e.detail.value},inputConfirmPassword:function(e){this.requestInfo.confirmPassword=e.detail.value},changeOldPasswordType:function(){this.oldPasswordType=2===this.oldPasswordType?1:2},changeNewPasswordType:function(){this.newPasswordType=2===this.newPasswordType?1:2},changeConfirmPasswordType:function(){this.confirmPasswordType=2===this.confirmPasswordType?1:2},confirmBtn:function(){var s=this;if(1!=this.payPasswordStatus||this.requestInfo.oldPassword)if(this.requestInfo.newPassword)if(this.requestInfo.newPassword.length<6)this.DifferenceApi.showToast("密码长度不能少于6个字符");else if((new i.Utils).checkHaveLetterNumber(this.requestInfo.newPassword))if((new i.Utils).checkMustLetterNumber(this.requestInfo.newPassword))if(this.requestInfo.confirmPassword)if(this.requestInfo.confirmPassword.length<6)this.DifferenceApi.showToast("密码长度不能少于6个字符");else if(this.requestInfo.confirmPassword===this.requestInfo.newPassword){e.showLoading({title:"请求中...",mask:o.Config.mask});var t={newPassword:this.requestInfo.confirmPassword};this.requestInfo.oldPassword&&(t["oldPassword"]=this.requestInfo.oldPassword),new a.UpdatePayPwd(t).send().then(function(o){if(e.hideLoading(),o.errCode!==n.Const.success)return Promise.reject(o);r.SetLoginModel.setPayPwd(1),s.DifferenceApi.showToast(t["oldPassword"]?"支付密码更新成功":"支付密码设置成功"),setTimeout(function(){e.navigateBack({delta:1})},1e3)}).catch(function(t){e.hideLoading(),s.DifferenceApi.showToast(t.errMsg||"请求失败")})}else this.DifferenceApi.showToast("两次密码输入不一致");else this.DifferenceApi.showToast("请输入确认密码");else this.DifferenceApi.showToast("密码只能包含字母和数字");else this.DifferenceApi.showToast("密码应同时包含字母和数字");else this.DifferenceApi.showToast("请输入新密码");else this.DifferenceApi.showToast("请输入旧密码")}}};s.default=f}).call(this,t("543d")["default"])}},[["d892","common/runtime","common/vendor"]]]);
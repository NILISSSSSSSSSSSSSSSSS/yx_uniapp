(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesSet/changePassword/changePassword"],{"023a":function(e,s,o){"use strict";(function(e){Object.defineProperty(s,"__esModule",{value:!0}),s.default=void 0;var n=o("8c03"),t=o("a0ec"),r=o("2f2e"),i=o("8b8e"),a=o("983c"),f=o("6594"),d={data:function(){return{keywordImgMap:{1:{src:"http://cdn.haofang.net/static/xfyx-uniapp/tool/show_key.png",className:"show_key"},2:{src:"http://cdn.haofang.net/static/xfyx-uniapp/tool/hide_key.png",className:"hide_key"}},oldPasswordType:2,newPasswordType:2,confirmPasswordType:2,requestInfo:{oldPassword:"",newPassword:"",confirmPassword:""}}},methods:{inputOldPassword:function(e){this.requestInfo.oldPassword=e.detail.value},inputNewPassword:function(e){this.requestInfo.newPassword=e.detail.value},inputConfirmPassword:function(e){this.requestInfo.confirmPassword=e.detail.value},changeOldPasswordType:function(){this.oldPasswordType=2===this.oldPasswordType?1:2},changeNewPasswordType:function(){this.newPasswordType=2===this.newPasswordType?1:2},changeConfirmPasswordType:function(){this.confirmPasswordType=2===this.confirmPasswordType?1:2},confirmBtn:function(){var s=this;this.requestInfo.oldPassword?this.requestInfo.newPassword?this.requestInfo.newPassword.length<6?this.DifferenceApi.showToast("密码长度不能少于6个字符"):(new r.Utils).checkHaveLetterNumber(this.requestInfo.newPassword)?(new r.Utils).checkMustLetterNumber(this.requestInfo.newPassword)?this.requestInfo.confirmPassword?this.requestInfo.confirmPassword.length<6?this.DifferenceApi.showToast("密码长度不能少于6个字符"):this.requestInfo.confirmPassword===this.requestInfo.newPassword?(e.showLoading({title:"请求中...",mask:n.Config.mask}),new i.ModifyPassword({oldPassword:this.requestInfo.oldPassword,newPassword:this.requestInfo.confirmPassword}).send().then(function(o){if(e.hideLoading(),o.errCode!==t.Const.success)return Promise.reject(o);(new a.UserInfoModel).removeModel(),(new f.LoginSuccessModel).removeModel(),s.DifferenceApi.showToast("密码修改成功，请重新登录"),setTimeout(function(){e.reLaunch({url:"/pagesSet/login/login"})},1e3)}).catch(function(o){e.hideLoading(),s.DifferenceApi.showToast(o.errMsg||"请求失败")})):this.DifferenceApi.showToast("两次密码输入不一致"):this.DifferenceApi.showToast("请输入确认密码"):this.DifferenceApi.showToast("密码只能包含字母和数字"):this.DifferenceApi.showToast("密码应同时包含字母和数字"):this.DifferenceApi.showToast("请输入新密码"):this.DifferenceApi.showToast("请输入旧密码")}}};s.default=d}).call(this,o("543d")["default"])},"0ccd":function(e,s,o){"use strict";o.r(s);var n=o("d9f8"),t=o("9b1b");for(var r in t)"default"!==r&&function(e){o.d(s,e,function(){return t[e]})}(r);o("4f99");var i=o("2877"),a=Object(i["a"])(t["default"],n["a"],n["b"],!1,null,null,null);s["default"]=a.exports},"4f99":function(e,s,o){"use strict";var n=o("9d1b"),t=o.n(n);t.a},"9b1b":function(e,s,o){"use strict";o.r(s);var n=o("023a"),t=o.n(n);for(var r in n)"default"!==r&&function(e){o.d(s,e,function(){return n[e]})}(r);s["default"]=t.a},"9d1b":function(e,s,o){},d9f8:function(e,s,o){"use strict";var n=function(){var e=this,s=e.$createElement;e._self._c},t=[];o.d(s,"a",function(){return n}),o.d(s,"b",function(){return t})},dd30:function(e,s,o){"use strict";(function(e){o("d3e9"),o("921b");n(o("66fd"));var s=n(o("0ccd"));function n(e){return e&&e.__esModule?e:{default:e}}e(s.default)}).call(this,o("543d")["createPage"])}},[["dd30","common/runtime","common/vendor"]]]);
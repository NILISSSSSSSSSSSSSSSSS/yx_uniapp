(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesSet/personalCenter/personalCenter"],{"70d5":function(e,t,n){"use strict";var o=n("b7e2"),a=n.n(o);a.a},"776f":function(e,t,n){"use strict";var o,a=function(){var e=this,t=e.$createElement;e._self._c},i=[];n.d(t,"b",function(){return a}),n.d(t,"c",function(){return i}),n.d(t,"a",function(){return o})},"895c":function(e,t,n){"use strict";n.r(t);var o=n("ceab"),a=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,function(){return o[e]})}(i);t["default"]=a.a},b54e:function(e,t,n){"use strict";(function(e){n("3ea8"),n("921b");o(n("66fd"));var t=o(n("e277"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},b7e2:function(e,t,n){},ceab:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n("5962"),a=n("1675"),i=n("a538"),r=n("2c59"),s=(n("b2f8"),n("bea9"),n("0e91")),u=(n("5969"),n("b0ea")),c=n("2b2e"),l={data:function(){return{avatar:"",buildName:"",name:"",telephone:"",compName:"",compAddress:"",cityName:""}},onLoad:function(){(new c.Notification).addObserver(this,"PersonalInfoChange",u.Notify.PersonalInfoChange.Name)},onShow:function(){this.initData()},onUnload:function(){(new c.Notification).removeObserverAllNotification(this)},methods:{PersonalInfoChange:function(){this.initData()},initData:function(){this.name=o.GetLoginModel.getUserName(),this.buildName=o.GetLoginModel.getBuildName(),this.compName=o.GetLoginModel.getCompName(),this.compAddress=o.GetLoginModel.getCompAddress(),this.cityName=o.GetLoginModel.getCityName();var e=o.GetLoginModel.getTelephone()||"";e&&11===e.length&&(e=e.substring(0,3)+"****"+e.substring(e.length-4,e.length)),this.telephone=e;var t=i.Const.imDefaultHeadImg;o.GetLoginModel.getUserPhoto()&&(t=(new a.Utils).dealImgSrcSize(o.GetLoginModel.getUserPhoto(),80,80)),this.avatar=t},imgError:function(){this.avatar=i.Const.imDefaultHeadImg},chooseAvatar:function(){var t=this;e.showActionSheet({itemList:["拍照","从手机相册选择"],success:function(e){t.uploadImg(0===e.tapIndex?"camera":"album")}})},uploadImg:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"camera",n=this;e.chooseImage({count:1,sizeType:["compressed"],sourceType:[t],success:function(t){e.showLoading({title:"上传中...",mask:r.Config.mask}),(new a.Utils).upLoadImg(t.tempFilePaths[0]).then(function(t){if(t.errCode!==i.Const.success)return Promise.reject(t);e.hideLoading();var r=t.data||{};if(!r.path||!r.url)return null;var u=r.url||"";return u&&(u=(new a.Utils).dealImgSrcSize(u,80,80)),n.avatar=u,o.SetLoginModel.setUserPhoto(r.url||""),new s.UploadUserPhoto({userPhoto:r.path}).send()}).then(function(t){e.hideLoading()}).catch(function(t){e.hideLoading(),e.showToast({title:t.errMsg||"上传失败",icon:"none"})})}})}}};t.default=l}).call(this,n("6e42")["default"])},e277:function(e,t,n){"use strict";n.r(t);var o=n("776f"),a=n("895c");for(var i in a)"default"!==i&&function(e){n.d(t,e,function(){return a[e]})}(i);n("70d5");var r,s=n("f0c5"),u=Object(s["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);t["default"]=u.exports}},[["b54e","common/runtime","common/vendor"]]]);
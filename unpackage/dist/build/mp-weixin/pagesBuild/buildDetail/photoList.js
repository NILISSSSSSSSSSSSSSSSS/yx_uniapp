(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesBuild/buildDetail/photoList"],{"289f":function(t,e,o){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},i=[];o.d(e,"a",function(){return n}),o.d(e,"b",function(){return i})},"294a":function(t,e,o){},"2a06":function(t,e,o){"use strict";o.r(e);var n=o("8740"),i=o.n(n);for(var a in n)"default"!==a&&function(t){o.d(e,t,function(){return n[t]})}(a);e["default"]=i.a},"2cb2":function(t,e,o){"use strict";o.r(e);var n=o("289f"),i=o("2a06");for(var a in i)"default"!==a&&function(t){o.d(e,t,function(){return i[t]})}(a);o("70a9"),o("c684");var l=o("2877"),s=Object(l["a"])(i["default"],n["a"],n["b"],!1,null,"23e09354",null);e["default"]=s.exports},"70a9":function(t,e,o){"use strict";var n=o("294a"),i=o.n(n);i.a},"83f6":function(t,e,o){},8740:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=o("835c"),i=o("6594"),a=o("2f2e"),l=o("a0ec"),s=o("5e58"),u=o("10c9"),r=o("baf9"),c={data:function(){return{accountSource:null,buildId:"",selectBoxValue:"qjt",vrList:[],listObj:{},photoTypeObj:{1:{name:"效果图",value:"xgt",addType:2},2:{name:"规划图",value:"ght",addType:5},3:{name:"户型图",value:"hxt",addType:3},4:{name:"样板间",value:"ybt",addType:7},5:{name:"实景图",value:"sjt",addType:8},6:{name:"配套图",value:"ptt",addType:6}}}},onLoad:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.buildId=t.buildId,this.initData()},onShow:function(){this.accountSource=i.GetLoginModel.getAccountSource()},methods:{initData:function(){var t=this;new n.GetNewBuildPhotoListByType({flag:1,buildId:this.buildId}).send().then(function(e){if(console.log(e),e.errCode!==l.Const.success)t.DifferenceApi.showToast(e.errMsg);else{var o=e.data;t.vrList=o.vrList||[];var n=o.list||[],i=0;for(var a in t.photoTypeObj)t.listObj[a]={name:"",list:[]};var u=!0,r=!1,c=void 0;try{for(var d,f=n[Symbol.iterator]();!(u=(d=f.next()).done);u=!0){var h=d.value,p=!0,g=!1,v=void 0;try{for(var b,m=h.oneList[Symbol.iterator]();!(p=(b=m.next()).done);p=!0){var y=b.value;y.allIndex=i,i++}}catch(j){g=!0,v=j}finally{try{p||null==m.return||m.return()}finally{if(g)throw v}}t.listObj[h.photoType].list=h.oneList}}catch(j){r=!0,c=j}finally{try{u||null==f.return||f.return()}finally{if(r)throw c}}for(var T in(new s.buildModel).setModel(JSON.parse(JSON.stringify(n)),"photoList"),t.photoTypeObj)t.listObj[T].name=t.photoTypeObj[T].value,2===t.accountSource&&(t.listObj[T].list.length>0?t.listObj[T].list.push({photoUrl:"http://cdn.haofang.net/static/xfldDeveloper/build/add-img.png",photoId:""}):t.listObj[T].list=[{photoUrl:"http://cdn.haofang.net/static/xfldDeveloper/build/add-img.png",photoId:""}]);0===t.vrList.length&&(t.selectBoxValue="xgt"),console.log(t.listObj)}})},selectBox:function(t){this.selectBoxValue=t},goToVr:function(e){(new s.buildModel).setModel(e,"path"),t.navigateTo({url:"/pagesBuild/buildDetail/vrPage"})},imgVrError:function(t){this.vrList[t].photoAddr="http://cdn.haofang.net/static/xfldDeveloper/build/default-house-img.png"},imgBtn:function(e,o,n){1===this.accountSource&&(n=!1),n?(console.log("上传图片"),this.uploadImg(this.photoTypeObj[o].addType)):t.navigateTo({url:"/pagesBuild/buildDetail/photoListSwiper?allIndex="+e})},uploadImg:function(e){var o=this;t.chooseImage({count:1,success:function(i){console.log(i.tempFilePaths[0]),t.showLoading({title:"上传中..."}),(new a.Utils).upLoadImg(i.tempFilePaths[0]).then(function(i){if(console.log(i),t.hideLoading(),i.errCode!==l.Const.success)return Promise.reject(i);var a=i.data||{};if(!a.path||!a.url)return null;new n.AddBuildPhoto({photoAttr:a.path,photoType:e,buildId:o.buildId}).send().then(function(t){if(t.errCode!==l.Const.success)return Promise.reject(t);o.initData(),(new r.Notification).postNotification(u.Notify.PhotoChange.Name)})}).catch(function(e){console.log("err",e),t.hideLoading(),t.showToast({title:e.errMsg||"上传失败",icon:"none"})})}})},delImg:function(e,o,i){console.log("删除图片");var a=this;t.showModal({title:"提示",content:"是否确认删除？",success:function(t){t.confirm&&new n.DeleteOneLayOutPhoto({buildId:a.buildId,photoId:e}).send().then(function(t){t.errCode!==l.Const.success?a.DifferenceApi.showToast(t.errMsg):(a.DifferenceApi.showToast("删除成功"),console.log(a.listObj[o].list,o,i),a.listObj[o].list.splice(i,1),a.$forceUpdate(),(new r.Notification).postNotification(u.Notify.PhotoChange.Name))})}})}}};e.default=c}).call(this,o("543d")["default"])},c684:function(t,e,o){"use strict";var n=o("83f6"),i=o.n(n);i.a},d817:function(t,e,o){"use strict";(function(t){o("d3e9"),o("921b");n(o("66fd"));var e=n(o("2cb2"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("543d")["createPage"])}},[["d817","common/runtime","common/vendor"]]]);
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesBuild/addEditBuilding/addEditBuildingSecond"],{"4dd9":function(e,i,t){"use strict";var a=t("e73e"),l=t.n(a);l.a},"4dfe":function(e,i,t){"use strict";t.r(i);var a=t("e9b7"),l=t("8bd8");for(var s in l)"default"!==s&&function(e){t.d(i,e,function(){return l[e]})}(s);t("4dd9"),t("fe7c");var n=t("2877"),r=Object(n["a"])(l["default"],a["a"],a["b"],!1,null,"d4bc3e4c",null);i["default"]=r.exports},"5f80":function(e,i,t){"use strict";(function(e){t("d3e9"),t("921b");a(t("66fd"));var i=a(t("4dfe"));function a(e){return e&&e.__esModule?e:{default:e}}e(i.default)}).call(this,t("543d")["createPage"])},"8bd8":function(e,i,t){"use strict";t.r(i);var a=t("f7b4"),l=t.n(a);for(var s in a)"default"!==s&&function(e){t.d(i,e,function(){return a[e]})}(s);i["default"]=l.a},e73e:function(e,i,t){},e9b7:function(e,i,t){"use strict";var a=function(){var e=this,i=e.$createElement;e._self._c},l=[];t.d(i,"a",function(){return a}),t.d(i,"b",function(){return l})},f7b4:function(e,i,t){"use strict";(function(e){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;t("6594");var a=t("2f2e"),l=t("0513"),s=t("5e58"),n=t("835c"),r=t("a0ec"),u=t("10c9"),o=t("baf9"),c={data:function(){return{type:"",allParamsObj:{},paramsObj:{city:"",buildingState:null,minTotalPrice:null,maxTotalPrice:null,totalPriceUnit:"万元",averagePrice:null,openingDate:"",handoverTime:"",occupyArea:"",propertyPeriod:"",propertyFee:"",buildingArea:"",plotRatio:null,greeningRatio:null,carportRatio:null,totalHouseholds:null,decorateDegree:"",floorState:"",presellLicense:"",buildingLabels:"",buildingIntroduction:"",surroundSupporting:"",latitude:"",longitude:""},buildingStatusList:[{value:"待售",id:1},{value:"在售",id:2},{value:"售罄",id:3},{value:"招商",id:4},{value:"招租",id:5}],buildingIndex:null,buildingStatusName:"",unitList:[{value:"万元"},{value:"元/月"},{value:"元/平方米/月"}],unitIndex:0,propertyPeriodList:["40","50","70"],propertyPeriodIndex:null,decorateDegreeList:["简装","毛坯","精装","豪装"],decorateDegreeIndex:null,labelList:[{value:"住宅",isActive:!0},{value:"公寓",isActive:!1},{value:"花园洋房",isActive:!1},{value:"不限购",isActive:!1},{value:"loft",isActive:!1},{value:"改善",isActive:!1},{value:"投资",isActive:!1},{value:"豪华社区",isActive:!1},{value:"公园",isActive:!1},{value:"生态宜居",isActive:!1},{value:"水景",isActive:!1},{value:"养老",isActive:!1},{value:"旅游",isActive:!1},{value:"打折优惠",isActive:!1},{value:"小户型",isActive:!1},{value:"低总价",isActive:!1},{value:"现房",isActive:!1},{value:"教育",isActive:!1},{value:"品牌开发商",isActive:!1},{value:"地铁",isActive:!1},{value:"刚需",isActive:!1},{value:"婚房",isActive:!1}],selectLabelList:["住宅"],mapUrl:"",mapName:"",timeMin:null,timeMax:null}},onLoad:function(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.type=i.type,"add"===i.type?(e.setNavigationBarTitle({title:"添加楼盘"}),this.getMapUrl()):(e.setNavigationBarTitle({title:"编辑楼盘"}),this.editDealObj())},methods:{editDealObj:function(){var e=this;if((new s.buildModel).getModel("saveParams")){var i=(new s.buildModel).getModel("saveParams")||{};for(var t in this.allParamsObj=i,i)this.paramsObj[t]=i[t]||"";this.mapName=i["buildingName"]||"",this.getMapUrl(),this.buildingStatusList.forEach(function(t,a){i.buildingState&&i.buildingState===t.id&&(e.buildingIndex=a,e.buildingStatusName=t.value)}),this.unitList.forEach(function(t,a){i.totalPriceUnit&&i.totalPriceUnit===t.value&&(e.unitIndex=a)}),this.propertyPeriodList.forEach(function(t,a){i.propertyPeriod&&i.propertyPeriod===t&&(e.propertyPeriodIndex=a)}),this.decorateDegreeList.forEach(function(t,a){i.decorateDegree&&i.decorateDegree===t&&(e.decorateDegreeIndex=a)}),this.selectLabelList=this.paramsObj.buildingLabels?this.paramsObj.buildingLabels.split(","):[],this.labelList.forEach(function(i,t){var a=!0,l=!1,s=void 0;try{for(var n,r=e.selectLabelList[Symbol.iterator]();!(a=(n=r.next()).done);a=!0){var u=n.value;i.value===u&&(e.labelList[t].isActive=!0)}}catch(o){l=!0,s=o}finally{try{a||null==r.return||r.return()}finally{if(l)throw s}}})}},buildingStatusChangePicker:function(e){this.buildingIndex=e.detail.value,this.buildingStatusName=this.buildingStatusList[e.detail.value].value,this.paramsObj.buildingState=this.buildingStatusList[e.detail.value].id},unitChangePicker:function(e){this.unitIndex=e.detail.value,this.paramsObj.totalPriceUnit=this.unitList[e.detail.value].value},openingDateChange:function(e){this.paramsObj.openingDate=e.detail.value},handoverTimeChange:function(e){this.paramsObj.handoverTime=e.detail.value},propertyPeriodChange:function(e){this.propertyPeriodIndex=e.detail.value,this.paramsObj.propertyPeriod=this.propertyPeriodList[e.detail.value]},decorateDegreeChange:function(e){this.decorateDegreeIndex=e.detail.value,this.paramsObj.decorateDegree=this.decorateDegreeList[e.detail.value]},changeLabelStatus:function(e,i){if("住宅"!==i)if(this.labelList[e].isActive){this.labelList[e].isActive=!this.labelList[e].isActive;var t=null;this.selectLabelList.forEach(function(e,a){e===i&&(t=a)}),this.selectLabelList.splice(t,1)}else{if(this.selectLabelList.length>=5)return void this.DifferenceApi.showToast("最多选择5个标签");this.labelList[e].isActive=!this.labelList[e].isActive,this.selectLabelList.push(i)}},getMapUrl:function(){var e=(new l.GpsInfoModel).getModel("gpsInfo")||{};this.paramsObj.city=e.cityId||"",this.mapUrl=(new a.Utils).getMapStaticImg(this.paramsObj.latitude||e.lat,this.paramsObj.longitude||e.lng,335,240)},selecMap:function(){var i=this;e.chooseLocation({keyword:i.mapName||"",success:function(e){console.log("位置名称："+e.name),console.log("详细地址："+e.address),console.log("纬度："+e.latitude),console.log("经度："+e.longitude),i.mapName=e.name,i.mapUrl=(new a.Utils).getMapStaticImg(e.latitude,e.longitude,335,240),i.paramsObj.latitude=e.latitude,i.paramsObj.longitude=e.longitude}})},inputNumMin:function(e){var i=this;clearTimeout(this.timeMin),""!==e.detail.value&&Number(e.detail.value)<=0&&(this.timeMin=setTimeout(function(){i.paramsObj.minTotalPrice=""},10))},inputNumBlurMin:function(e){""!==e.detail.value&&null!==this.paramsObj.maxTotalPrice&&""!==this.paramsObj.maxTotalPrice&&Number(e.detail.value)>=Number(this.paramsObj.maxTotalPrice)&&this.DifferenceApi.showToast("总价最小值应该小于最大值")},inputNumMax:function(e){var i=this;clearTimeout(this.timeMax),""!==e.detail.value&&Number(e.detail.value)<=0&&(this.timeMax=setTimeout(function(){i.paramsObj.maxTotalPrice=""},10))},inputNumBlurMax:function(e){""!==e.detail.value&&null!==this.paramsObj.minTotalPrice&&""!==this.paramsObj.minTotalPrice&&Number(e.detail.value)<=Number(this.paramsObj.minTotalPrice)&&this.DifferenceApi.showToast("总价最大值应该大于最小值")},save:function(){var i=this;if(this.buildingStatusName)if(""!==this.paramsObj.minTotalPrice&&null!==this.paramsObj.maxTotalPrice&&""!==this.paramsObj.maxTotalPrice&&Number(this.paramsObj.minTotalPrice)>=Number(this.paramsObj.maxTotalPrice))this.DifferenceApi.showToast("总价最小值应该小于最大值");else if(""!==this.paramsObj.maxTotalPrice&&null!==this.paramsObj.minTotalPrice&&""!==this.paramsObj.minTotalPrice&&Number(this.paramsObj.maxTotalPrice)<=Number(this.paramsObj.minTotalPrice))this.DifferenceApi.showToast("总价最大值应该大于最小值");else{var t=(new s.buildModel).getModel("saveParamsFirst")||{};Object.assign(this.paramsObj,t),this.paramsObj.buildingLabels=this.selectLabelList.join(","),console.log(this.paramsObj,"paramsObj"),new n.SaveBuildingInfo(this.paramsObj).send().then(function(t){console.log(t,"save"),t.errCode!==r.Const.success?i.DifferenceApi.showToast(t.errMsg):((new o.Notification).postNotification(u.Notify.SaveBuildChange.Name),e.navigateBack({delta:2}))})}else this.DifferenceApi.showToast("请填写楼盘状态")}}};i.default=c}).call(this,t("543d")["default"])},fa52:function(e,i,t){},fe7c:function(e,i,t){"use strict";var a=t("fa52"),l=t.n(a);l.a}},[["5f80","common/runtime","common/vendor"]]]);
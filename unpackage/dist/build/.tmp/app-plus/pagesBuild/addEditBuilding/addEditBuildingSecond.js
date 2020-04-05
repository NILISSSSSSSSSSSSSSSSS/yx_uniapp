(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesBuild/addEditBuilding/addEditBuildingSecond"],{"3b9a":function(e,i,t){"use strict";var a=t("fcd3"),l=t.n(a);l.a},"410b":function(e,i,t){"use strict";(function(e,a){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;t("5962");var l=t("1675"),n=t("616c"),s=t("4464"),u=t("71c1"),r=t("a538"),o=t("b0ea"),d=t("2b2e"),c={data:function(){return{type:"",allParamsObj:{},paramsObj:{city:"",buildingState:null,minTotalPrice:null,maxTotalPrice:null,totalPriceUnit:"万元",averagePrice:null,openingDate:"",handoverTime:"",occupyArea:"",propertyPeriod:"",propertyFee:"",buildingArea:"",plotRatio:null,greeningRatio:null,carportRatio:null,totalHouseholds:null,decorateDegree:"",floorState:"",presellLicense:"",buildingLabels:"",buildingIntroduction:"",surroundSupporting:"",latitude:"",longitude:""},buildingStatusList:[{value:"待售",id:1},{value:"在售",id:2},{value:"售罄",id:3},{value:"招商",id:4},{value:"招租",id:5}],buildingIndex:null,buildingStatusName:"",unitList:[{value:"万元"},{value:"元/月"},{value:"元/平方米/月"}],unitIndex:0,propertyPeriodList:["40","50","70"],propertyPeriodIndex:null,decorateDegreeList:["简装","毛坯","精装","豪装"],decorateDegreeIndex:null,labelList:[{value:"住宅",isActive:!0},{value:"公寓",isActive:!1},{value:"花园洋房",isActive:!1},{value:"不限购",isActive:!1},{value:"loft",isActive:!1},{value:"改善",isActive:!1},{value:"投资",isActive:!1},{value:"豪华社区",isActive:!1},{value:"公园",isActive:!1},{value:"生态宜居",isActive:!1},{value:"水景",isActive:!1},{value:"养老",isActive:!1},{value:"旅游",isActive:!1},{value:"打折优惠",isActive:!1},{value:"小户型",isActive:!1},{value:"低总价",isActive:!1},{value:"现房",isActive:!1},{value:"教育",isActive:!1},{value:"品牌开发商",isActive:!1},{value:"地铁",isActive:!1},{value:"刚需",isActive:!1},{value:"婚房",isActive:!1}],selectLabelList:["住宅"],mapUrl:"",mapName:"",timeMin:null,timeMax:null}},onLoad:function(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.type=i.type,"add"===i.type?(e.setNavigationBarTitle({title:"添加楼盘"}),this.getMapUrl()):(e.setNavigationBarTitle({title:"编辑楼盘"}),this.editDealObj())},methods:{editDealObj:function(){var e=this;if((new s.buildModel).getModel("saveParams")){var i=(new s.buildModel).getModel("saveParams")||{};for(var t in this.allParamsObj=i,i)this.paramsObj[t]=i[t]||"";this.mapName=i["buildingName"]||"",this.getMapUrl(),this.buildingStatusList.forEach(function(t,a){i.buildingState&&i.buildingState===t.id&&(e.buildingIndex=a,e.buildingStatusName=t.value)}),this.unitList.forEach(function(t,a){i.totalPriceUnit&&i.totalPriceUnit===t.value&&(e.unitIndex=a)}),this.propertyPeriodList.forEach(function(t,a){i.propertyPeriod&&i.propertyPeriod===t&&(e.propertyPeriodIndex=a)}),this.decorateDegreeList.forEach(function(t,a){i.decorateDegree&&i.decorateDegree===t&&(e.decorateDegreeIndex=a)}),this.selectLabelList=this.paramsObj.buildingLabels?this.paramsObj.buildingLabels.split(","):[],this.labelList.forEach(function(i,t){var a=!0,l=!1,n=void 0;try{for(var s,u=e.selectLabelList[Symbol.iterator]();!(a=(s=u.next()).done);a=!0){var r=s.value;i.value===r&&(e.labelList[t].isActive=!0)}}catch(o){l=!0,n=o}finally{try{a||null==u.return||u.return()}finally{if(l)throw n}}})}},buildingStatusChangePicker:function(e){this.buildingIndex=e.detail.value,this.buildingStatusName=this.buildingStatusList[e.detail.value].value,this.paramsObj.buildingState=this.buildingStatusList[e.detail.value].id},unitChangePicker:function(e){this.unitIndex=e.detail.value,this.paramsObj.totalPriceUnit=this.unitList[e.detail.value].value},openingDateChange:function(e){this.paramsObj.openingDate=e.detail.value},handoverTimeChange:function(e){this.paramsObj.handoverTime=e.detail.value},propertyPeriodChange:function(e){this.propertyPeriodIndex=e.detail.value,this.paramsObj.propertyPeriod=this.propertyPeriodList[e.detail.value]},decorateDegreeChange:function(e){this.decorateDegreeIndex=e.detail.value,this.paramsObj.decorateDegree=this.decorateDegreeList[e.detail.value]},changeLabelStatus:function(e,i){if("住宅"!==i)if(this.labelList[e].isActive){this.labelList[e].isActive=!this.labelList[e].isActive;var t=null;this.selectLabelList.forEach(function(e,a){e===i&&(t=a)}),this.selectLabelList.splice(t,1)}else{if(this.selectLabelList.length>=5)return void this.DifferenceApi.showToast("最多选择5个标签");this.labelList[e].isActive=!this.labelList[e].isActive,this.selectLabelList.push(i)}},getMapUrl:function(){var e=(new n.GpsInfoModel).getModel("gpsInfo")||{};this.paramsObj.city=e.cityId||"",this.mapUrl=(new l.Utils).getMapStaticImg(this.paramsObj.latitude||e.lat,this.paramsObj.longitude||e.lng,335,240)},selecMap:function(){var i=this;e.chooseLocation({keyword:i.mapName||"",success:function(e){console.log(a("位置名称："+e.name," at pagesBuild\\addEditBuilding\\addEditBuildingSecond.vue:476")),console.log(a("详细地址："+e.address," at pagesBuild\\addEditBuilding\\addEditBuildingSecond.vue:477")),console.log(a("纬度："+e.latitude," at pagesBuild\\addEditBuilding\\addEditBuildingSecond.vue:478")),console.log(a("经度："+e.longitude," at pagesBuild\\addEditBuilding\\addEditBuildingSecond.vue:479")),i.mapName=e.name,i.mapUrl=(new l.Utils).getMapStaticImg(e.latitude,e.longitude,335,240),i.paramsObj.latitude=e.latitude,i.paramsObj.longitude=e.longitude}})},inputNumMin:function(e){var i=this;clearTimeout(this.timeMin),""!==e.detail.value&&Number(e.detail.value)<=0&&(this.timeMin=setTimeout(function(){i.paramsObj.minTotalPrice=""},10))},inputNumBlurMin:function(e){""!==e.detail.value&&null!==this.paramsObj.maxTotalPrice&&""!==this.paramsObj.maxTotalPrice&&Number(e.detail.value)>=Number(this.paramsObj.maxTotalPrice)&&this.DifferenceApi.showToast("总价最小值应该小于最大值")},inputNumMax:function(e){var i=this;clearTimeout(this.timeMax),""!==e.detail.value&&Number(e.detail.value)<=0&&(this.timeMax=setTimeout(function(){i.paramsObj.maxTotalPrice=""},10))},inputNumBlurMax:function(e){""!==e.detail.value&&null!==this.paramsObj.minTotalPrice&&""!==this.paramsObj.minTotalPrice&&Number(e.detail.value)<=Number(this.paramsObj.minTotalPrice)&&this.DifferenceApi.showToast("总价最大值应该大于最小值")},save:function(){var i=this;if(this.buildingStatusName)if(""!==this.paramsObj.minTotalPrice&&null!==this.paramsObj.maxTotalPrice&&""!==this.paramsObj.maxTotalPrice&&Number(this.paramsObj.minTotalPrice)>=Number(this.paramsObj.maxTotalPrice))this.DifferenceApi.showToast("总价最小值应该小于最大值");else if(""!==this.paramsObj.maxTotalPrice&&null!==this.paramsObj.minTotalPrice&&""!==this.paramsObj.minTotalPrice&&Number(this.paramsObj.maxTotalPrice)<=Number(this.paramsObj.minTotalPrice))this.DifferenceApi.showToast("总价最大值应该大于最小值");else{var t=(new s.buildModel).getModel("saveParamsFirst")||{};Object.assign(this.paramsObj,t),this.paramsObj.buildingLabels=this.selectLabelList.join(","),console.log(a(this.paramsObj,"paramsObj"," at pagesBuild\\addEditBuilding\\addEditBuildingSecond.vue:543")),new u.SaveBuildingInfo(this.paramsObj).send().then(function(t){console.log(a(t,"save"," at pagesBuild\\addEditBuilding\\addEditBuildingSecond.vue:545")),t.errCode!==r.Const.success?i.DifferenceApi.showToast(t.errMsg):((new d.Notification).postNotification(o.Notify.SaveBuildChange.Name),e.navigateBack({delta:2}))})}else this.DifferenceApi.showToast("请填写楼盘状态")}}};i.default=c}).call(this,t("6e42")["default"],t("0de9")["default"])},7214:function(e,i,t){"use strict";(function(e){t("3ea8"),t("921b");a(t("66fd"));var i=a(t("c723"));function a(e){return e&&e.__esModule?e:{default:e}}e(i.default)}).call(this,t("6e42")["createPage"])},"7c16":function(e,i,t){"use strict";t.r(i);var a=t("410b"),l=t.n(a);for(var n in a)"default"!==n&&function(e){t.d(i,e,function(){return a[e]})}(n);i["default"]=l.a},9534:function(e,i,t){"use strict";var a=t("bca4"),l=t.n(a);l.a},b77a:function(e,i,t){"use strict";var a,l=function(){var e=this,i=e.$createElement;e._self._c},n=[];t.d(i,"b",function(){return l}),t.d(i,"c",function(){return n}),t.d(i,"a",function(){return a})},bca4:function(e,i,t){},c723:function(e,i,t){"use strict";t.r(i);var a=t("b77a"),l=t("7c16");for(var n in l)"default"!==n&&function(e){t.d(i,e,function(){return l[e]})}(n);t("9534"),t("3b9a");var s,u=t("f0c5"),r=Object(u["a"])(l["default"],a["b"],a["c"],!1,null,"214cf76c",null,!1,a["a"],s);i["default"]=r.exports},fcd3:function(e,i,t){}},[["7214","common/runtime","common/vendor"]]]);
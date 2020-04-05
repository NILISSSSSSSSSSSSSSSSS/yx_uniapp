(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesStatistics/analysis/components/content"],{"374e":function(t,e,n){"use strict";n.r(e);var a=n("5b46"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);e["default"]=i.a},"5b46":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=s(n("46b1")),i=n("baf9"),o=n("10c9");n("b843");function s(t){return t&&t.__esModule?t:{default:t}}var r=function(){return Promise.all([n.e("common/vendor"),n.e("pagesStatistics/analysis/components/components/chart_line")]).then(n.bind(null,"7a4c"))},c=function(){return Promise.all([n.e("common/vendor"),n.e("pagesStatistics/analysis/components/components/chart_column")]).then(n.bind(null,"68b0"))},l=function(){return Promise.all([n.e("common/vendor"),n.e("pagesStatistics/analysis/components/components/chart_percentage_bandRate")]).then(n.bind(null,"a54f"))},d=function(){return Promise.all([n.e("common/vendor"),n.e("pagesStatistics/analysis/components/components/chart_percentage_sign")]).then(n.bind(null,"ad82"))},m=function(){return Promise.all([n.e("common/vendor"),n.e("pagesStatistics/analysis/components/components/chart_percentage_report")]).then(n.bind(null,"fd59"))},h=function(){return Promise.all([n.e("common/vendor"),n.e("pagesStatistics/analysis/components/components/chart_percentage_commission")]).then(n.bind(null,"a136"))},u=function(){return Promise.all([n.e("common/vendor"),n.e("pagesStatistics/analysis/components/components/chart_layout")]).then(n.bind(null,"fba0"))},p=function(){return Promise.all([n.e("common/vendor"),n.e("pagesStatistics/analysis/components/components/chart_shop")]).then(n.bind(null,"45ae"))},_=function(){return n.e("components/collectFormId").then(n.bind(null,"7fe2"))},f={props:["content_data","calender_start","calender_end","calender_type","init_time"],components:{chart_line:r,chart_column:c,chart_layout:u,chart_shop:p,collectFormId:_,chart_percentage_bandRate:l,chart_percentage_sign:d,chart_percentage_report:m,chart_percentage_commission:h},data:function(){return{calender:{week:{start:"",end:""},month:"",all:{start:"",end:""}},timer_picker:"",swiper:{currentIndex:0},sort_active:"validReport",isPeople:!1,people_rank:[],trend:null,compare:null,percentage:null,layout:null,shop:null,dataList:null,compare_name:"户型"}},watch:{content_data:function(){this.getData()}},methods:{StatisticsTimeChange:function(t,e){"week"===this.content_data.timer_picker?(this.calender.week.start=e.weekStartTimeStr,this.calender.week.end=e.weekEndTimeStr):"month"===this.content_data.timer_picker?this.calender.month=e.monthStart:"year"===this.content_data.timer_picker&&(this.calender.all.start=e.dayStartTime,this.calender.all.end=e.dayEndTime)},changeSwiper:function(t){this.swiper.currentIndex=t.detail.current},swiperTo:function(t){this.swiper.currentIndex=t,0===t?this.compare_name="户型":1===t&&(this.compare_name="门店")},sort_by:function(t){this.sort_active=t,Array.isArray(this.dataList)&&this.dataList.sort(function(e,n){return n[t]-e[t]}),this.isPeople&&(this.people_rank=this.dataList.slice(0,5))},chooseDate:function(){var e="",n="",i=new Date(this.init_time).getTime();if("week"===this.content_data.timer_picker)e="/pagesTool/chooseDate/chooseWeek",n="?weekStartTime=".concat((0,a.default)(this.calender.week.start).format("YYYY/MM/DD"),"&initTime=").concat(i);else if("month"===this.content_data.timer_picker)e="/pagesTool/chooseDate/chooseYear",n="?chooseMonthStart=".concat((0,a.default)(this.calender.month).format("YYYY/MM"),"/01&initTime=").concat(i);else if("year"===this.content_data.timer_picker){e="/pagesTool/chooseDate/chooseDay";var o="".concat((0,a.default)(this.calender.all.start).format("YYYY/MM/DD")),s="".concat((0,a.default)(this.calender.all.end).format("YYYY/MM/DD"));n="?dayStartTime=".concat(o,"&dayEndTime=").concat(s,"&initTime=").concat(i)}t.navigateTo({url:"".concat(e).concat(n)})},moment:function(t){return(0,a.default)(t)},getData:function(){this.timer_picker=this.content_data.timer_picker,this.trend={series:this.content_data.trend.series,max:this.content_data.trend.max,allDealTrends:this.content_data.trend.allDealTrends,categories:this.content_data.trend.categories},this.compare={series:this.content_data.compare.series,max:this.content_data.compare.max,custCount:this.content_data.compare.custCount,categories:this.content_data.compare.categories},this.layout={series:this.content_data.layout.series,title:this.content_data.layout.title,legend:this.content_data.layout.legend},this.shop={series:this.content_data.shop.series,title:this.content_data.shop.title,legend:this.content_data.shop.legend},this.percentage={content_data_list:this.content_data.percentage.content_data_list,bandRate:this.content_data.percentage.bandRate,commissionRate:this.content_data.percentage.commissionRate,reportRate:this.content_data.percentage.reportRate,signRate:this.content_data.percentage.signRate},this.dataList=this.content_data.dataList||[];for(var t=0;t<this.dataList.length;t++){if(0===this.dataList)break;this.dataList[t].commissionAmount=this.dataList[t].commissionAmount||0}this.content_data.dataList&&this.content_data.dataList.length>0&&this.content_data.dataList[0].userName&&(this.isPeople=!0),this.sort_by("validReport")}},computed:{allDealTrends:function(){return this.trend.allDealTrends||[]},custCount:function(){return this.compare.custCount||{}}},filters:{commissionAmount:function(t){var e=t/1e4;return Math.floor(e)}},created:function(){var t=this;this.getData(),(new i.Notification).addObserver(this,"StatisticsTimeChange",o.Notify.StatisticsTimeChange.Name),"week"===this.calender_type?(this.calender.week.start=this.calender_start,this.calender.week.end=this.calender_end):"month"===this.calender_type?this.calender.month=this.calender_start:"all"===this.calender_type&&(this.calender.all.start=this.calender_start,this.calender.all.end=this.calender_end),setTimeout(function(){t.getData()})}};e.default=f}).call(this,n("543d")["default"])},7794:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=(t._self._c,t.moment(t.calender.week.end).format("YYYY")),a=t.moment(t.calender.week.start).format("M.DD"),i=t.moment(t.calender.week.end).format("\tM.DD"),o=t.moment(t.calender.month).format("YYYY"),s=t.moment(t.calender.month).format("MM"),r=t.moment(t.calender.all.start).format("YYYY年MM月"),c=t.moment(t.calender.all.now).format("YYYY年MM月"),l=t.__map(t.dataList,function(e,n){var a=e.report.toFixed(0),i=e.band.toFixed(0),o=e.subscription.toFixed(0),s=e.sign.toFixed(0),r=e.commission.toFixed(0),c=t._f("commissionAmount")(e.commissionAmount);return{$orig:t.__get_orig(e),g7:a,g8:i,g9:o,g10:s,g11:r,f0:c}}),d=t.__map(t.dataList,function(e,n){var a=e.report.toFixed(0),i=e.band.toFixed(0),o=e.subscription.toFixed(0),s=e.sign.toFixed(0),r=e.commission.toFixed(0),c=t._f("commissionAmount")(e.commissionAmount);return{$orig:t.__get_orig(e),g12:a,g13:i,g14:o,g15:s,g16:r,f1:c}});t.$mp.data=Object.assign({},{$root:{g0:n,g1:a,g2:i,g3:o,g4:s,g5:r,g6:c,l0:l,l1:d}})},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},d194:function(t,e,n){"use strict";n.r(e);var a=n("7794"),i=n("374e");for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);n("f10b");var s=n("2877"),r=Object(s["a"])(i["default"],a["a"],a["b"],!1,null,"7f592e59",null);e["default"]=r.exports},f10b:function(t,e,n){"use strict";var a=n("f21f"),i=n.n(a);i.a},f21f:function(t,e,n){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pagesStatistics/analysis/components/content-create-component',
    {
        'pagesStatistics/analysis/components/content-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("d194"))
        })
    },
    [['pagesStatistics/analysis/components/content-create-component']]
]);

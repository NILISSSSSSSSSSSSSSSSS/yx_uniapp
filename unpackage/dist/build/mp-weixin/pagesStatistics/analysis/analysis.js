(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesStatistics/analysis/analysis"],{"0508":function(e,t,a){"use strict";(function(e){a("d3e9"),a("921b");n(a("66fd"));var t=n(a("21fd"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,a("543d")["createPage"])},"21fd":function(e,t,a){"use strict";a.r(t);var n=a("9c52"),o=a("9cf2");for(var r in o)"default"!==r&&function(e){a.d(t,e,function(){return o[e]})}(r);a("8228");var c=a("2877"),l=Object(c["a"])(o["default"],n["a"],n["b"],!1,null,null,null);t["default"]=l.exports},"65ac":function(e,t,a){},8228:function(e,t,a){"use strict";var n=a("65ac"),o=a.n(n);o.a},"9c52":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement;e._self._c},o=[];a.d(t,"a",function(){return n}),a.d(t,"b",function(){return o})},"9cf2":function(e,t,a){"use strict";a.r(t);var n=a("c796"),o=a.n(n);for(var r in n)"default"!==r&&function(e){a.d(t,e,function(){return n[e]})}(r);t["default"]=o.a},c796:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a("b843"),o=a("c500"),r=a("6594"),c=i(a("46b1")),l=a("baf9"),d=a("10c9");function i(e){return e&&e.__esModule?e:{default:e}}var s=function(){return a.e("pagesStatistics/analysis/components/content").then(a.bind(null,"d194"))},u={components:{content:s},data:function(){return{title:r.GetLoginModel.getBuildName(),swiper:{currentIndex:0},weekData:null,monthData:null,allData:null,init_time:"",time_str:"",calender:{week_calender_start:"",week_calender_end:"",month_calender_start:"",month_calender_end:"",all_calender_start:"",all_calender_end:""}}},methods:{StatisticsTimeChange:function(e,t){"chooseWeek"===t.type?(this.calender.week_calender_start="".concat((0,c.default)(t.weekStartTimeStr).format("YYYY/MM/DD")),this.calender.week_calender_end="".concat((0,c.default)(t.weekEndTimeStr).format("YYYY/MM/DD")),this.time_str="".concat((0,c.default)(t.weekStartTimeStr).format("YYYY-MM-DD")," - ").concat((0,c.default)(t.weekEndTimeStr).format("YYYY-MM-DD")),this.requestWeekData(this.time_str)):"chooseYear"===t.type?(this.calender.month_calender_start="".concat((0,c.default)(t.monthStart).format("YYYY/MM/DD")),this.calender.month_calender_end="".concat((0,c.default)(t.monthEnd).format("YYYY/MM/DD")),this.time_str="".concat((0,c.default)(t.monthStart).format("YYYY-MM-DD")," - ").concat((0,c.default)(t.monthEnd).format("YYYY-MM-DD")),this.requestMonthData(this.time_str)):"chooseDay"===t.type&&(this.calender.all_calender_start="".concat((0,c.default)(t.dayStartTime).format("YYYY/MM/DD")),this.calender.all_calender_end="".concat((0,c.default)(t.dayEndTime).format("YYYY/MM/DD")),this.time_str="".concat((0,c.default)(t.dayStartTime).format("YYYY-MM-DD")," - ").concat((0,c.default)(t.dayEndTime).format("YYYY-MM-DD")),this.requestAllData(this.time_str,this.time_str,1))},changeSwiper:function(e){this.swiper.currentIndex=e.detail.current},swiperTo:function(e){this.swiper.currentIndex=e},getTime:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if("week"===e)return this.calender.week_calender_start="".concat((new Date).getFullYear(),"/").concat((new Date).getMonth()+1,"/").concat((new Date).getDate()-(new Date).getDay()-6),this.calender.week_calender_end="".concat((new Date).getFullYear(),"/").concat((new Date).getMonth()+1,"/").concat((new Date).getDate()-(new Date).getDay()),"".concat((new Date).getFullYear(),"-").concat((new Date).getMonth()+1,"-").concat((new Date).getDate()-(new Date).getDay()-6," - ").concat((new Date).getFullYear(),"-").concat((new Date).getMonth()+1,"-").concat((new Date).getDate()-(new Date).getDay());if("month"===e){var a=new Date,n=("".concat(a.getFullYear(),"-").concat(a.getMonth()+1,"-1"),a.getTime()),o=n-24*a.getDate()*60*60*1e3,r="";a.getMonth()<11?r="".concat(a.getFullYear(),"/").concat(a.getMonth()+2,"/1"):11==a.getMonth()&&(r="".concat(a.getFullYear()+1,"/1/1"));var c=new Date(r).getTime()-864e5;return t?(this.calender.month_calender_start=o,this.calender.month_calender_end=o,"".concat(a.getFullYear(),"-").concat(a.getMonth(),"-1 - ").concat(a.getFullYear(),"-").concat(a.getMonth(),"-").concat(new Date(o).getDate())):(this.calender.month_calender_start=n,this.calender.month_calender_end=n,"".concat(a.getFullYear(),"-").concat(a.getMonth()+1,"-1 - ").concat(a.getFullYear(),"-").concat(a.getMonth()+1,"-").concat(new Date(c).getDate()))}},requestWeekData:function(e){var t=this,a=e||this.getTime("week"),r={date:a||"2019-11-01 - 2019-11-05"},c={type:1,date:a||"2019-11-01 - 2019-11-05"},l={type:2,date:a||"2019-11-01 - 2019-11-05"};Promise.all([new n.CommissionDealTrend(r).send(),new n.CustDataInfo(r).send(),new n.CustStatisticInfo(r).send(),new n.SellProportion(c).send(),new n.SellProportion(l).send(),new n.GetDptsCustRanking(r).send()]).then(function(e){var a={trend:null,compare:null,layout:null,shop:null,percentage:null,timer_picker:"week",dataList:null};200===e[0].errCode&&(a.trend=o.week_month_data_change.changeAllDealTrends(e[0].data)),200===e[1].errCode&&(a.compare=o.week_month_data_change.changeCustDataInfo(e[1].data)),200===e[2].errCode&&(a.percentage=o.week_month_data_change.custStatisticInfo(e[2].data)),200===e[3].errCode&&(a.layout=o.week_month_data_change.changeSellProportionLayout(e[3].data)),200===e[4].errCode&&(a.shop=o.week_month_data_change.changeSellProportionLayout(e[4].data)),200===e[5].errCode&&(a.dataList=e[5].data.dataList),t.weekData=a})},requestMonthData:function(e,t){var a=this,r=e||this.getTime("month",t),c={date:r||"2019-11-01 - 2019-11-05"},l={type:1,date:r||"2019-11-01 - 2019-11-05"},d={type:2,date:r||"2019-11-01 - 2019-11-05"};Promise.all([new n.CommissionDealTrend(c).send(),new n.CustDataInfo(c).send(),new n.CustStatisticInfo(c).send(),new n.SellProportion(l).send(),new n.SellProportion(d).send(),new n.GetDptsCustRanking(c).send()]).then(function(e){var t={trend:null,compare:null,layout:null,shop:null,percentage:null,timer_picker:"month",dataList:null};200===e[0].errCode&&(t.trend=o.week_month_data_change.changeAllDealTrends(e[0].data)),200===e[1].errCode&&(t.compare=o.week_month_data_change.changeCustDataInfo(e[1].data)),200===e[2].errCode&&(t.percentage=o.week_month_data_change.custStatisticInfo(e[2].data)),200===e[3].errCode&&(t.layout=o.week_month_data_change.changeSellProportionLayout(e[3].data)),200===e[4].errCode&&(t.shop=o.week_month_data_change.changeSellProportionLayout(e[4].data)),200===e[5].errCode&&(t.dataList=e[5].data.dataList),a.monthData=t})},requestAllData:function(e,t,a){var r=this,c={},l={};t?(c={date:t},l={date:t,type:1}):t||(c={source:0},l={type:0});var d={date:t||e},i={type:1,date:t||e},s={type:2,date:t||e};Promise.all([new n.CommissionDealTrend(c).send(),new n.CustDataInfo(l).send(),new n.CustStatisticInfo(d).send(),new n.SellProportion(i).send(),new n.SellProportion(s).send(),new n.GetDptsCustRanking(d).send()]).then(function(e){var t={trend:null,compare:null,layout:null,shop:null,percentage:null,timer_picker:"year",dataList:null};200===e[0].errCode&&(t.trend=o.week_month_data_change.changeAllDealTrends(e[0].data)),200===e[1].errCode&&(t.compare=o.week_month_data_change.changeCustDataInfo(e[1].data)),200===e[2].errCode&&(t.percentage=o.week_month_data_change.custStatisticInfo(e[2].data)),200===e[3].errCode&&(t.layout=o.week_month_data_change.changeSellProportionLayout(e[3].data)),200===e[4].errCode&&(t.shop=o.week_month_data_change.changeSellProportionLayout(e[4].data)),200===e[5].errCode&&(t.dataList=e[5].data.dataList),r.allData=t})},initRequestAll:function(){var e=this;(new n.CustReportSmallTime).send().then(function(t){e.requestWeekData();var a=new Date,n="";if(void 0!=t.data.samllTime){var o=t.data.samllTime.split(" ")[0].replace(/-/g,"/");n=t.data.samllTime.split(" ")[0],e.init_time=new Date(o).getTime(),e.calender.all_calender_start=o,e.requestMonthData("",!1)}else e.init_time=(new Date).getTime()-24*((new Date).getDate()-1)*60*60*1e3,n="".concat(a.getFullYear(),"-").concat(a.getMonth(),"-").concat(a.getDate()),e.calender.all_calender_start="".concat(a.getFullYear(),"/").concat(a.getMonth(),"/").concat(a.getDate()),e.requestMonthData();e.calender.all_calender_end="".concat(a.getFullYear(),"/").concat(a.getMonth()+1,"/").concat(a.getDate());var r="".concat(a.getFullYear(),"-").concat(a.getMonth()+1,"-").concat(a.getDate()),c="".concat(n," - ").concat(r);e.requestAllData(c)})}},onLoad:function(){e.setNavigationBarTitle({title:this.title}),this.initRequestAll(),(new l.Notification).addObserver(this,"StatisticsTimeChange",d.Notify.StatisticsTimeChange.Name)}};t.default=u}).call(this,a("543d")["default"])}},[["0508","common/runtime","common/vendor"]]]);
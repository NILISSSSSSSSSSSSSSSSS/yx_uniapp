(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/msgList/msgList"],{1610:function(t,e,i){"use strict";var s=i("2544"),n=i.n(s);n.a},2544:function(t,e,i){},"5c4b":function(t,e,i){"use strict";(function(t){i("d3e9"),i("921b");s(i("66fd"));var e=s(i("a815"));function s(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},a815:function(t,e,i){"use strict";i.r(e);var s=i("f8b9"),n=i("cf46");for(var a in n)"default"!==a&&function(t){i.d(e,t,function(){return n[t]})}(a);i("1610");var o=i("2877"),r=Object(o["a"])(n["default"],s["a"],s["b"],!1,null,null,null);e["default"]=r.exports},cf46:function(t,e,i){"use strict";i.r(e);var s=i("f360"),n=i.n(s);for(var a in s)"default"!==a&&function(t){i.d(e,t,function(){return s[t]})}(a);e["default"]=n.a},f360:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=i("68bf"),n=i("451a"),a=i("10c9"),o=i("baf9"),r=i("418c"),c=i("2f2e"),m=i("a0ec"),u=i("e26c"),g=i("6594");function d(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function h(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}function l(t,e,i){return e&&h(t.prototype,e),i&&h(t,i),t}function f(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var p=function(){function t(){d(this,t)}return l(t,null,[{key:"init",value:function(){this.hideAll();var t=Math.abs(this.endClientY-this.startClientY),e=Math.abs(this.endClientX-this.startClientX);t>=e?this.hide():e<=40||(this.endClientX-this.startClientX<0?this.show():this.endClientX-this.startClientX>0&&this.hide())}},{key:"hideAll",value:function(){this.page.chartList.map(function(t){t.isShowBtn=!1})}},{key:"hide",value:function(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.index;if(this.page.chartList){var t=this.page.chartList[this.index]||{};t.isShowBtn=!1,this.page.$set(this.page.chartList,this.index,t)}}},{key:"show",value:function(){if(this.page.chartList){var t=this.page.chartList[this.index]||{};t.isShowBtn=!0,this.page.$set(this.page.chartList,this.index,t)}}}]),t}();f(p,"startClientX",0),f(p,"startClientY",0),f(p,"endClientX",0),f(p,"endClientY",0),f(p,"page",null),f(p,"index",0);var C={data:function(){return{chartList:null,defaultHead:m.Const.imDefaultHeadImg,serviceId:this.ImChart.getServiceId(),systemMsgItem:{name:"系统消息",lastTime:"",msg:"",unRead:0}}},onShow:function(){this.initSystemMsg(),n.UpUnReadNumTab.setTab(),this.initData()},onLoad:function(){(new o.Notification).addObserver(this,"ImLinkSuccessChange",a.Notify.ImLinkSuccessChange.Name),(new o.Notification).addObserver(this,"UpChartListChanged",a.Notify.UpChartListChanged.Name)},onUnload:function(){(new o.Notification).removeObserverAllNotification(this)},onNavigationBarButtonTap:function(e){e.id&&"contract"===e.id&&t.navigateTo({url:"/pagesMsg/contacts/contacts"})},methods:{goToCustomer:function(){t.navigateTo({url:"/pagesMsg/contacts/contacts"})},initData:function(){this.drawChartList()},drawChartList:function(){var t=this,e=this.ImChart.getServiceId(),i=new r.DealChartListModel(e).getMsgList(),a=[];i=i||[],i=i.sort(new s.compare("msg_timestamp").minToMax());var o=[],m=[];i.length>0&&i.map(function(e){if(e.msg_timestamp&&e.accid!==u.ProjectConfigConst.systemMsgMessageId&&e.accid!==u.ProjectConfigConst.remindMsgMessageId){e.msg_timestamp=e.msg_timestamp.replace(/-/g,"/");var i=new n.ChartListItem;i.messageId=e.accid||"",i.headImg=e.icon?e.icon:t.defaultHead,i.headImg=(new c.Utils).dealImgSrcSize(i.headImg,140,140),i.name=e.name||"",i.lastTime=(0,s.formatTimeNew)(e.msg_timestamp),i.msg=e.msg_type&&"VIDEO"===e.msg_type?"[视频]":e.body||"",i.sendtime=(0,s.formatTimeNew)(e.msg_timestamp),i.unRead=n.UpUnReadNumTab.getUnReadNum(e.accid),i.lastTime_stamp=new Date(e.msg_timestamp).getTime(),i.isShield=e.isShield||"",i.isShowBtn=!1,1==g.GetLoginModel.getAccountSource()&&(i.messageId=i.messageId.toString(),e.compName=i.messageId.indexOf("ld_")>=0?"置业顾问":"经纪人"),i.compName=e.compName||"",i.isTop=e.isTop||2,1==i.isTop?o.push(i):m.push(i)}}),o.length>0&&o.sort(new s.compare("lastTime_stamp").maxToMin()),m.length>0&&m.sort(new s.compare("lastTime_stamp").maxToMin()),a=o.concat(m),setTimeout(function(){t.chartList=a},10)},imgError:function(t,e){t.headImg=this.defaultHead,this.$set(this.chartList,e,t)},touchStart:function(t,e,i){var s=t.changedTouches||t.mp.changedTouches||[];t&&s[0]&&(p.startClientX=s[0].clientX||0,p.startClientY=s[0].clientY||0)},touchEnd:function(t,e,i){var s=t.changedTouches||t.mp.changedTouches||[];i.messageId!=this.ImChart.getServiceId()&&(p.endClientX=s[0].clientX||0,p.endClientY=s[0].clientY||0,p.index=e,p.page=this,p.init())},blockMsg:function(t,e){this.ImChart.blockMsg(t.messageId,!(1==t.isShield))},delMsg:function(t,e){this.ImChart.DeleteMsg(t.messageId)},upTopStatus:function(t,e){new r.DealChartListModel(t.messageId).upTopStatus(t.isTop&&2!=t.isTop?2:1)},getChartDetail:function(e,i){e.unRead=0,n.UpUnReadNumTab.removeReadNum(e.messageId),t.navigateTo({url:"/pagesMsg/msgDetail/msgDetail?messageId="+e.messageId+"&name="+(e.name||"")})},UpChartListChanged:function(){this.initData(),this.initSystemMsg()},ImLinkSuccessChange:function(){this.initSystemMsg()},initSystemMsg:function(){var t=this;this.ImChart.imChartVal&&this.ImChart.getHistoryOriginal(u.ProjectConfigConst.systemMsgMessageId).then(function(e){console.log("系统消息",e);var i=e&&e.msgs||[],a=t.systemMsgItem;if(0===i.length)return a.lastTime=(0,s.formatTimeNew)((new Date).getTime()),a.msg="暂无消息",void(t.systemMsgItem=a);t.systemMsgItem.unRead=n.UpUnReadNumTab.getUnReadNum(u.ProjectConfigConst.systemMsgMessageId)||0,i=i.sort(new s.compare("time").maxToMin());var o=JSON.parse(i[0].content),r=o.data||{};a.msg=r.CONTENT||"暂无消息",a.lastTime=(0,s.formatTimeNew)(i[0].time||(new Date).getTime()),t.systemMsgItem=a})},goToSystemDetail:function(){this.systemMsgItem.unRead=0,n.UpUnReadNumTab.removeReadNum(u.ProjectConfigConst.systemMsgMessageId),t.navigateTo({url:"/pagesMsg/systemMsg/systemMsg"})}}};e.default=C}).call(this,i("543d")["default"])},f8b9:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement;t._self._c},n=[];i.d(e,"a",function(){return s}),i.d(e,"b",function(){return n})}},[["5c4b","common/runtime","common/vendor"]]]);
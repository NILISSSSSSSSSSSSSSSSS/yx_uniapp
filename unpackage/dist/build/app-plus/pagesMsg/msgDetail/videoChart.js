!function(A){var e={};function t(n){if(e[n])return e[n].exports;var a=e[n]={i:n,l:!1,exports:{}};return A[n].call(a.exports,a,a.exports,t),a.l=!0,a.exports}t.m=A,t.c=e,t.d=function(A,e,n){t.o(A,e)||Object.defineProperty(A,e,{enumerable:!0,get:n})},t.r=function(A){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(A,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(A,"__esModule",{value:!0})},t.t=function(A,e){if(1&e&&(A=t(A)),8&e)return A;if(4&e&&"object"==typeof A&&A&&A.__esModule)return A;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:A}),2&e&&"string"!=typeof A)for(var a in A)t.d(n,a,function(e){return A[e]}.bind(null,a));return n},t.n=function(A){var e=A&&A.__esModule?function(){return A.default}:function(){return A};return t.d(e,"a",e),e},t.o=function(A,e){return Object.prototype.hasOwnProperty.call(A,e)},t.p="",t(t.s=118)}({0:function(A,e,t){"use strict";function n(A,e,t,n,a,o,i,r,s,u){var c,l="function"==typeof A?A.options:A;if(s&&(l.components=Object.assign(s,l.components||{})),u&&((u.beforeCreate||(u.beforeCreate=[])).unshift(function(){this[u.__module]=this}),(l.mixins||(l.mixins=[])).push(u)),e&&(l.render=e,l.staticRenderFns=t,l._compiled=!0),n&&(l.functional=!0),o&&(l._scopeId="data-v-"+o),i?(c=function(A){(A=A||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(A=__VUE_SSR_CONTEXT__),a&&a.call(this,A),A&&A._registeredComponents&&A._registeredComponents.add(i)},l._ssrRegister=c):a&&(c=r?function(){a.call(this,this.$root.$options.shadowRoot)}:a),c)if(l.functional){l._injectStyles=c;var f=l.render;l.render=function(A,e){return c.call(e),f(A,e)}}else{var p=l.beforeCreate;l.beforeCreate=p?[].concat(p,c):[c]}return{exports:A,options:l}}t.d(e,"a",function(){return n})},1:function(A,e,t){"use strict";var n;Object.defineProperty(e,"__esModule",{value:!0}),e.weexPlus=e.default=void 0,n="function"==typeof getUni?getUni:function(){var A=function(A){return"function"==typeof A},e=/^\$|^on|^create|Sync$|Manager$|^pause/,t=["os","getCurrentSubNVue","getSubNVueById","stopRecord","stopVoice","stopBackgroundAudio","stopPullDownRefresh","hideKeyboard","hideToast","hideLoading","showNavigationBarLoading","hideNavigationBarLoading","canIUse","navigateBack","closeSocket","pageScrollTo","drawCanvas"],n=function(A){return!(e.test(A)&&"createBLEConnection"!==A||~t.indexOf(A))},o=function(e){return function(){for(var t=arguments.length,n=Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];var o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return A(o.success)||A(o.fail)||A(o.complete)?e.apply(void 0,[o].concat(n)):new Promise(function(A,t){e.apply(void 0,[Object.assign({},o,{success:A,fail:t})].concat(n)),Promise.prototype.finally=function(A){var e=this.constructor;return this.then(function(t){return e.resolve(A()).then(function(){return t})},function(t){return e.resolve(A()).then(function(){throw t})})}}).then(function(A){return[null,A]}).catch(function(A){return[A]})}},i=[],r=void 0;function s(A){i.forEach(function(e){return e({origin:r,data:A})})}var u=a.webview.currentWebview().id,c=new BroadcastChannel("UNI-APP-SUBNVUE");function l(A){A.$processed=!0;var e=a.webview.currentWebview().id===A.id,t="uniNView"===A.__uniapp_origin_type&&A.__uniapp_origin_id,n=A.id;if(A.postMessage=function(A){t?c.postMessage({data:A,to:e?t:n}):_({type:"UniAppSubNVue",data:A})},A.onMessage=function(A){i.push(A)},A.__uniapp_mask_id){r=A.__uniapp_host;var o=A.__uniapp_mask,s=a.webview.getWebviewById(A.__uniapp_mask_id);s=s.parent()||s;var u=A.show,l=A.hide,f=A.close,p=function(){s.setStyle({mask:"none"})};A.show=function(){s.setStyle({mask:o});for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return u.apply(A,t)},A.hide=function(){p();for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return l.apply(A,t)},A.close=function(){p();for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return f.apply(A,t)}}}function f(A){var e=a.webview.getWebviewById(A);return e&&!e.$processed&&l(e),e}c.onmessage=function(A){A.data.to===u&&s(A.data.data)};var p=weex.requireModule("plus"),g=weex.requireModule("globalEvent"),d=0,h={},v="__uniapp__service";g.addEventListener("plusMessage",function(A){"UniAppJsApi"===A.data.type?y(A.data.id,A.data.data):"UniAppSubNVue"===A.data.type?s(A.data.data,A.data.options):"onNavigationBarButtonTap"===A.data.type?"function"==typeof B&&B(A.data.data):"onNavigationBarSearchInputChanged"===A.data.type?"function"==typeof w&&w(A.data.data):"onNavigationBarSearchInputConfirmed"===A.data.type?"function"==typeof S&&S(A.data.data):"onNavigationBarSearchInputClicked"===A.data.type&&"function"==typeof b&&b(A.data.data)});var y=function(A,e){var t=h[A];t?(t(e),t.keepAlive||delete h[A]):console.error("callback["+A+"] is undefined")},m=function(e){var t,n,a=e.id,o=e.type,i=e.params;h[a]=(n=function(e){A(t)?t(e):t&&(~e.errMsg.indexOf(":ok")?A(t.success)&&t.success(e):~e.errMsg.indexOf(":fail")&&A(t.fail)&&t.fail(e),A(t.complete)&&t.complete(e))},(A(t=i)||t&&A(t.callback))&&(n.keepAlive=!0),n),p.postMessage({id:a,type:o,params:i},v)};function _(A){p.postMessage(A,v)}var C=function(A){return function(e){m({id:d++,type:A,params:e})}},B=void 0,w=void 0,S=void 0,b=void 0;function N(A){B=A}function I(A){w=A}function E(A){S=A}function D(A){b=A}function Q(A){return weex.requireModule(A)}var k=weex.requireModule("dom"),M=weex.requireModule("globalEvent"),T=[];function R(A){"function"==typeof A&&(this.isUniAppReady?A():T.push(A))}M.addEventListener("plusMessage",function(A){"UniAppReady"===A.data.type&&(R.isUniAppReady=!0,T.length&&(T.forEach(function(A){return A()}),T=[]))});var P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(A){return typeof A}:function(A){return A&&"function"==typeof Symbol&&A.constructor===Symbol&&A!==Symbol.prototype?"symbol":typeof A},G=weex.requireModule("stream"),x="GET",O=function(A){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:x,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"application/x-www-form-urlencoded";return"object"===(void 0===A?"undefined":P(A))?"POST"===e.toUpperCase()&&"application/json"===t.toLowerCase()?JSON.stringify(A):Object.keys(A).map(function(e){return encodeURIComponent(e)+"="+encodeURIComponent(A[e])}).join("&"):A},U=weex.requireModule("plusstorage"),j="__TYPE",q=weex.requireModule("clipboard"),L=function(){if("function"==typeof getUniEmitter)return getUniEmitter;var A={$on:function(){console.warn("uni.$on failed")},$off:function(){console.warn("uni.$off failed")},$once:function(){console.warn("uni.$once failed")},$emit:function(){console.warn("uni.$emit failed")}};return function(){return A}}();function V(A,e,t){return A[e].apply(A,t)}var F=Object.freeze({loadFontFace:function(e){var t=e.family,n=e.source,a=(e.desc,e.success),o=(e.fail,e.complete);k.addRule("fontFace",{fontFamily:t,src:n.replace(/"/g,"'")});var i={errMsg:"loadFontFace:ok",status:"loaded"};A(a)&&a(i),A(o)&&o(i)},ready:R,request:function(e){var t=e.url,n=e.data,a=e.header,o=e.method,i=void 0===o?"GET":o,r=e.dataType,s=void 0===r?"json":r,u=(e.responseType,e.success),c=e.fail,l=e.complete,f=!1,p=!1,g={};if(a)for(var d in a)p||"content-type"!==d.toLowerCase()?g[d]=a[d]:(p=!0,g["Content-Type"]=a[d]);return i===x&&n&&(t=t+(~t.indexOf("?")?"&"===t.substr(-1)||"?"===t.substr(-1)?"":"&":"?")+O(n)),G.fetch({url:t,method:i,headers:g,type:"json"===s?"json":"text",body:i!==x?O(n,i,g["Content-Type"]):""},function(e){var t=e.status,n=(e.ok,e.statusText,e.data),a=e.headers,o={};!t||-1===t||f?(o.errMsg="request:fail",A(c)&&c(o)):(o.data=n,o.statusCode=t,o.header=a,A(u)&&u(o)),A(l)&&l(o)}),{abort:function(){f=!0}}},getStorage:function(e){var t=e.key,n=(e.data,e.success),a=e.fail,o=e.complete;U.getItem(t+j,function(e){if("success"===e.result){var i=e.data;U.getItem(t,function(e){if("success"===e.result){var t=e.data;i&&t?("String"!==i&&(t=JSON.parse(t)),A(n)&&n({errMsg:"getStorage:ok",data:t})):(e.errMsg="setStorage:fail",A(a)&&a(e))}else e.errMsg="setStorage:fail",A(a)&&a(e);A(o)&&o(e)})}else e.errMsg="setStorage:fail",A(a)&&a(e),A(o)&&o(e)})},setStorage:function(e){var t=e.key,n=e.data,a=e.success,o=e.fail,i=e.complete,r="String";"object"===(void 0===n?"undefined":P(n))&&(r="Object",n=JSON.stringify(n)),U.setItem(t,n,function(e){"success"===e.result?U.setItem(t+j,r,function(e){"success"===e.result?A(a)&&a({errMsg:"setStorage:ok"}):(e.errMsg="setStorage:fail",A(o)&&o(e))}):(e.errMsg="setStorage:fail",A(o)&&o(e)),A(i)&&i(e)})},removeStorage:function(e){var t=e.key,n=(e.data,e.success),a=e.fail,o=e.complete;U.removeItem(t,function(e){"success"===e.result?A(n)&&n({errMsg:"removeStorage:ok"}):(e.errMsg="removeStorage:fail",A(a)&&a(e)),A(o)&&o(e)}),U.removeItem(t+j)},clearStorage:function(A){A.key,A.data,A.success,A.fail,A.complete},getClipboardData:function(e){var t=e.success,n=(e.fail,e.complete);q.getString(function(e){var a={errMsg:"getClipboardData:ok",data:e.data};A(t)&&t(a),A(n)&&n(a)})},setClipboardData:function(e){var t=e.data,n=e.success,a=(e.fail,e.complete),o={errMsg:"setClipboardData:ok"};q.setString(t),A(n)&&n(o),A(a)&&a(o)},onSubNVueMessage:s,getSubNVueById:f,getCurrentSubNVue:function(){return f(a.webview.currentWebview().id)},$on:function(){return V(L(),"$on",[].concat(Array.prototype.slice.call(arguments)))},$off:function(){return V(L(),"$off",[].concat(Array.prototype.slice.call(arguments)))},$once:function(){return V(L(),"$once",[].concat(Array.prototype.slice.call(arguments)))},$emit:function(){return V(L(),"$emit",[].concat(Array.prototype.slice.call(arguments)))}}),Z={os:{nvue:!0}},$={};return"undefined"!=typeof Proxy?$=new Proxy({},{get:function(A,e){if("os"===e)return{nvue:!0};if("postMessage"===e)return _;if("requireNativePlugin"===e)return Q;if("onNavigationBarButtonTap"===e)return N;if("onNavigationBarSearchInputChanged"===e)return I;if("onNavigationBarSearchInputConfirmed"===e)return E;if("onNavigationBarSearchInputClicked"===e)return D;var t=F[e];return t||(t=C(e)),n(e)?o(t):t}}):(Object.keys(Z).forEach(function(A){$[A]=Z[A]}),$.postMessage=_,$.requireNativePlugin=Q,$.onNavigationBarButtonTap=N,$.onNavigationBarSearchInputChanged=I,$.onNavigationBarSearchInputConfirmed=E,$.onNavigationBarSearchInputClicked=D,Object.keys({uploadFile:!0,downloadFile:!0,chooseImage:!0,previewImage:!0,getImageInfo:!0,saveImageToPhotosAlbum:!0,chooseVideo:!0,saveVideoToPhotosAlbum:!0,saveFile:!0,getSavedFileList:!0,getSavedFileInfo:!0,removeSavedFile:!0,openDocument:!0,setStorage:!0,getStorage:!0,getStorageInfo:!0,removeStorage:!0,clearStorage:!0,getLocation:!0,chooseLocation:!0,openLocation:!0,getSystemInfo:!0,getNetworkType:!0,makePhoneCall:!0,scanCode:!0,setScreenBrightness:!0,getScreenBrightness:!0,setKeepScreenOn:!0,vibrateLong:!0,vibrateShort:!0,addPhoneContact:!0,showToast:!0,showLoading:!0,hideToast:!0,hideLoading:!0,showModal:!0,showActionSheet:!0,setNavigationBarTitle:!0,setNavigationBarColor:!0,navigateTo:!0,redirectTo:!0,reLaunch:!0,switchTab:!0,navigateBack:!0,getProvider:!0,login:!0,getUserInfo:!0,share:!0,requestPayment:!0,subscribePush:!0,unsubscribePush:!0,onPush:!0,offPush:!0}).forEach(function(A){var e=F[A];e||(e=C(A)),n(A)?$[A]=o(e):$[A]=e})),$};var a=new WeexPlus(weex);e.weexPlus=a;var o=n(weex,a,BroadcastChannel);e.default=o},118:function(A,e,t){"use strict";t.r(e);t(13),t(17);var n=t(22);n.default.mpType="page",n.default.route="pagesMsg/msgDetail/videoChart",n.default.el="#root",new Vue(n.default)},13:function(A,e,t){"use strict";(function(A,e){function n(A,e){return!e||"object"!=typeof e&&"function"!=typeof e?function(A){if(void 0===A)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return A}(A):e}function a(A){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(A){return A.__proto__||Object.getPrototypeOf(A)})(A)}function o(A,e){return(o=Object.setPrototypeOf||function(A,e){return A.__proto__=e,A})(A,e)}function i(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}function r(A,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(A,n.key,n)}}function s(A,e,t){return e&&r(A.prototype,e),t&&r(A,t),A}var u=t(14).version,c="__DC_STAT_UUID",l="__DC_UUID_VALUE";function f(){var t="";if("n"===d()){try{t=A.runtime.getDCloudId()}catch(A){t=""}return t}try{t=e.getStorageSync(c)}catch(A){t=l}if(!t){t=Date.now()+""+Math.floor(1e7*Math.random());try{e.setStorageSync(c,t)}catch(A){e.setStorageSync(c,l)}}return t}var p,g=function(){return parseInt((new Date).getTime()/1e3)},d=function(){return"n"},h=function(){var A="";return"wx"!==d()&&"qq"!==d()||e.canIUse("getAccountInfoSync")&&(A=e.getAccountInfoSync().miniProgram.appId||""),A},v=function(){return"n"===d()?A.runtime.version:""},y=function(){var e="";return"n"===d()&&(e=A.runtime.channel),e},m=0,_=0,C=function(){return m=g(),"n"===d()&&e.setStorageSync("__page__residence__time",g()),m},B=0,w=0,S=function(){var A=(new Date).getTime();return B=A,w=0,A},b=function(){var A=(new Date).getTime();return w=A,A},N=function(A){var e=0;return 0!==B&&(e=w-B),e=(e=parseInt(e/1e3))<1?1:e,"app"===A?{residenceTime:e,overtime:e>300}:"page"===A?{residenceTime:e,overtime:e>1800}:{residenceTime:e}},I=function(A){var e=getCurrentPages(),t=e[e.length-1].$vm,n=A._query,a=n&&"{}"!==JSON.stringify(n)?"?"+JSON.stringify(n):"";return A._query="","bd"===d()?t.$mp&&t.$mp.page.is+a:t.$scope&&t.$scope.route+a||t.$mp&&t.$mp.page.route+a},E=function(A){return!!("page"===A.mpType||A.$mp&&"page"===A.$mp.mpType||"page"===A.$options.mpType)},D=t(15).default,Q=t(7).default||t(7),k=e.getSystemInfoSync(),M=function(){function t(){i(this,t),this.self="",this._retry=0,this._platform="",this._query={},this._navigationBarTitle={config:"",page:"",report:"",lt:""},this._operatingTime=0,this._reportingRequestData={1:[],11:[]},this.__prevent_triggering=!1,this.__licationHide=!1,this.__licationShow=!1,this._lastPageRoute="",this.statData={uuid:f(),ut:d(),mpn:h(),ak:Q.appid,usv:u,v:v(),ch:y(),cn:"",pn:"",ct:"",t:g(),tt:"",p:"android"===k.platform?"a":"i",brand:k.brand||"",md:k.model,sv:k.system.replace(/(Android|iOS)\s/,""),mpsdk:k.SDKVersion||"",mpv:k.version||"",lang:k.language,pr:k.pixelRatio,ww:k.windowWidth,wh:k.windowHeight,sw:k.screenWidth,sh:k.screenHeight}}return s(t,[{key:"_applicationShow",value:function(){if(this.__licationHide){if(b(),N("app").overtime){var A={path:this._lastPageRoute,scene:this.statData.sc};this._sendReportRequest(A)}this.__licationHide=!1}}},{key:"_applicationHide",value:function(A,e){this.__licationHide=!0,b();var t=N();S();var n=I(this);this._sendHideRequest({urlref:n,urlref_ts:t.residenceTime},e)}},{key:"_pageShow",value:function(){var A,e,t=I(this),n=(A=getCurrentPages(),e=A[A.length-1].$vm,"bd"===d()?e.$mp&&e.$mp.page.is:e.$scope&&e.$scope.route||e.$mp&&e.$mp.page.route);if(this._navigationBarTitle.config=D&&D.pages[n]&&D.pages[n].titleNView&&D.pages[n].titleNView.titleText||D&&D.pages[n]&&D.pages[n].navigationBarTitleText||"",this.__licationShow)return S(),this.__licationShow=!1,void(this._lastPageRoute=t);if(b(),this._lastPageRoute=t,N("page").overtime){var a={path:this._lastPageRoute,scene:this.statData.sc};this._sendReportRequest(a)}S()}},{key:"_pageHide",value:function(){if(!this.__licationHide){b();var A=N("page");return this._sendPageRequest({url:this._lastPageRoute,urlref:this._lastPageRoute,urlref_ts:A.residenceTime}),void(this._navigationBarTitle={config:"",page:"",report:"",lt:""})}}},{key:"_login",value:function(){this._sendEventRequest({key:"login"},0)}},{key:"_share",value:function(){this._sendEventRequest({key:"share"},0)}},{key:"_payment",value:function(A){this._sendEventRequest({key:A},0)}},{key:"_sendReportRequest",value:function(A){this._navigationBarTitle.lt="1";var t,n,a=A.query&&"{}"!==JSON.stringify(A.query)?"?"+JSON.stringify(A.query):"";this.statData.lt="1",this.statData.url=A.path+a||"",this.statData.t=g(),this.statData.sc=function(A){var t=d(),n="";return A||("wx"===t&&(n=e.getLaunchOptionsSync().scene),n)}(A.scene),this.statData.fvts=(t=e.getStorageSync("First__Visit__Time"),n=0,t?n=t:(n=g(),e.setStorageSync("First__Visit__Time",n),e.removeStorageSync("Last__Visit__Time")),n),this.statData.lvts=function(){var A=e.getStorageSync("Last__Visit__Time"),t=0;return t=A||"",e.setStorageSync("Last__Visit__Time",g()),t}(),this.statData.tvc=function(){var A=e.getStorageSync("Total__Visit__Count"),t=1;return A&&(t=A,t++),e.setStorageSync("Total__Visit__Count",t),t}(),"n"===d()?this.getProperty():this.getNetworkInfo()}},{key:"_sendPageRequest",value:function(A){var e=A.url,t=A.urlref,n=A.urlref_ts;this._navigationBarTitle.lt="11";var a={ak:this.statData.ak,uuid:this.statData.uuid,lt:"11",ut:this.statData.ut,url:e,tt:this.statData.tt,urlref:t,urlref_ts:n,ch:this.statData.ch,usv:this.statData.usv,t:g(),p:this.statData.p};this.request(a)}},{key:"_sendHideRequest",value:function(A,e){var t=A.urlref,n=A.urlref_ts,a={ak:this.statData.ak,uuid:this.statData.uuid,lt:"3",ut:this.statData.ut,urlref:t,urlref_ts:n,ch:this.statData.ch,usv:this.statData.usv,t:g(),p:this.statData.p};this.request(a,e)}},{key:"_sendEventRequest",value:function(){var A=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=A.key,t=void 0===e?"":e,n=A.value,a=void 0===n?"":n,o=this._lastPageRoute,i={ak:this.statData.ak,uuid:this.statData.uuid,lt:"21",ut:this.statData.ut,url:o,ch:this.statData.ch,e_n:t,e_v:"object"==typeof a?JSON.stringify(a):a.toString(),usv:this.statData.usv,t:g(),p:this.statData.p};this.request(i)}},{key:"getNetworkInfo",value:function(){var A=this;e.getNetworkType({success:function(e){A.statData.net=e.networkType,A.getLocation()}})}},{key:"getProperty",value:function(){var e=this;A.runtime.getProperty(A.runtime.appid,function(A){e.statData.v=A.version||"",e.getNetworkInfo()})}},{key:"getLocation",value:function(){var A=this;Q.getLocation?e.getLocation({type:"wgs84",geocode:!0,success:function(e){e.address&&(A.statData.cn=e.address.country,A.statData.pn=e.address.province,A.statData.ct=e.address.city),A.statData.lat=e.latitude,A.statData.lng=e.longitude,A.request(A.statData)}}):(this.statData.lat=0,this.statData.lng=0,this.request(this.statData))}},{key:"request",value:function(A,t){var n=this,a=g(),o=this._navigationBarTitle;A.ttn=o.page,A.ttpj=o.config,A.ttc=o.report;var i=this._reportingRequestData;if("n"===d()&&(i=e.getStorageSync("__UNI__STAT__DATA")||{}),i[A.lt]||(i[A.lt]=[]),i[A.lt].push(A),"n"===d()&&e.setStorageSync("__UNI__STAT__DATA",i),_=g(),"n"===d()&&(m=e.getStorageSync("__page__residence__time")),!(_-m<10)||t){var r=this._reportingRequestData;"n"===d()&&(r=e.getStorageSync("__UNI__STAT__DATA")),C();var s=[],c=[],l=[],f=function(A){r[A].forEach(function(e){var t=function(A){var e="";for(var t in A)e+=t+"="+A[t]+"&";return e.substr(0,e.length-1)}(e);0===A?s.push(t):3===A?l.push(t):c.push(t)})};for(var p in r)f(p);s.push.apply(s,c.concat(l));var h={usv:u,t:a,requests:JSON.stringify(s)};this._reportingRequestData={},"n"===d()&&e.removeStorageSync("__UNI__STAT__DATA"),"h5"!==A.ut?"n"!==d()||"a"!==this.statData.p?this._sendRequest(h):setTimeout(function(){n._sendRequest(h)},200):this.imageRequest(h)}}},{key:"_sendRequest",value:function(A){var t=this;e.request({url:"https://tongji.dcloud.io/uni/stat",method:"POST",data:A,success:function(){},fail:function(e){++t._retry<3&&setTimeout(function(){t._sendRequest(A)},1e3)}})}},{key:"imageRequest",value:function(A){var e=new Image,t=function(A){var e=Object.keys(A).sort(),t={},n="";for(var a in e)t[e[a]]=A[e[a]],n+=e[a]+"="+A[e[a]]+"&";return{sign:"",options:n.substr(0,n.length-1)}}(function(A){var e={};for(var t in A)e[t]=encodeURIComponent(A[t]);return e}(A)).options;e.src="https://tongji.dcloud.io/uni/stat.gif?"+t}},{key:"sendEvent",value:function(A,e){var t,n;(n=e,(t=A)?"string"!=typeof t?(console.error("uni.report [eventName] 参数类型错误,只能为 String 类型"),1):t.length>255?(console.error("uni.report [eventName] 参数长度不能大于 255"),1):"string"!=typeof n&&"object"!=typeof n?(console.error("uni.report [options] 参数类型错误,只能为 String 或 Object 类型"),1):"string"==typeof n&&n.length>255?(console.error("uni.report [options] 参数长度不能大于 255"),1):"title"===t&&"string"!=typeof n?(console.error("uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型"),1):void 0:(console.error("uni.report 缺少 [eventName] 参数"),1))||("title"!==A?this._sendEventRequest({key:A,value:"object"==typeof e?JSON.stringify(e):e},1):this._navigationBarTitle.report=e)}}]),t}(),T=function(A){function t(){var A;return i(this,t),(A=n(this,a(t).call(this))).instance=null,"function"==typeof e.addInterceptor&&(A.addInterceptorInit(),A.interceptLogin(),A.interceptShare(!0),A.interceptRequestPayment()),A}return function(A,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");A.prototype=Object.create(e&&e.prototype,{constructor:{value:A,writable:!0,configurable:!0}}),e&&o(A,e)}(t,M),s(t,null,[{key:"getInstance",value:function(){return this.instance||(this.instance=new t),this.instance}}]),s(t,[{key:"addInterceptorInit",value:function(){var A=this;e.addInterceptor("setNavigationBarTitle",{invoke:function(e){A._navigationBarTitle.page=e.title}})}},{key:"interceptLogin",value:function(){var A=this;e.addInterceptor("login",{complete:function(){A._login()}})}},{key:"interceptShare",value:function(A){var t=this;A?e.addInterceptor("share",{success:function(){t._share()},fail:function(){t._share()}}):t._share()}},{key:"interceptRequestPayment",value:function(){var A=this;e.addInterceptor("requestPayment",{success:function(){A._payment("pay_success")},fail:function(){A._payment("pay_fail")}})}},{key:"report",value:function(A,e){this.self=e,C(),this.__licationShow=!0,this._sendReportRequest(A,!0)}},{key:"load",value:function(A,e){if(!e.$scope&&!e.$mp){var t=getCurrentPages();e.$scope=t[t.length-1]}this.self=e,this._query=A}},{key:"show",value:function(A){this.self=A,E(A)?this._pageShow(A):this._applicationShow(A)}},{key:"ready",value:function(A){}},{key:"hide",value:function(A){this.self=A,E(A)?this._pageHide(A):this._applicationHide(A,!0)}},{key:"error",value:function(A){this._platform;var e="";e=A.message?A.stack:JSON.stringify(A);var t={ak:this.statData.ak,uuid:this.statData.uuid,lt:"31",ut:this.statData.ut,ch:this.statData.ch,mpsdk:this.statData.mpsdk,mpv:this.statData.mpv,v:this.statData.v,em:e,usv:this.statData.usv,t:g(),p:this.statData.p};this.request(t)}}]),t}().getInstance(),R=!1,P={onLaunch:function(A){T.report(A,this)},onReady:function(){T.ready(this)},onLoad:function(A){if(T.load(A,this),this.$scope&&this.$scope.onShareAppMessage){var e=this.$scope.onShareAppMessage;this.$scope.onShareAppMessage=function(A){return T.interceptShare(!1),e.call(this,A)}}},onShow:function(){R=!1,T.show(this)},onHide:function(){R=!0,T.hide(this)},onUnload:function(){R?R=!1:T.hide(this)},onError:function(A){T.error(A)}};((p=t(16)).default||p).mixin(P),e.report=function(A,e){T.sendEvent(A,e)}}).call(this,t(1).weexPlus,t(1).default)},14:function(A){A.exports={_from:"@dcloudio/uni-stat@alpha",_id:"@dcloudio/uni-stat@2.0.0-alpha-25120200103005",_inBundle:!1,_integrity:"sha512-nYoIrRV2e5o/vzr6foSdWi3Rl2p0GuO+LPY3JctyY6uTKgPnuH99d7aL/QQdJ1SacQjBWO+QGK1qankN7oyrWw==",_location:"/@dcloudio/uni-stat",_phantomChildren:{},_requested:{type:"tag",registry:!0,raw:"@dcloudio/uni-stat@alpha",name:"@dcloudio/uni-stat",escapedName:"@dcloudio%2funi-stat",scope:"@dcloudio",rawSpec:"alpha",saveSpec:null,fetchSpec:"alpha"},_requiredBy:["#USER","/","/@dcloudio/vue-cli-plugin-uni"],_resolved:"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-alpha-25120200103005.tgz",_shasum:"a77a63481f36474f3e86686868051219d1bb12df",_spec:"@dcloudio/uni-stat@alpha",_where:"/Users/guoshengqiang/Documents/dcloud-plugins/alpha/uniapp-cli",author:"",bugs:{url:"https://github.com/dcloudio/uni-app/issues"},bundleDependencies:!1,deprecated:!1,description:"",devDependencies:{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5",eslint:"^6.1.0",rollup:"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},files:["dist","package.json","LICENSE"],gitHead:"6be187a3dfe15f95dd6146d9fec08e1f81100987",homepage:"https://github.com/dcloudio/uni-app#readme",license:"Apache-2.0",main:"dist/index.js",name:"@dcloudio/uni-stat",repository:{type:"git",url:"git+https://github.com/dcloudio/uni-app.git",directory:"packages/uni-stat"},scripts:{build:"NODE_ENV=production rollup -c rollup.config.js",dev:"NODE_ENV=development rollup -w -c rollup.config.js"},version:"2.0.0-alpha-25120200103005"}},15:function(A,e,t){"use strict";t.r(e),e.default={pages:{},globalStyle:{}}},16:function(A,e){A.exports=Vue},17:function(A,e,t){Vue.prototype.__$appStyle__={},Vue.prototype.__merge_style&&Vue.prototype.__merge_style(t(18).default,Vue.prototype.__$appStyle__)},18:function(A,e,t){"use strict";t.r(e);var n=t(2),a=t.n(n);for(var o in n)"default"!==o&&function(A){t.d(e,A,function(){return n[A]})}(o);e.default=a.a},2:function(A,e){A.exports={"@FONT-FACE":[{fontFamily:"PingFang-SC-Medium",src:"url(data:font/truetype;charset=utf-8;base64,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) format('truetype')",fontWeight:"500",fontStyle:"normal"},{fontFamily:"PingFang SC",src:"url(data:font/truetype;charset=utf-8;base64,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) format('truetype')",fontWeight:"500",fontStyle:"normal"}],f_r_s:{display:"flex",flexDirection:"row"},f_r_c:{display:"flex",flexDirection:"row",justifyContent:"center"},f_r_b:{display:"flex",flexDirection:"row",justifyContent:"space-between"},f_r_e:{display:"flex",flexDirection:"row",justifyContent:"flex-end"},f_c_s:{display:"flex",flexDirection:"column",justifyContent:"flex-start"},f_c_c:{display:"flex",flexDirection:"column",justifyContent:"center"},f_c_b:{display:"flex",flexDirection:"column",justifyContent:"space-between"},f_c_e:{display:"flex",flexDirection:"column",justifyContent:"flex-end"},main_color:{color:"#ff5a1f"},"uni-page-head__title":{fontWeight:"normal"}}},22:function(A,e,t){"use strict";var n=t(76),a=t(30),o=t(0);var i=Object(o.a)(a.default,n.b,n.c,!1,null,null,"7396dfa0",!1,n.a,void 0);(function(A){this.options.style||(this.options.style={}),Vue.prototype.__merge_style&&Vue.prototype.__$appStyle__&&Vue.prototype.__merge_style(Vue.prototype.__$appStyle__,this.options.style),Vue.prototype.__merge_style?Vue.prototype.__merge_style(t(95).default,this.options.style):Object.assign(this.options.style,t(95).default)}).call(i),e.default=i.exports},3:function(A,e,t){"use strict";function n(A,e,t){return e in A?Object.defineProperty(A,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):A[e]=t,A}Object.defineProperty(e,"__esModule",{value:!0}),e.Notify=void 0;var a=function A(){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A)};e.Notify=a,n(a,"CityInfoChanged",{Name:"CityInfoChanged",Info:null}),n(a,"GpsChanged",{Name:"GpsChanged",Info:null}),n(a,"ScreenShowChanged",{Name:"ScreenShowChanged",Info:null}),n(a,"ScreenResultChanged",{Name:"ScreenResultChanged",Info:null}),n(a,"SearchResChanged",{Name:"SearchResChanged",Info:null}),n(a,"NearInfoMapBtnChanged",{Name:"NearInfoMapBtnChanged",Info:null}),n(a,"UserInfoChanged",{Name:"UserInfoChanged",Info:null}),n(a,"AuthonChanged",{Name:"AuthonChanged",Info:null}),n(a,"HouseListAgentChanged",{Name:"HouseListAgentChanged",Info:null}),n(a,"UpChartListChanged",{Name:"UpChartListChanged",Info:null}),n(a,"NewMsgChanged",{Name:"NewMsgChanged",Info:null,Type_entrust:"entrust"}),n(a,"VoicePlayChange",{Name:"VoicePlayChange",info:null}),n(a,"UpChartMsgChanged",{Name:"UpChartMsgChanged",Info:null}),n(a,"ClickChartDetailScroll",{Name:"ClickChartDetailScroll",Info:null}),n(a,"ClickChartMoreInfo",{Name:"ClickChartMoreInfo",Info:null}),n(a,"RefuseAuthSettingChanged",{Name:"RefuseAuthSettingChanged",Info:null}),n(a,"MsgReadChanged",{Name:"MsgReadChanged",Info:null}),n(a,"LiaoKeChartChanged",{Name:"LiaoKeChartChanged",Info:null}),n(a,"CompStoreChooseChanged",{Name:"CompStoreChooseChanged",info:null}),n(a,"CompStoreChooseResultParamsChanged",{Name:"CompStoreChooseResultParamsChanged",info:null}),n(a,"AppTitleEventChange",{Name:"AppTitleEventChange",info:null}),n(a,"ServiceRegSectionChanged",{Name:"ServiceRegSectionChanged",info:null}),n(a,"LoginSuccessChange",{Name:"LoginSuccessChange",info:null}),n(a,"SearchBuildChange",{Name:"SearchBuildChange",info:null}),n(a,"HouseEditChange",{Name:"HouseEditChange",info:null}),n(a,"PushNewHouse",{Name:"PushNewHouse",info:null}),n(a,"ImLinkSuccessChange",{Name:"ImLinkSuccessChange",info:null}),n(a,"ScanConfirmChange",{Name:"ScanConfirmChange",info:null}),n(a,"MsgSendSuccessChange",{Name:"MsgSendSuccessChange",info:null}),n(a,"VideoChart",{Name:"VideoChart",info:null}),n(a,"AcceptAudioChart",{Name:"AcceptAudioChart",info:null}),n(a,"AudioChartInfo",{Name:"AudioChartInfo",info:null}),n(a,"AutoLoginSuccess",{Name:"AutoLoginSuccess",info:null}),n(a,"RegSectionChange",{Name:"RegSectionChange",info:null}),n(a,"DicMessageChange",{Name:"DicMessageChange",info:null}),n(a,"PageShowChange",{Name:"PageShowChange",info:null}),n(a,"PageHideChange",{Name:"PageHideChange",info:null}),n(a,"PersonalInfoChange",{Name:"PersonalInfoChange",info:null}),n(a,"StatisticsTimeChange",{Name:"StatisticsTimeChange",info:null}),n(a,"CreateActivityChange",{Name:"CreateActivityChange",info:null}),n(a,"SaveBuildChange",{Name:"SaveBuildChange",info:null}),n(a,"DistributionChange",{Name:"DistributionChange",info:null}),n(a,"DistributionDelChange",{Name:"DistributionChange",info:null}),n(a,"PhotoChange",{Name:"PhotoChange",info:null}),n(a,"RuleChange",{Name:"RuleChange",info:null}),n(a,"RemindChange",{Name:"RemindChange",info:null}),n(a,"CustomerConfirmMsgChange",{Name:"CustomerConfirmMsgChange",info:null}),n(a,"ContractListChanged",{Name:"ContractListChanged",info:null})},30:function(A,e,t){"use strict";var n=t(31),a=t.n(n);e.default=a.a},31:function(A,e,t){"use strict";(function(A,n,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=t(3),i=t(6);var r,s,u,c=function A(){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A)};u=null,(s="ImChart")in(r=c)?Object.defineProperty(r,s,{value:u,enumerable:!0,configurable:!0,writable:!0}):r[s]=u;var l={data:function(){return{height:"100%"}},created:function(){var e=A.getSystemInfoSync();this.height=e.windowHeight+"px",c.ImChart=getApp().globalData.imChartClass},mounted:function(){(new i.Notification).addObserver(this,"AudioChartInfo",o.Notify.AudioChartInfo.Name)},methods:{AudioChartInfo:function(A,e){console.error(n("info",e," at pagesMsg\\msgDetail\\videoChart.nvue:37"));var t=a.webview.currentWebview(),o=a.video.createLivePusher("",{url:e.url,top:"100px",left:"0px",width:"100%",height:"300px",position:"static"});t.append(o),o.start()},accept:function(){console.error(n("点击了接听"," at pagesMsg\\msgDetail\\videoChart.nvue:55")),c.ImChart.netcall.response({accepted:!0,caller:c.ImChart.beCalling.caller,type:c.ImChart.beCalling.type,cid:c.ImChart.beCalling.cid}).then(function(A){console.warn(n(A,"接听成功"," at pagesMsg\\msgDetail\\videoChart.nvue:63")),c.ImChart.netcall.startRtc({mode:0}).then(function(A){console.log(n("开启音视频成功",A," at pagesMsg\\msgDetail\\videoChart.nvue:68"))})}).catch(function(A){console.error(n(A,"接听"," at pagesMsg\\msgDetail\\videoChart.nvue:72"))})}}};e.default=l}).call(this,t(1).default,t(5).default,t(1).weexPlus)},32:function(A,e){A.exports={"video-chart":{width:100,position:"relative"},accept:{position:"absolute",borderRadius:"200rpx",width:"200rpx",height:"200rpx",lineHeight:"200rpx",textAlign:"center",bottom:"200rpx",left:"100rpx",backgroundColor:"#ff5400",color:"#FFFFFF",fontSize:"32rpx"}}},5:function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(){for(var A=arguments.length,e=new Array(A),t=0;t<A;t++)e[t]=arguments[t];var n=e.map(function(A){var e=Object.prototype.toString.call(A);if("[object object]"===e.toLowerCase())try{A="---BEGIN:JSON---"+JSON.stringify(A)+"---END:JSON---"}catch(e){A="[object object]"}else if(null===A)A="---NULL---";else if(void 0===A)A="---UNDEFINED---";else{var t=function(A){var e=Object.prototype.toString.call(A);return e.substring(8,e.length-1)}(A).toUpperCase();A="NUMBER"===t||"BOOLEAN"===t?"---BEGIN:"+t+"---"+A+"---END:"+t+"---":String(A)}return A}),a="";if(n.length>1){var o=n.pop();a=n.join("---COMMA---"),0===o.indexOf(" at ")?a+=o:a+="---COMMA---"+o}else a=n[0];return a}},6:function(A,e,t){"use strict";(function(A){Object.defineProperty(e,"__esModule",{value:!0}),e.Notification=void 0;var n=t(3);function a(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}function o(A,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(A,n.key,n)}}function i(A,e,t){return e&&o(A.prototype,e),t&&o(A,t),A}var r=function(){function e(){a(this,e)}return i(e,null,[{key:"addObserver",value:function(e,t,n){A.$on(n,function(A){void 0!==e[t]&&e[n](n,A)})}},{key:"removeObserver",value:function(e,t){void 0!==e[t]&&A.$off(t)}},{key:"removeObserverAllNotification",value:function(A){for(var t in n.Notify)void 0!==A[n.Notify[t].Name]&&e.removeObserver(A,n.Notify[t].Name)}},{key:"postNotification",value:function(e,t){A.$emit(e,t)}}]),e}(),s=function(){function A(){a(this,A)}return i(A,[{key:"addObserver",value:function(A,e,t){r.addObserver(A,e,t)}},{key:"removeObserver",value:function(A,e){r.removeObserver(oobserver,e)}},{key:"removeObserverAllNotification",value:function(A){r.removeObserverAllNotification(A)}},{key:"postNotification",value:function(A,e){r.postNotification(A,e)}}]),A}();e.Notification=s}).call(this,t(1).default)},7:function(A,e,t){"use strict";t.r(e),e.default={appid:"__UNI__E7AD8A0"}},76:function(A,e,t){"use strict";var n=function(){var A=this.$createElement,e=this._self._c||A;return e("scroll-view",{staticStyle:{flexDirection:"column"},attrs:{scrollY:!0,enableBackToTop:!0,bubble:"true"}},[e("div",{staticClass:["video-chart"],style:{height:this.height}},[e("div",{staticClass:["accept"],on:{click:this.accept}},[e("u-text",[this._v("接听")])])])])},a=[];t.d(e,"b",function(){return n}),t.d(e,"c",function(){return a}),t.d(e,"a",function(){})},95:function(A,e,t){"use strict";t.r(e);var n=t(32),a=t.n(n);for(var o in n)"default"!==o&&function(A){t.d(e,A,function(){return n[A]})}(o);e.default=a.a}});
(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pagesCustomer/customerDetail/customerDetail"],{

/***/ 326:
/*!********************************************************************************************!*\
  !*** D:/小黑项目/yx_uniapp/main.js?{"page":"pagesCustomer%2FcustomerDetail%2FcustomerDetail"} ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);__webpack_require__(/*! @dcloudio/uni-stat */ 5);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _customerDetail = _interopRequireDefault(__webpack_require__(/*! ./pagesCustomer/customerDetail/customerDetail.vue */ 327));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_customerDetail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 327:
/*!*************************************************************************!*\
  !*** D:/小黑项目/yx_uniapp/pagesCustomer/customerDetail/customerDetail.vue ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _customerDetail_vue_vue_type_template_id_2a92cb7a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./customerDetail.vue?vue&type=template&id=2a92cb7a&scoped=true& */ 328);
/* harmony import */ var _customerDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./customerDetail.vue?vue&type=script&lang=js& */ 330);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _customerDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _customerDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _customerDetail_vue_vue_type_style_index_0_id_2a92cb7a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./customerDetail.vue?vue&type=style&index=0&id=2a92cb7a&scoped=true&lang=css& */ 334);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 53);

var renderjs





/* normalize component */

var component = Object(_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _customerDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _customerDetail_vue_vue_type_template_id_2a92cb7a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _customerDetail_vue_vue_type_template_id_2a92cb7a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "2a92cb7a",
  null,
  false,
  _customerDetail_vue_vue_type_template_id_2a92cb7a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

/* hot reload */
if (false) { var api; }
component.options.__file = "小黑项目/yx_uniapp/pagesCustomer/customerDetail/customerDetail.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 328:
/*!********************************************************************************************************************!*\
  !*** D:/小黑项目/yx_uniapp/pagesCustomer/customerDetail/customerDetail.vue?vue&type=template&id=2a92cb7a&scoped=true& ***!
  \********************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_customerDetail_vue_vue_type_template_id_2a92cb7a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./customerDetail.vue?vue&type=template&id=2a92cb7a&scoped=true& */ 329);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_customerDetail_vue_vue_type_template_id_2a92cb7a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_customerDetail_vue_vue_type_template_id_2a92cb7a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_customerDetail_vue_vue_type_template_id_2a92cb7a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_customerDetail_vue_vue_type_template_id_2a92cb7a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 329:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/小黑项目/yx_uniapp/pagesCustomer/customerDetail/customerDetail.vue?vue&type=template&id=2a92cb7a&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 330:
/*!**************************************************************************************************!*\
  !*** D:/小黑项目/yx_uniapp/pagesCustomer/customerDetail/customerDetail.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_customerDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./customerDetail.vue?vue&type=script&lang=js& */ 331);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_customerDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_customerDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_customerDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_customerDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_customerDetail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 331:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/小黑项目/yx_uniapp/pagesCustomer/customerDetail/customerDetail.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;


















































































































































































































































































































































var _CustomerForDevelopersNet = __webpack_require__(/*! ../../net/CustomerForDevelopersNet */ 332);




var _LoginSuccessModel = __webpack_require__(/*! ../../model/LoginSuccessModel */ 18);
var _Const = __webpack_require__(/*! ../../utils/Const */ 17);
var _config = __webpack_require__(/*! ../../config/config */ 16);
var _CustomerNet = __webpack_require__(/*! ../../net/CustomerNet */ 46);
var _CustomerModel = __webpack_require__(/*! ../../model/CustomerModel */ 333);
var _Notification = __webpack_require__(/*! ../../utils/Notification */ 20);
var _Notify = __webpack_require__(/*! ../../utils/Notify */ 19);
var _ImChart = __webpack_require__(/*! ../../utils/ImChart */ 21);function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var scrollLoading = function scrollLoading() {return __webpack_require__.e(/*! import() | components/scrollLoading */ "components/scrollLoading").then(__webpack_require__.bind(null, /*! @/components/scrollLoading.vue */ 590));};var followList = function followList() {return __webpack_require__.e(/*! import() | pagesCustomer/components/followList */ "pagesCustomer/components/followList").then(__webpack_require__.bind(null, /*! ../components/followList.vue */ 805));};var screenCustomer = function screenCustomer() {return __webpack_require__.e(/*! import() | components/screenCustomer */ "components/screenCustomer").then(__webpack_require__.bind(null, /*! @/components/screenCustomer.vue */ 784));};var screenCustomerOfDirectCustomer = function screenCustomerOfDirectCustomer() {return __webpack_require__.e(/*! import() | components/screenCustomerOfDirectCustomer */ "components/screenCustomerOfDirectCustomer").then(__webpack_require__.bind(null, /*! @/components/screenCustomerOfDirectCustomer.vue */ 791));};

var c_param = {}; // 页面参数 custName custId cityId
var
PrivateData = function PrivateData() {_classCallCheck(this, PrivateData);};_defineProperty(PrivateData, "isRequest",
false);var _default =


{
  name: "customerDetail",

  components: {
    followList: followList,
    screenCustomer: screenCustomer,
    screenCustomerOfDirectCustomer: screenCustomerOfDirectCustomer,
    scrollLoading: scrollLoading },


  onLoad: function onLoad(option) {
    new _Notification.Notification().addObserver(this, "CustomerConfirmMsgChange", _Notify.Notify.CustomerConfirmMsgChange.Name);
    console.log(option, '---c_param---');
    c_param = { 'custId': option.custId, 'cityId': option.cityId, 'custName': option.custName };
    this.isNew = option.isNew || '0';
    this.source = option.source || '';

    // 传了客户姓名 设置客户姓名为标题
    if (option.custName) {
      uni.setNavigationBarTitle({
        title: option.custName });

    }
    if (uni.getSystemInfoSync().model.indexOf("iPhone X") >= 0) {
      this.isIphoneX = true;
    }
  },

  onUnload: function onUnload() {
    new _Notification.Notification().removeObserverAllNotification(this);
  },

  onShow: function onShow() {
    // source=remind
    PrivateData.isRequest = false;
    this.iniData();
  },

  data: function data() {
    return {
      source: '', // 判断是否来至于动态提醒
      isIphoneX: false, // 是否是IphoneX
      isLoading: true, // 是否加载完成
      accountSource: 2, // 1 置业顾问端  2 开发商端
      baseInfoList: {}, // 基础信息
      brokerInfo: {}, // 经纪人信息
      brokerFirstName: '',
      saleUInfo: {}, // 置业顾问信息
      saleFirstName: '',
      dealInfo: {}, // 成交信息
      trackList: {}, // 跟进记录
      directCustomer: 0, // 是否是直客 0:否，1:是
      custStatus: -1000,
      showButtonStatus: null,

      popupType: '', //弹窗类型  wuXiao confirm  tel
      popupText: {
        "yuYinTongHua": {
          title: "拨打电话",
          content: '',
          confirmText: "呼叫",
          cancelColor: "rgba(0,0,0,0.6)",
          confirmColor: "#3396fb" },

        "wuXiaokehu": {
          title: "温馨提示",
          content: '是否确认为无效客户?',
          confirmText: "确认",
          cancelColor: "#3396fb",
          confirmColor: "#3396fb" },

        "queRenBaoBei": {
          title: "温馨提示",
          content: '是否确认报备?',
          confirmText: "确认",
          cancelColor: "#3396fb",
          confirmColor: "#3396fb" },

        "shenQinDaiKan": {
          title: "温馨提示",
          content: '是否申请带看?',
          confirmText: "确认",
          cancelColor: "#3396fb",
          confirmColor: "#3396fb" },

        "queRenDaiKan": {
          title: "温馨提示",
          content: '是否确认带看?',
          confirmText: "确认",
          cancelColor: "#3396fb",
          confirmColor: "#3396fb" },

        "queRenQianYue": {
          title: "温馨提示",
          content: '是否确认签约?',
          confirmText: "确认",
          cancelColor: "#3396fb",
          confirmColor: "#3396fb" },

        "shenQinJieYong": {
          title: "温馨提示",
          content: '是否申请结佣?',
          confirmText: "确认",
          cancelColor: "#3396fb",
          confirmColor: "#3396fb" },

        "shenQinQianYue": {
          title: "温馨提示",
          content: '是否申请签约?',
          confirmText: "确认",
          cancelColor: "#3396fb",
          confirmColor: "#3396fb" },

        "boDaDianHua": {
          title: "拨打电话",
          content: '',
          confirmText: "呼叫",
          cancelColor: "rgba(0,0,0,0.6)",
          confirmColor: "#3396fb" },

        "jingJiRenBuQuanTips": {
          title: "温馨提示",
          content: '请联系经纪人补全客户电话',
          confirmText: "我知道了",
          confirmColor: "#3396fb",
          showCancel: false },

        "souceTips": {
          title: "温馨提示",
          content: '该客户尚未进行扫码确认，请先扫码确认再执行后续操作。',
          confirmText: "我知道了",
          confirmColor: "#3396fb",
          showCancel: false } },


      detail_info: {}, // 详情数据

      buQuanXinxi: false, //是否补全信息
      shangChuanDaiKanQueRenShu: false, //是否上传带看确认书
      isShowKeDaiKanTimeText: false, //是否显示 可带看剩余时间:xx天xx小时xx分
      KeDaiKanDay: '',
      KeDaiKanHour: '',
      KeDaiKanMinute: '',
      isNew: 0, //是否是新页面过来的

      isShowKeChenJiaoTimeText: false,
      KeChenJiaoDay: '',
      KeChenJiaoHour: '',
      KeChenJiaoMinute: '',
      hasQueRenQianYue: false, // 是否有确认签约权限
      isShowCheXiaoRenGouView: false, //是否展示撤销认购页面
      cheXiaoRenGouText: '' // 撤销认购理由
    };
  },

  methods: {
    CustomerConfirmMsgChange: function CustomerConfirmMsgChange() {
      this.iniData();
    },

    // 请求详情数据 GetCustDetailInfo
    iniData: function iniData() {var _this = this;
      if (!c_param.custId || !c_param.cityId) return;

      this.isLoading = true;
      new _CustomerForDevelopersNet.GetCustDetailInfo(c_param).send().
      then(function (res) {
        var that = _this;
        console.log(res, '--客户详情res--');
        if (res.errCode != 200) {
          _this.DifferenceApi.showToast(res.errMsg || "服务器开小差了,请稍后再试");
          return [];
        }

        // 设置标题
        if (res.data.custName) {
          uni.setNavigationBarTitle({
            title: res.data.custName });

        }

        // 基础信息
        var baseInfoList = {};
        baseInfoList.custName = res.data.custName || ''; // 姓名
        baseInfoList.custMobile = res.data.custMobile || ''; // 联系电话
        baseInfoList.custSex = res.data.custSex || ''; // 性别
        baseInfoList.intentionLayout = res.data.intentionLayout.split(",") || ''; // 意向户型
        baseInfoList.payWayCn = res.data.payWayCn || ''; // 付款方式
        baseInfoList.price = res.data.price || ''; // 预算价格
        baseInfoList.intentionRegion = res.data.intentionRegion || ''; // 意向区域
        baseInfoList.purchaseMotivation = res.data.purchaseMotivation || ''; // 购房目的
        baseInfoList.otherRequirement = res.data.otherRequirement || ''; // 其他需求
        _this.baseInfoList = baseInfoList;

        // 处理电话号码
        baseInfoList.isCanCall = true;
        if (_this.VerifyPhone(res.data.custMobile || '')) {
          baseInfoList.isCanCall = false;
        }

        //底部信息
        _this.brokerInfo = res.data.brokerInfo || [];
        _this.brokerFirstName = res.data.brokerInfo && res.data.brokerInfo.brokerName ? res.data.brokerInfo.brokerName.substring(0, 1) : '';
        _this.saleUInfo = res.data.saleUInfo || [];
        _this.saleFirstName = res.data.saleUInfo && res.data.saleUInfo.userName ? res.data.saleUInfo.userName.substring(0, 1) : '';
        new _CustomerModel.CustomerModel().setModel(res.data.saleUInfo || {});

        //跟进信息
        if (res.data.trackList.length > 0) {var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {
            for (var _iterator = res.data.trackList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var item = _step.value;
              var re = /(\n)/g;
              item.trackContent = item.trackContent.replace(re, "#").split('#');
            }} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return != null) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}
        }
        _this.trackList = res.data.trackList || '';

        _this.directCustomer = res.data.directCustomer; // 是否是直客
        _this.custStatus = res.data.custStatus; // 报备状态

        // 成交信息
        var dealInfo = {};
        dealInfo.houseNo = res.data.houseNo || ''; // 房源编号
        dealInfo.houseArea = res.data.houseArea || ''; // 房源面积
        dealInfo.dealAmount = res.data.dealAmount || ''; // 成交金额
        dealInfo.buildName = res.data.buildName || ''; // 意向楼盘
        _this.dealInfo = dealInfo;
        _this.detail_info = res.data;

        // 处理流程 按钮,文案,icon
        var UserJurisdiction = _LoginSuccessModel.GetLoginModel.getUserJurisdiction(); // 权限-开发商端默认全部权限
        _this.accountSource = _LoginSuccessModel.GetLoginModel.getAccountSource(); // 获取账号来源  1 置业顾问端  2 开发商端
        _this.showButtonStatus = null; // 赋值为null(初始状态) 防止没有进if的情况导致按钮显示错误

        // 判断是否来至于动态提醒
        if (that.source == 'remind') {
          if (res.data.custStatus && res.data.custStatus == 2) {var









            KeDaiKanTime = function KeDaiKanTime() {
              var conS = Math.floor(dealRemainingTimeOfTwo / 1000); //获得差值除以1000转为秒
              var d = Math.floor(conS / 86400) < 0 ? 0 : Math.floor(conS / 86400); // 差值/60/60/24获取天数
              if (d < 10) {
                d = '0' + d;
              }
              that.KeDaiKanDay = d;
              var h = Math.floor(conS % 86400 / 3600) < 0 ? 0 : Math.floor(conS % 86400 / 3600); //  取余/60/60获取时(取余是获取conS对应位置的小数位)
              if (h < 10) {
                h = '0' + h;
              }
              that.KeDaiKanHour = h;
              var m = Math.floor(conS % 86400 % 3600 / 60) < 0 ? 0 : Math.floor(conS % 86400 % 3600 / 60); // 取余/60获取分
              if (m < 10) {
                m = '0' + m;
              }
              that.KeDaiKanMinute = m;
              dealRemainingTimeOfTwo = dealRemainingTimeOfTwo - 60 * 1000;
            };_this.showButtonStatus = 203;var dealRemainingTimeOfTwo = res.data.visitRemainingTime;KeDaiKanTime();setInterval(function () {KeDaiKanTime();}, 30000);

            _this.popupType = 'souceTips';
            _this.$refs.modal.show();
            return;
            /*this.popupType = 'souceTips';
                    this.$refs.modal.show();
                    setTimeout(()=>{
                        uni.navigateBack({
                            delta: 1
                        });
                    },2000);
                    return ;*/
          }
        }
        if (res.data.custStatus == 1) {
          if (UserJurisdiction.indexOf(1) >= 0) {
            // 文案:无  按钮: 无效客户 确认报备
            _this.showButtonStatus = 101;
          }
        }
        if (res.data.custStatus == 2) {
          //判断权限
          if (UserJurisdiction.indexOf(2) >= 0) {
            if (res.data.confirmationQrCodeTime) {
              _this.showButtonStatus = 201;
              _this.buQuanXinxi = !!res.data.completeCustMobile;
              _this.shangChuanDaiKanQueRenShu = !!res.data.confirmationPhotoUrl;
            } else {
              _this.showButtonStatus = 100;
            }

            //判断如果设置为: 签约认购时 补全号码的情况(completeMobileConfig=2) 带看补全号码(completeMobileConfig=1)
            if (res.data.completeMobileConfig == 2) {
              // 有权限且是签约时补全号码 按钮:确认带看 文案(下面):经纪人已补全客户信息,可确认带看
              _this.showButtonStatus = 204;
            }
          } else {
            if (res.data.confirmationQrCodeTime) {
              _this.showButtonStatus = 202;
              _this.buQuanXinxi = !!res.data.completeCustMobile;
              _this.shangChuanDaiKanQueRenShu = !!res.data.confirmationPhotoUrl;
            } else {
              _this.showButtonStatus = 100;
            }
            //
            if (res.data.completeMobileConfig == 2) {
              // 无权限 且是签约时补全号码 按钮:申请带看 文案:经纪人已补全客户信息,可申请带看
              _this.showButtonStatus = 205;
            }
          }

          if (_this.isNew == '1') {var









            _KeDaiKanTime = function _KeDaiKanTime() {
              var conS = Math.floor(_dealRemainingTimeOfTwo / 1000); //获得差值除以1000转为秒
              var d = Math.floor(conS / 86400) < 0 ? 0 : Math.floor(conS / 86400); // 差值/60/60/24获取天数
              if (d < 10) {
                d = '0' + d;
              }
              that.KeDaiKanDay = d;
              var h = Math.floor(conS % 86400 / 3600) < 0 ? 0 : Math.floor(conS % 86400 / 3600); //  取余/60/60获取时(取余是获取conS对应位置的小数位)
              if (h < 10) {
                h = '0' + h;
              }
              that.KeDaiKanHour = h;
              var m = Math.floor(conS % 86400 % 3600 / 60) < 0 ? 0 : Math.floor(conS % 86400 % 3600 / 60); // 取余/60获取分
              if (m < 10) {
                m = '0' + m;
              }
              that.KeDaiKanMinute = m;
              _dealRemainingTimeOfTwo = _dealRemainingTimeOfTwo - 60 * 1000;
            };_this.showButtonStatus = 203;var _dealRemainingTimeOfTwo = res.data.visitRemainingTime;_KeDaiKanTime();setInterval(function () {_KeDaiKanTime();}, 30000);

          }
        }
        if (res.data.custStatus == 3) {
          //判断是否有4(确认签约权限)
          if (UserJurisdiction.indexOf(4) >= 0) {
            _this.hasQueRenQianYue = true;
          }

          if (UserJurisdiction.indexOf(3) >= 0) {
            _this.showButtonStatus = 301;
            _this.shangChuanDaiKanQueRenShu = !!res.data.confirmationPhotoUrl;
          } else {
            _this.showButtonStatus = 302;
            _this.shangChuanDaiKanQueRenShu = !!res.data.confirmationPhotoUrl;
          }

          // 是否显示可成交剩余时间:xx天xx小时xx分
          if (res.data.dealRemainingTime) {var









            KeChenJiaoTime = function KeChenJiaoTime() {
              var conS = Math.floor(dealRemainingTimeOfThree / 1000); //获得差值除以1000转为秒
              var d = Math.floor(conS / 86400) < 0 ? 0 : Math.floor(conS / 86400); // 差值/60/60/24获取天数
              if (d < 10) {
                d = '0' + d;
              }
              that.KeChenJiaoDay = d;
              var h = Math.floor(conS % 86400 / 3600) < 0 ? 0 : Math.floor(conS % 86400 / 3600); //  取余/60/60获取时(取余是获取conS对应位置的小数位)
              if (h < 10) {
                h = '0' + h;
              }
              that.KeChenJiaoHour = h;
              var m = Math.floor(conS % 86400 % 3600 / 60) < 0 ? 0 : Math.floor(conS % 86400 % 3600 / 60); // 取余/60获取分
              if (m < 10) {
                m = '0' + m;
              }
              that.KeChenJiaoMinute = m;
              dealRemainingTimeOfThree = dealRemainingTimeOfThree - 60 * 100;
            };_this.isShowKeChenJiaoTimeText = true; // 显示
            var dealRemainingTimeOfThree = res.data.dealRemainingTime;KeChenJiaoTime();setInterval(function () {KeChenJiaoTime();}, 30000);}
        }
        if (res.data.custStatus == 4) {
          if (UserJurisdiction.indexOf(4) >= 0) {
            _this.showButtonStatus = 401;
            _this.shangChuanDaiKanQueRenShu = !!res.data.confirmationPhotoUrl;
          } else {
            _this.showButtonStatus = 402;
            _this.shangChuanDaiKanQueRenShu = !!res.data.confirmationPhotoUrl;
          }
        }
        if (res.data.custStatus == 5) {
          if (res.data.userApply == 0) {
            _this.showButtonStatus = 501;
            _this.shangChuanDaiKanQueRenShu = !!res.data.confirmationPhotoUrl;
          } else {
            _this.showButtonStatus = 502;
            _this.shangChuanDaiKanQueRenShu = !!res.data.confirmationPhotoUrl;
          }
          if (res.data.directCustomer == 1) {
            _this.showButtonStatus = 100;
          }
        }
        if (res.data.custStatus == 6) {
          // this.showButtonStatus = 502;
          _this.showButtonStatus = 100;
          _this.shangChuanDaiKanQueRenShu = !!res.data.confirmationPhotoUrl;
          if (res.data.directCustomer == 1) {
            _this.showButtonStatus = 100;
          }
        }
        if (res.data.custStatus == 7 || res.data.paidStatus == 1) {
          if (res.data.directCustomer == 1) {
            _this.showButtonStatus = 100;
          }
          _this.shangChuanDaiKanQueRenShu = !!res.data.confirmationPhotoUrl;
          _this.showButtonStatus = 701;
        }


        console.log(_this.custStatus, '当前用户状态');
        console.log(_this.showButtonStatus, '当前block');
      }).
      catch(function (res) {
        console.log(res);
        _this.DifferenceApi.showToast(res.errMsg || "服务器开小差了,请稍后再试");
      });
    },
    // 添加跟进
    goToAddFollowView: function goToAddFollowView() {
      uni.navigateTo({
        url: '/pagesCustomer/writeFollow/writeFollow?custId=' + c_param.custId + '&cityId=' + c_param.cityId });

    },
    // 按钮点击事件
    gotoButtonsView: function gotoButtonsView(item) {
      // 无效客户
      if (item == 'invalidCustomerView') {
        this.popupType = 'wuXiaokehu';
        this.$refs.modal.show();
      }
      // 确认报备
      if (item == 'checkReportView') {
        this.popupType = 'queRenBaoBei';
        this.$refs.modal.show();
      }
      // 确认带看
      if (item == 'queRenDaiKanView') {
        //如果是 设置为 申请认购时补全经纪人电话 且未补全电话 提示:经纪人补全客户电话
        if (this.detail_info.completeMobileConfig == 1 && this.detail_info.completeCustMobile == 0 && this.detail_info.directCustomer == 0) {
          this.popupType = 'jingJiRenBuQuanTips';
          this.$refs.modal.show();
          return;
        }

        this.popupType = 'queRenDaiKan';
        this.$refs.modal.show();
      }
      // 申请带看
      if (item == 'shenQinDaiKanView') {
        this.popupType = 'shenQinDaiKan';
        this.$refs.modal.show();
      }
      // 确认认购
      if (item == 'ckeckRenGouView') {
        //如果是 设置为 申请认购时补全经纪人电话 且未补全电话 提示:经纪人补全客户电话
        if (this.detail_info.completeMobileConfig == 2 && this.detail_info.completeCustMobile == 0 && this.detail_info.directCustomer == 0) {
          this.popupType = 'jingJiRenBuQuanTips';
          this.$refs.modal.show();
          return;
        }

        var cityId = this.detail_info.cityId || '';
        var custId = this.detail_info.custId || '';
        var custStatus = this.detail_info.custStatus || '';
        var houseNo = this.detail_info.houseNo || '';
        var houseArea = this.detail_info.houseArea || '';
        var dealAmount = this.detail_info.dealAmount || '';
        var commission = this.detail_info.commission || '';
        var directCustomer = this.detail_info.directCustomer || 0;
        var layoutNo = this.detail_info.layoutNo || '';
        uni.navigateTo({
          url: "/pagesCustomer/subscriptionInfo/subscriptionInfo?houseNo=" + houseNo +
          '&houseArea=' + houseArea +
          '&dealAmount=' + dealAmount +
          '&commission=' + commission +
          '&cityId=' + cityId +
          '&custId=' + custId +
          '&custStatus=' + custStatus +
          '&directCustomer=' + directCustomer +
          '&layoutNo=' + layoutNo });

      }
      // 确认签约
      if (item == 'queRenQianYueView') {
        //如果是 设置为 申请认购时补全经纪人电话 且未补全电话 提示:经纪人补全客户电话
        if (this.detail_info.completeMobileConfig == 2 && this.detail_info.completeCustMobile == 0 && this.detail_info.directCustomer == 0) {
          this.popupType = 'jingJiRenBuQuanTips';
          this.$refs.modal.show();
          return;
        }

        if (this.detail_info.houseNo && this.detail_info.houseArea && this.detail_info.dealAmount && this.detail_info.layoutNo) {
          this.popupType = 'queRenQianYue';
          this.$refs.modal.show();
        } else {
          var _cityId = this.detail_info.cityId || '';
          var _custId = this.detail_info.custId || '';
          var _custStatus = this.detail_info.custStatus || '';
          var _directCustomer = this.detail_info.directCustomer || 0;

          uni.navigateTo({
            url: "/pagesCustomer/signInfo/signInfo?cityId=" + _cityId +
            '&custId=' + _custId +
            '&custStatus=' + _custStatus +
            '&directCustomer=' + _directCustomer });

        }
      }
      // 申请认购
      if (item == 'applyRenGouView') {
        //如果是 设置为 申请认购时补全经纪人电话 且未补全电话 提示:经纪人补全客户电话
        if (this.detail_info.completeMobileConfig == 2 && this.detail_info.completeCustMobile == 0 && this.detail_info.directCustomer == 0) {
          this.popupType = 'jingJiRenBuQuanTips';
          this.$refs.modal.show();
          return;
        }

        var _cityId2 = this.detail_info.cityId || '';
        var _custId2 = this.detail_info.custId || '';
        var _custStatus2 = this.detail_info.custStatus || '';
        var _houseNo = this.detail_info.houseNo || '';
        var _houseArea = this.detail_info.houseArea || '';
        var _dealAmount = this.detail_info.dealAmount || '';
        var _commission = this.detail_info.commission || '';
        var _layoutNo = this.detail_info.layoutNo || '';
        var _directCustomer2 = this.detail_info.directCustomer || 0;
        uni.navigateTo({
          url: "/pagesCustomer/applyRenGou/applyRenGou?houseNo=" + _houseNo +
          '&houseArea=' + _houseArea +
          '&dealAmount=' + _dealAmount +
          '&commission=' + _commission +
          '&cityId=' + _cityId2 +
          '&custId=' + _custId2 +
          '&custStatus=' + _custStatus2 +
          '&directCustomer=' + _directCustomer2 +
          '&layoutNo=' + _layoutNo });

      }
      //申请签约
      if (item == 'shenQinQianYueView') {
        //如果是 设置为 申请认购时补全经纪人电话 且未补全电话 提示:经纪人补全客户电话
        if (this.detail_info.completeMobileConfig == 2 && this.detail_info.completeCustMobile == 0 && this.detail_info.directCustomer == 0) {
          this.popupType = 'jingJiRenBuQuanTips';
          this.$refs.modal.show();
          return;
        }

        if (this.detail_info.houseNo && this.detail_info.houseArea && this.detail_info.dealAmount && this.detail_info.layoutNo) {
          this.popupType = 'shenQinQianYue';
          this.$refs.modal.show();
        } else {
          var _cityId3 = this.detail_info.cityId || '';
          var _custId3 = this.detail_info.custId || '';
          var _custStatus3 = this.detail_info.custStatus || '';
          var _layoutNo2 = this.detail_info.layoutNo || '';
          var _directCustomer3 = this.detail_info.directCustomer || 0;
          uni.navigateTo({
            url: "/pagesCustomer/signInfo/signInfo?cityId=" + _cityId3 +
            '&custId=' + _custId3 +
            '&custStatus=' + _custStatus3 +
            '&directCustomer=' + _directCustomer3 +
            '&layoutNo=' + _layoutNo2 });

        }
      }
      // 撤销认购
      if (item == 'cheXiaoRenGouView') {
        this.isShowCheXiaoRenGouView = true;
        console.log('撤销认购');
      }
      //申请结佣
      if (item == 'shenQinJieYongView') {
        this.popupType = 'shenQinJieYong';
        this.$refs.modal.show();
      }
      // 上传带看确认书
      if (item == 'upDaiKanQueRenShuView') {
        console.log('点击上传带看确认书按钮了');
        var photoUrl = this.detail_info.confirmationPhotoUrl || '';
        uni.navigateTo({
          url: "/pagesCustomer/upDaiKanQueRenShu/upDaiKanQueRenShu?brokerCityId=" +
          this.detail_info.cityId + '&custId=' +
          this.detail_info.custId + '&photoUrl=' + photoUrl +
          '&paidStatus=' + this.detail_info.paidStatus +
          '&custStatus=' + this.detail_info.custStatus });

      }
    },
    // 弹窗
    onModalChanged: function onModalChanged(val) {var _this2 = this;
      if (!val) return;
      // 无效报备
      if (this.popupType == "wuXiaokehu") {
        var param = {
          custId: this.detail_info.custId,
          cityId: this.detail_info.cityId,
          custStatus: 0 };

        this.UpdateCustStatus(param);
      }
      // 确认报备
      if (this.popupType == "queRenBaoBei") {
        var _param = {
          custId: this.detail_info.custId,
          cityId: this.detail_info.cityId,
          custStatus: 2 };

        this.UpdateCustStatus(_param);
      }
      // 确认带看
      if (this.popupType == "queRenDaiKan") {
        var sellInfo = new _CustomerModel.CustomerModel().getModel() || "";
        if (sellInfo.userId) {
          new _ImChart.ImSendMessage().sendNotifyMsg("ld_" + sellInfo.userId);
        }
        var _param2 = {
          custId: this.detail_info.custId,
          cityId: this.detail_info.cityId,
          custStatus: 3 };

        this.UpdateCustStatus(_param2);
      }
      // 申请带看
      if (this.popupType == "shenQinDaiKan") {
        var applyParam = {
          custId: this.detail_info.custId,
          cityId: this.detail_info.cityId };

        this.ApplyCustomer(applyParam);
      }
      // 申请结佣
      if (this.popupType == 'shenQinJieYong') {
        var _param3 = {
          custId: this.detail_info.custId,
          cityId: this.detail_info.cityId };

        this.ApplyCustomer(_param3);
      }
      // 确认签约
      if (this.popupType == 'queRenQianYue') {
        if (PrivateData.isRequest) return; // 防止重复提交

        uni.showLoading({
          title: '确认中' });

        var para = {
          cityId: this.detail_info.cityId,
          custId: this.detail_info.custId,
          custStatus: this.detail_info.custStatus,
          houseNo: this.detail_info.houseNo,
          houseArea: this.detail_info.houseArea,
          dealAmount: this.detail_info.dealAmount,
          layoutNo: this.detail_info.layoutNo || '',
          commission: this.detail_info.commission || '' };

        PrivateData.isRequest = true;
        new _CustomerNet.RequestOrSign(para).send().then(function (res) {
          uni.hideLoading();
          if (res.errCode !== _Const.Const.success) {
            _this2.DifferenceApi.showToast(res.errMsg || "服务器开小差了,请稍后再试");
            PrivateData.isRequest = false;
            return;
          }
          PrivateData.isRequest = false;
          _this2.iniData();
        }).
        catch(function (res) {
          uni.hideLoading();
          PrivateData.isRequest = false;
          _this2.DifferenceApi.showToast(res.errMsg || "请求失败");
        });
      }
      // 拨打电话
      if (this.popupType == 'boDaDianHua') {
        uni.makePhoneCall({
          phoneNumber: this.detail_info.custMobile });

      }
      // 申请签约
      if (this.popupType == 'shenQinQianYue') {
        if (PrivateData.isRequest) return; // 防止重复提交
        uni.showLoading({
          title: '申请中' });

        var _para = {
          cityId: this.detail_info.cityId,
          custId: this.detail_info.custId,
          custStatus: this.detail_info.custStatus,
          houseNo: this.detail_info.houseNo,
          houseArea: this.detail_info.houseArea,
          dealAmount: this.detail_info.dealAmount,
          commission: this.detail_info.commission || '',
          layoutNo: this.detail_info.layoutNo || '' };

        PrivateData.isRequest = true;
        new _CustomerNet.RequestOrSign(_para).send().then(function (res) {
          uni.hideLoading();
          if (res.errCode !== _Const.Const.success) {
            _this2.DifferenceApi.showToast(res.errMsg || "服务器开小差了,请稍后再试");
            PrivateData.isRequest = false;
            return;
          }
          PrivateData.isRequest = false;
          _this2.iniData();
        }).
        catch(function (res) {
          uni.hideLoading();
          PrivateData.isRequest = false;
          _this2.DifferenceApi.showToast(res.errMsg || "请求失败");
        });
      }
    },

    // 封装修改用户状态接口
    UpdateCustStatus: function UpdateCustStatus(statuParam) {var _this3 = this;
      if (PrivateData.isRequest) return; // 防止重复提交

      uni.showLoading({
        title: '操作中' });

      PrivateData.isRequest = true;
      new _CustomerForDevelopersNet.UpdateCustStatus(statuParam).send().then(function (res) {
        uni.hideLoading();
        if (res.errCode != 200) {
          _this3.DifferenceApi.showToast(res.errMsg || "服务器开小差了,请稍后再试");
          PrivateData.isRequest = false;
          return;
        }
        PrivateData.isRequest = false;
        _this3.iniData();
      }).
      catch(function (res) {
        PrivateData.isRequest = false;
        uni.hideLoading();
        _this3.DifferenceApi.showToast(res.errMsg || "请求失败");
      });
    },
    // 封装申请接口
    ApplyCustomer: function ApplyCustomer(applyParam) {var _this4 = this;
      if (PrivateData.isRequest) return; // 防止重复提交

      uni.showLoading({
        title: '操作中' });

      PrivateData.isRequest = true;
      new _CustomerForDevelopersNet.ApplyNextStep(applyParam).send().then(function (res) {
        uni.hideLoading();
        if (res.errCode != 200) {
          PrivateData.isRequest = false;
          _this4.DifferenceApi.showToast(res.errMsg || "服务器开小差了,请稍后再试");
          return;
        }
        PrivateData.isRequest = false;
        _this4.iniData();
      }).
      catch(function (res) {
        PrivateData.isRequest = false;
        uni.hideLoading();
        _this4.DifferenceApi.showToast(res.errMsg || "请求失败");
      });
    },

    // 取消 撤销认购 页面展示
    cancelCeXiao: function cancelCeXiao() {
      console.log('取消 撤销认购 页面展示');
      this.isShowCheXiaoRenGouView = false;
    },

    changeTextArea: function changeTextArea(e) {
      this.cheXiaoRenGouText = e.detail.value;
    },

    quedinCeXiao: function quedinCeXiao() {var _this5 = this;
      if (this.cheXiaoRenGouText.length == 0) {
        this.DifferenceApi.showToast('请输入撤销原因');
        return;
      }
      var pa = {
        cityId: this.detail_info.cityId,
        custId: this.detail_info.custId,
        reason: this.cheXiaoRenGouText };

      uni.showLoading({ title: '撤销中...', mask: _config.Config.mask });
      new _CustomerNet.CancelConfirm(pa).send().then(function (res) {
        uni.hideLoading();
        if (res.errCode !== _Const.Const.success) {
          return Promise.reject(res);
        }
        _this5.isShowCheXiaoRenGouView = false;
        _this5.iniData();
        _this5.DifferenceApi.showToast("撤销认购成功");
      }).
      catch(function (res) {
        uni.hideLoading();
        _this5.DifferenceApi.showToast(res.errMsg || "请求失败");
      });
    },

    // 验证手机号码
    VerifyPhone: function VerifyPhone(phone) {
      if (!phone) return false;

      var reg = /[*]+/;
      return !!reg.test(phone);
    },

    // 拨打电话
    goToCallPhoneView: function goToCallPhoneView(phone) {
      if (!phone) {
        this.DifferenceApi.showToast('暂无电话');
        return;
      }

      if (phone.length !== 11) {
        this.DifferenceApi.showToast('电话号码错误');
        return;
      }

      this.popupType = 'boDaDianHua';
      this.popupText.boDaDianHua.content = phone;
      this.$refs.modal.show();
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 334:
/*!**********************************************************************************************************************************!*\
  !*** D:/小黑项目/yx_uniapp/pagesCustomer/customerDetail/customerDetail.vue?vue&type=style&index=0&id=2a92cb7a&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_customerDetail_vue_vue_type_style_index_0_id_2a92cb7a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--6-oneOf-1-2!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./customerDetail.vue?vue&type=style&index=0&id=2a92cb7a&scoped=true&lang=css& */ 335);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_customerDetail_vue_vue_type_style_index_0_id_2a92cb7a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_customerDetail_vue_vue_type_style_index_0_id_2a92cb7a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_customerDetail_vue_vue_type_style_index_0_id_2a92cb7a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_customerDetail_vue_vue_type_style_index_0_id_2a92cb7a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_customerDetail_vue_vue_type_style_index_0_id_2a92cb7a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 335:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/小黑项目/yx_uniapp/pagesCustomer/customerDetail/customerDetail.vue?vue&type=style&index=0&id=2a92cb7a&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},[[326,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pagesCustomer/customerDetail/customerDetail.js.map
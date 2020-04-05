(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pagesStaff/staffList/staffList"],{

/***/ 252:
/*!*******************************************************************************!*\
  !*** D:/小黑项目/yx_uniapp/main.js?{"page":"pagesStaff%2FstaffList%2FstaffList"} ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);__webpack_require__(/*! @dcloudio/uni-stat */ 5);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _staffList = _interopRequireDefault(__webpack_require__(/*! ./pagesStaff/staffList/staffList.vue */ 253));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_staffList.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 253:
/*!************************************************************!*\
  !*** D:/小黑项目/yx_uniapp/pagesStaff/staffList/staffList.vue ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _staffList_vue_vue_type_template_id_7f4554dc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./staffList.vue?vue&type=template&id=7f4554dc& */ 254);
/* harmony import */ var _staffList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./staffList.vue?vue&type=script&lang=js& */ 256);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _staffList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _staffList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _staffList_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./staffList.vue?vue&type=style&index=0&lang=css& */ 260);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 53);

var renderjs





/* normalize component */

var component = Object(_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _staffList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _staffList_vue_vue_type_template_id_7f4554dc___WEBPACK_IMPORTED_MODULE_0__["render"],
  _staffList_vue_vue_type_template_id_7f4554dc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _staffList_vue_vue_type_template_id_7f4554dc___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

/* hot reload */
if (false) { var api; }
component.options.__file = "小黑项目/yx_uniapp/pagesStaff/staffList/staffList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 254:
/*!*******************************************************************************************!*\
  !*** D:/小黑项目/yx_uniapp/pagesStaff/staffList/staffList.vue?vue&type=template&id=7f4554dc& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_staffList_vue_vue_type_template_id_7f4554dc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./staffList.vue?vue&type=template&id=7f4554dc& */ 255);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_staffList_vue_vue_type_template_id_7f4554dc___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_staffList_vue_vue_type_template_id_7f4554dc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_staffList_vue_vue_type_template_id_7f4554dc___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_staffList_vue_vue_type_template_id_7f4554dc___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 255:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/小黑项目/yx_uniapp/pagesStaff/staffList/staffList.vue?vue&type=template&id=7f4554dc& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  var a0 = {
    title: "温馨提示",
    content: "您确定要注销" + (_vm.currentItem.userName || "") + "，确认操作？",
    confirmText: "确定"
  }
  var a1 = {
    title: "调动员工",
    content: "请先移交该员工的客户，才能进行调动",
    confirmText: "确定"
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        a0: a0,
        a1: a1
      }
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 256:
/*!*************************************************************************************!*\
  !*** D:/小黑项目/yx_uniapp/pagesStaff/staffList/staffList.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_staffList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./staffList.vue?vue&type=script&lang=js& */ 257);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_staffList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_staffList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_staffList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_staffList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_staffList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 257:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/小黑项目/yx_uniapp/pagesStaff/staffList/staffList.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;



































































































































var _Staff = __webpack_require__(/*! ../../net/Staff */ 258);

var _Const = __webpack_require__(/*! ../../utils/Const */ 17);
var _LoginSuccessModel = __webpack_require__(/*! ../../model/LoginSuccessModel */ 18);
var _IndexNet = __webpack_require__(/*! ../../net/IndexNet */ 259);function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var noData = function noData() {return __webpack_require__.e(/*! import() | pagesStaff/components/noData */ "pagesStaff/components/noData").then(__webpack_require__.bind(null, /*! ../components/noData */ 763));};var

PrivateData = function PrivateData() {_classCallCheck(this, PrivateData);};_defineProperty(PrivateData, "nodeAll",
[]);_defineProperty(PrivateData, "requesting",
false);_defineProperty(PrivateData, "buildList",
[]);_defineProperty(PrivateData, "chooseBuildItem",
null);_defineProperty(PrivateData, "scrollTop",
0);var _default =


{
  components: {
    noData: noData },


  data: function data() {
    return {
      userList: null, // 员工列表
      fixTop: "",
      showSetModal: false,
      setList: [
      {
        imgSrc: "http://cdn.haofang.net/static/xfldDeveloper/customer/custom_qx.png",
        text: "权限配置",
        className: "custom_qx",
        event: "qxConfig" },

      {
        imgSrc: "http://cdn.haofang.net/static/xfldDeveloper/customer/custom_dd.png",
        text: "人员调动",
        className: "custom_dd",
        event: "ryConfig" },

      {
        imgSrc: "http://cdn.haofang.net/static/xfldDeveloper/customer/custom_yj.png",
        text: "客户移交",
        className: "custom_yj",
        event: "yjConfig" },

      {
        imgSrc: "http://cdn.haofang.net/static/xfldDeveloper/customer/custom_close.png",
        text: "账号注销",
        className: "custom_close",
        event: "zxConfig" }],


      currentIndex: 0,
      currentItem: {
        userName: "" },

      authorityList: [
      {
        title: "报备审核",
        subject: "报备客户后审核是否同意带看",
        value: 1 },

      {
        title: "带看确客",
        subject: "客户到现场后确认是否进入带看",
        value: 2 },

      {
        title: "认购管理",
        subject: "确认客户是否达成购买意向",
        value: 3 },

      {
        checked: false,
        title: "签约管理",
        subject: "确认客户是否签署购房合同",
        value: 4 },

      {
        checked: false,
        title: "结佣管理",
        subject: "对审核结佣的信息进行确认和结算",
        value: 5 }],


      checkedAuthorityMap: {},
      checkImgSrc: "http://cdn.haofang.net/static/xfldDeveloper/customer/yg_check.png",
      checkedImgSrc: "http://cdn.haofang.net/static/xfldDeveloper/customer/yg_checked.png",
      authorityModal: false,
      buildList: [],
      chooseBuildModal: false };

  },

  onShow: function onShow() {
    this.iniData();
    this.showSetModal = false;
  },

  /* 去掉下拉刷新
     onPullDownRefresh() {
         this.iniData().then(() => {
             this.DifferenceApi.showToast("数据更新成功");
             uni.stopPullDownRefresh();
         }).catch(() => {
             this.DifferenceApi.showToast("数据更新成功");
             uni.stopPullDownRefresh();
         });
     },*/

  methods: {
    // 初始化楼盘列表
    initBuildList: function initBuildList() {var _this = this;
      if (!_LoginSuccessModel.GetLoginModel.getBuildId() || _LoginSuccessModel.GetLoginModel.getBuildId() == 0) {
        PrivateData.buildList = [];
        return;
      }

      return new _IndexNet.GetUserManageBuildList().send().
      then(function (res) {
        if (res.errCode !== _Const.Const.success) {
          return Promise.reject(res);
        }

        PrivateData.buildList = res.data ? res.data.buildList || [] : [];
        var buildList = [];var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {
          for (var _iterator = PrivateData.buildList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var info = _step.value;
            if (!info.buildId || !info.buildName || info.isActive == 1) continue;

            buildList.push({
              buildId: info.buildId,
              buildName: info.buildName,
              isActive: info.isActive || 0 // 当前选择楼盘 0=否 1=是
            });
          }} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return != null) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}
        _this.buildList = buildList;
      }).
      catch(function (err) {
        PrivateData.buildList = [];
      });
    },
    iniData: function iniData() {var _this2 = this;
      this.initBuildList();
      return new _Staff.GetAllUserListForStaff().send().
      then(function (res) {
        if (res.errCode != 200) {
          _this2.DifferenceApi.showToast(res.errMsg || "服务器开小差了,请稍后再试");
          _this2.userList = [];
          return res;
        }

        if (res.data.userList && res.data.userList.length < 0) {
          _this2.userList = [];
          return res;
        }

        var userList = [];var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {
          for (var _iterator2 = res.data.userList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var item = _step2.value;
            if (item.userJurisdiction) {
              item.userJurisdiction = item.userJurisdiction.split(' ');
            } else {
              item.userJurisdiction = [];
            }
            userList.push(item);
          }} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2.return != null) {_iterator2.return();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}
        _this2.userList = userList;
        setTimeout(function () {
          _this2.createSelectorQuery(_this2).selectAll(".dian_icon").
          boundingClientRect(function (data) {
            PrivateData.nodeAll = [];var _iteratorNormalCompletion3 = true;var _didIteratorError3 = false;var _iteratorError3 = undefined;try {
              for (var _iterator3 = data[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {var info = _step3.value;
                info.top += PrivateData.scrollTop;
                PrivateData.nodeAll.push(info);
              }} catch (err) {_didIteratorError3 = true;_iteratorError3 = err;} finally {try {if (!_iteratorNormalCompletion3 && _iterator3.return != null) {_iterator3.return();}} finally {if (_didIteratorError3) {throw _iteratorError3;}}}
          }).exec();
        }, 200);
        return res;
      }).
      catch(function (res) {
        _this2.DifferenceApi.showToast(res.errMsg || "请求失败");
        return res;
      });
    },
    addStaff: function addStaff() {
      uni.navigateTo({
        url: '/pagesStaff/addStaff/addStaff' });

    },
    pageClick: function pageClick() {
      this.showSetModal = false;
    },
    openOperationList: function openOperationList(item, index) {var _this3 = this;
      var setList = this.setList;
      setList[1].classNameDisabled = "";
      setList[2].classNameDisabled = "";
      if (!item.seeCount || item.seeCount == 0) {
        setList[2].classNameDisabled = "fixed_item_disabled";
      }
      if (PrivateData.buildList.length < 2) {
        setList[1].classNameDisabled = "fixed_item_disabled";
      }
      this.setList = setList;
      this.currentItem = item;
      var fixTop = PrivateData.nodeAll[index].top;
      console.log(fixTop, '--fixTop--');
      if (!this.showSetModal) {
        this.currentIndex = index;
        this.fixTop = fixTop;
        setTimeout(function () {
          _this3.showSetModal = true;
        }, 20);
        return;
      }

      this.currentIndex = index;
      this.showSetModal = false;
      setTimeout(function () {
        _this3.fixTop = fixTop;
      }, 10);
      setTimeout(function () {
        _this3.showSetModal = true;
      }, 20);
    },

    // 监听滚动条
    onScroll: function onScroll(e) {
      PrivateData.scrollTop = e.detail.scrollTop || 0;
    },

    // 操作
    setConfig: function setConfig(item) {
      this[item.event](item);
    },

    // 注销
    zxConfig: function zxConfig(item) {
      this.$refs.modal.show();
    },
    onModalChanged: function onModalChanged(val) {var _this4 = this;
      if (val) {
        if (PrivateData.requesting) return;

        PrivateData.requesting = true;
        new _Staff.CancelUser({ 'userId': this.currentItem.userId }).send().
        then(function (res) {
          if (res.errCode !== _Const.Const.success) {
            return Promise.reject(res);
          }

          _this4.showSetModal = false;
          _this4.DifferenceApi.showToast("注销成功");
          _this4.iniData();
          PrivateData.requesting = false;
        }).
        catch(function (res) {
          PrivateData.requesting = false;
          _this4.DifferenceApi.showToast(res.errMsg || "服务器开小差了,请稍后再试");
        });
      }
    },

    // 权限
    qxConfig: function qxConfig(item) {
      var checkedAuthorityMap = {};var _iteratorNormalCompletion4 = true;var _didIteratorError4 = false;var _iteratorError4 = undefined;try {
        for (var _iterator4 = (this.currentItem.userJurisdiction || [])[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {var val = _step4.value;
          checkedAuthorityMap[Number(val)] = true;
        }} catch (err) {_didIteratorError4 = true;_iteratorError4 = err;} finally {try {if (!_iteratorNormalCompletion4 && _iterator4.return != null) {_iterator4.return();}} finally {if (_didIteratorError4) {throw _iteratorError4;}}}
      this.checkedAuthorityMap = checkedAuthorityMap;
      this.authorityModal = true;
    },

    // 人员调动
    ryConfig: function ryConfig(item) {
      if (PrivateData.buildList.length < 2) return;

      if (this.currentItem.seeCount && this.currentItem.seeCount > 0) {
        this.$refs.ygModal.show();
        return;
      }

      this.chooseBuildModal = true;
      this.chooseBuildChange({ detail: { value: [0] } });
    },
    onYgModalChanged: function onYgModalChanged(val) {
      if (val) {
        uni.navigateTo({
          url: "/pagesStaff/customerTransfer/chooseCustomer?userId=" + this.currentItem.userId });

      }
    },
    // 选择楼盘
    chooseBuildChange: function chooseBuildChange(e) {
      PrivateData.chooseBuildItem = this.buildList[e.detail.value[0]];
    },
    chooseBuild: function chooseBuild(item) {
      PrivateData.chooseBuildItem = item;
      this.confirmChooseBuild();
    },
    // 取消
    cancelChooseBuild: function cancelChooseBuild() {
      this.chooseBuildModal = false;
    },
    // 确定
    confirmChooseBuild: function confirmChooseBuild() {var _this5 = this;
      if (PrivateData.requesting) return;

      uni.showLoading({ title: "设置中...", mask: true });
      PrivateData.requesting = true;
      new _Staff.ChangeBuildConsultant({
        buildId: PrivateData.chooseBuildItem.buildId,
        userId: this.currentItem.userId }).
      send().then(function (res) {
        if (res.errCode !== _Const.Const.success) {
          return Promise.reject(res);
        }

        _this5.showSetModal = false;
        _this5.iniData();
        uni.hideLoading();
        _this5.cancelAuthority();
        PrivateData.requesting = false;
        _this5.chooseBuildModal = false;
        _this5.DifferenceApi.showToast("人员调动成功");
      }).catch(function (res) {
        uni.hideLoading();
        PrivateData.requesting = false;
        _this5.DifferenceApi.showToast(res.errMsg || "人员调动失败");
      });
    },

    // 客户移交
    yjConfig: function yjConfig(item) {
      if (item.classNameDisabled &&
      item.classNameDisabled.indexOf("fixed_item_disabled") >= 0) return;

      this.onYgModalChanged(true);
    },
    // 权限change
    authorityChange: function authorityChange(e) {
      var checkedAuthorityMap = {};var _iteratorNormalCompletion5 = true;var _didIteratorError5 = false;var _iteratorError5 = undefined;try {
        for (var _iterator5 = (e.detail.value || [])[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {var val = _step5.value;
          checkedAuthorityMap[Number(val)] = true;
        }} catch (err) {_didIteratorError5 = true;_iteratorError5 = err;} finally {try {if (!_iteratorNormalCompletion5 && _iterator5.return != null) {_iterator5.return();}} finally {if (_didIteratorError5) {throw _iteratorError5;}}}
      this.checkedAuthorityMap = checkedAuthorityMap;
    },
    // 取消
    cancelAuthority: function cancelAuthority() {
      this.authorityModal = false;
    },
    // 确定
    confirmAuthority: function confirmAuthority() {var _this6 = this;
      var userJurisdictionList = [];
      var userJurisdiction = "";
      for (var k in this.checkedAuthorityMap) {
        if (this.checkedAuthorityMap[k]) {
          userJurisdictionList.push(Number(k));
        }
      }
      if (userJurisdictionList.length > 0) {
        userJurisdiction = userJurisdictionList.join(" ");
      }
      if (PrivateData.requesting) return;

      uni.showLoading({ title: "设置中...", mask: true });
      PrivateData.requesting = true;
      new _Staff.PermissionsAllocation({
        userJurisdiction: userJurisdiction,
        userId: this.currentItem.userId }).
      send().then(function (res) {
        if (res.errCode !== _Const.Const.success) {
          return Promise.reject(res);
        }

        _this6.showSetModal = false;
        _this6.iniData();
        uni.hideLoading();
        _this6.cancelAuthority();
        PrivateData.requesting = false;
        _this6.DifferenceApi.showToast("权限设置成功");
      }).catch(function (res) {
        uni.hideLoading();
        PrivateData.requesting = false;
        _this6.DifferenceApi.showToast(res.errMsg || "权限设置失败");
      });
    },

    // 置业顾问详情
    goToDetail: function goToDetail(item) {
      uni.navigateTo({
        url: "/pagesStaff/staffCustomerList/staffCustomerList?userId=" + item.userId + '&userName=' + item.userName });

    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 260:
/*!*********************************************************************************************!*\
  !*** D:/小黑项目/yx_uniapp/pagesStaff/staffList/staffList.vue?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_staffList_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--6-oneOf-1-2!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./staffList.vue?vue&type=style&index=0&lang=css& */ 261);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_staffList_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_staffList_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_staffList_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_staffList_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_staffList_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 261:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/小黑项目/yx_uniapp/pagesStaff/staffList/staffList.vue?vue&type=style&index=0&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},[[252,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pagesStaff/staffList/staffList.js.map
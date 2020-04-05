(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pagesStatistics/analysis/analysis"],{

/***/ 240:
/*!**********************************************************************************!*\
  !*** D:/小黑项目/yx_uniapp/main.js?{"page":"pagesStatistics%2Fanalysis%2Fanalysis"} ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);__webpack_require__(/*! @dcloudio/uni-stat */ 5);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _analysis = _interopRequireDefault(__webpack_require__(/*! ./pagesStatistics/analysis/analysis.vue */ 241));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_analysis.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 241:
/*!***************************************************************!*\
  !*** D:/小黑项目/yx_uniapp/pagesStatistics/analysis/analysis.vue ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _analysis_vue_vue_type_template_id_546ded1f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./analysis.vue?vue&type=template&id=546ded1f& */ 242);
/* harmony import */ var _analysis_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./analysis.vue?vue&type=script&lang=js& */ 244);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _analysis_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _analysis_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _analysis_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./analysis.vue?vue&type=style&index=0&lang=less& */ 250);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 53);

var renderjs





/* normalize component */

var component = Object(_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _analysis_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _analysis_vue_vue_type_template_id_546ded1f___WEBPACK_IMPORTED_MODULE_0__["render"],
  _analysis_vue_vue_type_template_id_546ded1f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _analysis_vue_vue_type_template_id_546ded1f___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

/* hot reload */
if (false) { var api; }
component.options.__file = "小黑项目/yx_uniapp/pagesStatistics/analysis/analysis.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 242:
/*!**********************************************************************************************!*\
  !*** D:/小黑项目/yx_uniapp/pagesStatistics/analysis/analysis.vue?vue&type=template&id=546ded1f& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_analysis_vue_vue_type_template_id_546ded1f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./analysis.vue?vue&type=template&id=546ded1f& */ 243);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_analysis_vue_vue_type_template_id_546ded1f___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_analysis_vue_vue_type_template_id_546ded1f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_analysis_vue_vue_type_template_id_546ded1f___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_analysis_vue_vue_type_template_id_546ded1f___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 243:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/小黑项目/yx_uniapp/pagesStatistics/analysis/analysis.vue?vue&type=template&id=546ded1f& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ 244:
/*!****************************************************************************************!*\
  !*** D:/小黑项目/yx_uniapp/pagesStatistics/analysis/analysis.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_analysis_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./analysis.vue?vue&type=script&lang=js& */ 245);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_analysis_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_analysis_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_analysis_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_analysis_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_analysis_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 245:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/小黑项目/yx_uniapp/pagesStatistics/analysis/analysis.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;







































































var _StatisticsNet = __webpack_require__(/*! @/net/StatisticsNet.js */ 246);

var _changeData = __webpack_require__(/*! ./components/changeData.js */ 247);

var _LoginSuccessModel = __webpack_require__(/*! ../../model/LoginSuccessModel.js */ 18);
var _moment = _interopRequireDefault(__webpack_require__(/*! @/utils/moment.js */ 248));

var _Notification = __webpack_require__(/*! @/utils/Notification */ 20);
var _Notify = __webpack_require__(/*! @/utils/Notify */ 19);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var content = function content() {return __webpack_require__.e(/*! import() | pagesStatistics/analysis/components/content */ "pagesStatistics/analysis/components/content").then(__webpack_require__.bind(null, /*! ./components/content */ 756));};var _default =
{
  components: {
    content: content },

  data: function data() {
    return {
      title: _LoginSuccessModel.GetLoginModel.getBuildName(),
      swiper: {
        currentIndex: 0 },

      weekData: null, // 周数据
      monthData: null, // 月数据
      allData: null, // 总数据
      init_time: '',
      time_str: '',
      calender: {
        week_calender_start: '',
        week_calender_end: '',
        month_calender_start: '',
        month_calender_end: '',
        all_calender_start: '',
        all_calender_end: '' } };


  },
  methods: {
    StatisticsTimeChange: function StatisticsTimeChange(name, info) {
      if (info.type === 'chooseWeek') {
        //获取更新时间
        this.calender.week_calender_start = "".concat((0, _moment.default)(info.weekStartTimeStr).format('YYYY/MM/DD'));
        this.calender.week_calender_end = "".concat((0, _moment.default)(info.weekEndTimeStr).format('YYYY/MM/DD'));
        this.time_str = "".concat((0, _moment.default)(info.weekStartTimeStr).format('YYYY-MM-DD'), " - ").concat((0, _moment.default)(info.weekEndTimeStr).format('YYYY-MM-DD'));
        this.requestWeekData(this.time_str);

      } else
      if (info.type === 'chooseYear') {
        //获取更新时间
        this.calender.month_calender_start = "".concat((0, _moment.default)(info.monthStart).format('YYYY/MM/DD'));
        this.calender.month_calender_end = "".concat((0, _moment.default)(info.monthEnd).format('YYYY/MM/DD'));
        this.time_str = "".concat((0, _moment.default)(info.monthStart).format('YYYY-MM-DD'), " - ").concat((0, _moment.default)(info.monthEnd).format('YYYY-MM-DD'));
        this.requestMonthData(this.time_str);
      } else if (info.type === 'chooseDay') {
        this.calender.all_calender_start = "".concat((0, _moment.default)(info.dayStartTime).format('YYYY/MM/DD'));
        this.calender.all_calender_end = "".concat((0, _moment.default)(info.dayEndTime).format('YYYY/MM/DD'));
        this.time_str = "".concat((0, _moment.default)(info.dayStartTime).format('YYYY-MM-DD'), " - ").concat((0, _moment.default)(info.dayEndTime).format('YYYY-MM-DD'));
        this.requestAllData(this.time_str, this.time_str, 1);
      }
    },

    changeSwiper: function changeSwiper(e) {
      this.swiper.currentIndex = e.detail.current;
    },
    swiperTo: function swiperTo(num) {
      this.swiper.currentIndex = num;
    },

    //首次进页面获取时间段
    getTime: function getTime(param) {var isFirst = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (param === 'week') {
        this.calender.week_calender_start = "".concat(new Date().getFullYear(), "/").concat(new Date().getMonth() + 1, "/").concat(new Date().getDate() - new Date().getDay() - 6);
        this.calender.week_calender_end = "".concat(new Date().getFullYear(), "/").concat(new Date().getMonth() + 1, "/").concat(new Date().getDate() - new Date().getDay());
        return "".concat(new Date().getFullYear(), "-").concat(new Date().getMonth() + 1, "-").concat(new Date().getDate() - new Date().getDay() - 6, " - ").concat(new Date().getFullYear(), "-").concat(new Date().getMonth() + 1, "-").concat(new Date().getDate() - new Date().getDay());
      }
      if (param === 'month') {
        var d = new Date();
        var now_d = "".concat(d.getFullYear(), "-").concat(d.getMonth() + 1, "-1");
        var now_d_str = d.getTime();
        var last_month_last_date_str = now_d_str - d.getDate() * 24 * 60 * 60 * 1000;
        var next_month_first_str = '';
        if (d.getMonth() < 11) {
          next_month_first_str = "".concat(d.getFullYear(), "/").concat(d.getMonth() + 2, "/1");
        } else if (d.getMonth() == 11) {
          next_month_first_str = "".concat(d.getFullYear() + 1, "/1/1");
        }
        var now_month_last_date_str = new Date(next_month_first_str).getTime() - 24 * 60 * 60 * 1000;
        if (isFirst) {
          this.calender.month_calender_start = last_month_last_date_str;
          this.calender.month_calender_end = last_month_last_date_str;
          return "".concat(d.getFullYear(), "-").concat(d.getMonth(), "-1 - ").concat(d.getFullYear(), "-").concat(d.getMonth(), "-").concat(new Date(last_month_last_date_str).getDate());
        } else {
          this.calender.month_calender_start = now_d_str;
          this.calender.month_calender_end = now_d_str;
          return "".concat(d.getFullYear(), "-").concat(d.getMonth() + 1, "-1 - ").concat(d.getFullYear(), "-").concat(d.getMonth() + 1, "-").concat(new Date(now_month_last_date_str).getDate());
        }
      }
    },

    // 发送周请求
    requestWeekData: function requestWeekData(chooseWeek) {var _this = this;
      var data_str = chooseWeek || this.getTime('week');
      var params = {
        date: data_str || "2019-11-01 - 2019-11-05" };

      var layoutDate = {
        type: 1,
        date: data_str || "2019-11-01 - 2019-11-05" };

      var storeDate = {
        type: 2,
        date: data_str || "2019-11-01 - 2019-11-05" };

      Promise.all([
      new _StatisticsNet.CommissionDealTrend(params).send(), // 交易走势
      new _StatisticsNet.CustDataInfo(params).send(), //客户转化对比
      new _StatisticsNet.CustStatisticInfo(params).send(), // 客户转化率
      new _StatisticsNet.SellProportion(layoutDate).send(), //户型销售占比
      new _StatisticsNet.SellProportion(storeDate).send(), //门店销售占比
      new _StatisticsNet.GetDptsCustRanking(params).send()]).

      then(function (res) {
        var data = {
          trend: null, compare: null, layout: null, shop: null, percentage: null, timer_picker: 'week', dataList: null };

        if (res[0].errCode === 200) // 交易走势
          data.trend = _changeData.week_month_data_change.changeAllDealTrends(res[0].data);
        if (res[1].errCode === 200) //客户转化对比
          data.compare = _changeData.week_month_data_change.changeCustDataInfo(res[1].data);
        //data.compare= changeCustDataInfo()
        if (res[2].errCode === 200) //客户转化率
          data.percentage = _changeData.week_month_data_change.custStatisticInfo(res[2].data);
        if (res[3].errCode === 200) //户型销售对比
          data.layout = _changeData.week_month_data_change.changeSellProportionLayout(res[3].data);
        if (res[4].errCode === 200) //门店销售对比
          data.shop = _changeData.week_month_data_change.changeSellProportionLayout(res[4].data);
        if (res[5].errCode === 200) //门店销售对比
          data.dataList = res[5].data.dataList;
        _this.weekData = data;
      });
    },

    // 发送月请求
    requestMonthData: function requestMonthData(chooseMonth, isFirst) {var _this2 = this;
      var data_str = chooseMonth || this.getTime('month', isFirst);
      var params = {
        date: data_str || "2019-11-01 - 2019-11-05" };

      var layoutDate = {
        type: 1,
        date: data_str || "2019-11-01 - 2019-11-05" };

      var storeDate = {
        type: 2,
        date: data_str || "2019-11-01 - 2019-11-05" };

      Promise.all([
      new _StatisticsNet.CommissionDealTrend(params).send(), // 交易走势
      new _StatisticsNet.CustDataInfo(params).send(), //客户转化对比
      new _StatisticsNet.CustStatisticInfo(params).send(), // 客户转化率
      new _StatisticsNet.SellProportion(layoutDate).send(), //户型销售占比
      new _StatisticsNet.SellProportion(storeDate).send(), //门店销售占比
      new _StatisticsNet.GetDptsCustRanking(params).send()]).

      then(function (res) {
        var data = {
          trend: null, compare: null, layout: null, shop: null, percentage: null, timer_picker: 'month', dataList: null };

        if (res[0].errCode === 200) // 交易走势
          data.trend = _changeData.week_month_data_change.changeAllDealTrends(res[0].data);
        if (res[1].errCode === 200) //客户转化对比
          data.compare = _changeData.week_month_data_change.changeCustDataInfo(res[1].data);
        if (res[2].errCode === 200) //客户转化率
          data.percentage = _changeData.week_month_data_change.custStatisticInfo(res[2].data);
        if (res[3].errCode === 200) //户型销售对比
          data.layout = _changeData.week_month_data_change.changeSellProportionLayout(res[3].data);
        if (res[4].errCode === 200) //门店销售对比
          data.shop = _changeData.week_month_data_change.changeSellProportionLayout(res[4].data);
        if (res[5].errCode === 200) //门店销售对比
          data.dataList = res[5].data.dataList;
        _this2.monthData = data;
      });
    },


    //总数据请求
    requestAllData: function requestAllData(initDays, chooseDays, compare_type) {var _this3 = this;
      var trend = {};
      var compare = {};
      if (chooseDays) {
        trend = { date: chooseDays };
        compare = {
          date: chooseDays,
          type: 1 };

      } else if (!chooseDays) {
        trend = { source: 0 };
        compare = {
          type: 0 };

      }
      var params = {
        date: chooseDays || initDays };

      var layoutDate = {
        type: 1,
        date: chooseDays || initDays };

      var storeDate = {
        type: 2,
        date: chooseDays || initDays };

      Promise.all([
      new _StatisticsNet.CommissionDealTrend(trend).send(), //首次请求
      new _StatisticsNet.CustDataInfo(compare).send(), //客户转化对比
      new _StatisticsNet.CustStatisticInfo(params).send(), // 客户转化率
      new _StatisticsNet.SellProportion(layoutDate).send(), //户型销售占比
      new _StatisticsNet.SellProportion(storeDate).send(), //门店销售占比
      new _StatisticsNet.GetDptsCustRanking(params).send()]).

      then(function (res) {
        var data = {
          trend: null, compare: null, layout: null, shop: null, percentage: null, timer_picker: 'year', dataList: null };


        if (res[0].errCode === 200) //交易走势
          data.trend = _changeData.week_month_data_change.changeAllDealTrends(res[0].data);
        if (res[1].errCode === 200) //客户转化对比
          data.compare = _changeData.week_month_data_change.changeCustDataInfo(res[1].data);
        if (res[2].errCode === 200) //客户转化率
          data.percentage = _changeData.week_month_data_change.custStatisticInfo(res[2].data);
        if (res[3].errCode === 200) //户型销售对比
          data.layout = _changeData.week_month_data_change.changeSellProportionLayout(res[3].data);
        if (res[4].errCode === 200) //门店销售对比
          data.shop = _changeData.week_month_data_change.changeSellProportionLayout(res[4].data);
        if (res[5].errCode === 200) //门店销售排行
          data.dataList = res[5].data.dataList;
        _this3.allData = data;
      });
    },

    // 初始化总请求
    initRequestAll: function initRequestAll() {var _this4 = this;
      new _StatisticsNet.CustReportSmallTime().send().
      then(function (res) {
        _this4.requestWeekData();
        var d = new Date();
        var start_time = '';
        if (res.data.samllTime != undefined) {
          var samllTime = res.data.samllTime.split(' ')[0].replace(/-/g, "/");
          start_time = res.data.samllTime.split(' ')[0];
          _this4.init_time = new Date(samllTime).getTime();
          _this4.calender.all_calender_start = samllTime;
          _this4.requestMonthData('', false);
        } else {
          _this4.init_time = new Date().getTime() - (new Date().getDate() - 1) * 24 * 60 * 60 * 1000;
          start_time = "".concat(d.getFullYear(), "-").concat(d.getMonth(), "-").concat(d.getDate());
          _this4.calender.all_calender_start = "".concat(d.getFullYear(), "/").concat(d.getMonth(), "/").concat(d.getDate());
          _this4.requestMonthData();
        }
        _this4.calender.all_calender_end = "".concat(d.getFullYear(), "/").concat(d.getMonth() + 1, "/").concat(d.getDate());
        var now_d = "".concat(d.getFullYear(), "-").concat(d.getMonth() + 1, "-").concat(d.getDate());
        var choose = "".concat(start_time, " - ").concat(now_d);
        _this4.requestAllData(choose);
      });
    } },

  onLoad: function onLoad() {
    //动态设置标题
    uni.setNavigationBarTitle({
      title: this.title });

    // 发送请求
    this.initRequestAll();

    // 监听
    new _Notification.Notification().addObserver(this, "StatisticsTimeChange", _Notify.Notify.StatisticsTimeChange.Name);
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 250:
/*!*************************************************************************************************!*\
  !*** D:/小黑项目/yx_uniapp/pagesStatistics/analysis/analysis.vue?vue&type=style&index=0&lang=less& ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_analysis_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-oneOf-1-0!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-1!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--10-oneOf-1-2!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--10-oneOf-1-3!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-4!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-5!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../软件/老版本HBuilderX/工具/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./analysis.vue?vue&type=style&index=0&lang=less& */ 251);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_analysis_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_analysis_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_analysis_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_analysis_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_analysis_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 251:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-1!./node_modules/css-loader??ref--10-oneOf-1-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--10-oneOf-1-3!./node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/小黑项目/yx_uniapp/pagesStatistics/analysis/analysis.vue?vue&type=style&index=0&lang=less& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},[[240,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pagesStatistics/analysis/analysis.js.map
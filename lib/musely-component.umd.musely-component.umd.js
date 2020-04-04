(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["musely-component"] = factory();
	else
		root["musely-component"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return ((typeof self !== 'undefined' ? self : this)["webpackJsonpmusely_component"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpmusely_component"] || []).push([[1],{

/***/ "c542":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.for-each.js
var es_array_for_each = __webpack_require__("4160");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"ef4f2bb0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/container/src/index.vue?vue&type=template&id=916601b6&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mu__container",style:({ background: _vm.bgColor, paddingBottom: _vm.paddingBottom, width: _vm.width })})}
var staticRenderFns = []


// CONCATENATED MODULE: ./packages/container/src/index.vue?vue&type=template&id=916601b6&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/container/src/index.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var srcvue_type_script_lang_js_ = ({
  name: 'MuContainer',
  props: {
    proportion: {
      type: Number,
      "default": 1
    },
    // h : w
    bgColor: {
      type: String,
      "default": '#b4bccc'
    },
    width: {
      type: String,
      "default": '100%'
    },
    height: {
      type: [String, Boolean],
      "default": false
    }
  },
  data: function data() {
    return {
      paddingBottom: this.height || "".concat(this.proportion * 100, "%")
    };
  }
});
// CONCATENATED MODULE: ./packages/container/src/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var container_srcvue_type_script_lang_js_ = (srcvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./packages/container/src/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  container_srcvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var src = (component.exports);
// CONCATENATED MODULE: ./packages/container/index.js


/*
 * @Author: Victor wang
 * @Date: 2020-04-03 01:45:15
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-03 02:32:37
 * @Description:
 */


src.install = function (Vue) {
  Vue.component(src.name, src);
};

/* harmony default export */ var container = (src);
// CONCATENATED MODULE: ./packages/index.ts




/*
 * @Author: Victor wang
 * @Date: 2020-03-31 16:27:01
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-03 15:06:49
 * @Description:
 */

var components = [container];

var install = function install(Vue, opts) {
  if (opts === void 0) {
    opts = {};
  }

  components.forEach(function (component) {
    Vue.component(component.name, component);
  });
  Vue.prototype.$MUSELY = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000
  };
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

/* harmony default export */ var packages_0 = __webpack_exports__["a"] = ({
  install: install,
  Container: container
});

/***/ })

},[["fb15",2,0]]]);
});
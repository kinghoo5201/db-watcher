(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst util_1 = __webpack_require__(/*! ./util */ \"./src/util.ts\");\r\nclass DbWatcher {\r\n    constructor() {\r\n        /** 设备信息 */\r\n        this.DEVICE_INFO = util_1.getDevice();\r\n        /** 上报地址 */\r\n        this.reporterUrl = 'http://localhost:2048/cxxc';\r\n        /** 通用信息生成 */\r\n        this.setCommonProperty = (monitorType) => {\r\n            const result = {\r\n                time: Date.now(),\r\n                browserName: this.DEVICE_INFO.browserName,\r\n                browserVersion: this.DEVICE_INFO.browserVersion,\r\n                deviceName: this.DEVICE_INFO.deviceName,\r\n                monitorType\r\n            };\r\n            return result;\r\n        };\r\n        /** 默认上报请求 */\r\n        this.defaultReporter = (param) => {\r\n            const img = new Image();\r\n            const paramstr = util_1.restFulParam(param);\r\n            img.src = `${this.reporterUrl}${paramstr ? '?' : ''}${paramstr}`;\r\n            function loadFn() {\r\n                removeEvt();\r\n                img.remove();\r\n            }\r\n            function errFn() {\r\n                window.console.log('上报失败：：', param);\r\n                removeEvt();\r\n                img.remove();\r\n            }\r\n            function removeEvt() {\r\n                img.removeEventListener('load', loadFn);\r\n                img.removeEventListener('abort', errFn);\r\n                img.removeEventListener('cancel', errFn);\r\n                img.removeEventListener('error', errFn);\r\n            }\r\n            img.addEventListener('load', loadFn);\r\n            img.addEventListener('abort', errFn);\r\n            img.addEventListener('cancel', errFn);\r\n            img.addEventListener('error', errFn);\r\n        };\r\n    }\r\n}\r\nexports.DbWatcher = DbWatcher;\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\r\n    result[\"default\"] = mod;\r\n    return result;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst _ = __importStar(__webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module 'lodash'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));\r\n/** 获取设备信息 */\r\nfunction getDevice() {\r\n    const device = {};\r\n    const ua = navigator.userAgent;\r\n    const android = ua.match(/(Android);?[\\s\\/]+([\\d.]+)?/);\r\n    const ipad = ua.match(/(iPad).*OS\\s([\\d_]+)/);\r\n    const ipod = ua.match(/(iPod)(.*OS\\s([\\d_]+))?/);\r\n    const iphone = !ipad && ua.match(/(iPhone\\sOS)\\s([\\d_]+)/);\r\n    const mobileInfo = ua.match(/Android\\s[\\S\\s]+Build\\//);\r\n    device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;\r\n    device.isWeixin = /MicroMessenger/i.test(ua);\r\n    device.os = 'web';\r\n    device.deviceName = 'PC';\r\n    // Android\r\n    if (android) {\r\n        device.os = 'android';\r\n        device.osVersion = android[2];\r\n        device.android = true;\r\n        device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;\r\n    }\r\n    if (ipad || iphone || ipod) {\r\n        device.os = 'ios';\r\n        device.ios = true;\r\n    }\r\n    // iOS\r\n    if (iphone && !ipod) {\r\n        device.osVersion = iphone[2].replace(/_/g, '.');\r\n        device.iphone = true;\r\n    }\r\n    if (ipad) {\r\n        device.osVersion = ipad[2].replace(/_/g, '.');\r\n        device.ipad = true;\r\n    }\r\n    if (ipod) {\r\n        device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;\r\n        device.iphone = true;\r\n    }\r\n    // iOS 8+ changed UA\r\n    if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {\r\n        if (device.osVersion.split('.')[0] === '10') {\r\n            device.osVersion = ua\r\n                .toLowerCase()\r\n                .split('version/')[1]\r\n                .split(' ')[0];\r\n        }\r\n    }\r\n    // 如果是ios, deviceName 就设置为iphone，根据分辨率区别型号\r\n    if (device.iphone) {\r\n        device.deviceName = 'iphone';\r\n        const screenWidth = window.screen.width;\r\n        const screenHeight = window.screen.height;\r\n        if (screenWidth === 320 && screenHeight === 480) {\r\n            device.deviceName = 'iphone 4';\r\n        }\r\n        else if (screenWidth === 320 && screenHeight === 568) {\r\n            device.deviceName = 'iphone 5/SE';\r\n        }\r\n        else if (screenWidth === 375 && screenHeight === 667) {\r\n            device.deviceName = 'iphone 6/7/8';\r\n        }\r\n        else if (screenWidth === 414 && screenHeight === 736) {\r\n            device.deviceName = 'iphone 6/7/8 Plus';\r\n        }\r\n        else if (screenWidth === 375 && screenHeight === 812) {\r\n            device.deviceName = 'iphone X/S/Max';\r\n        }\r\n    }\r\n    else if (device.ipad) {\r\n        device.deviceName = 'ipad';\r\n    }\r\n    else if (mobileInfo) {\r\n        const info = mobileInfo[0];\r\n        const deviceName = info.split(';')[1].replace(/Build\\//g, '');\r\n        device.deviceName = deviceName.replace(/(^\\s*)|(\\s*$)/g, '');\r\n    }\r\n    // 浏览器模式, 获取浏览器信息\r\n    // TODO 需要补充更多的浏览器类型进来\r\n    if (ua.indexOf('Mobile') == -1) {\r\n        const agent = navigator.userAgent.toLowerCase();\r\n        const regStr_ie = /msie [\\d.]+;/gi;\r\n        const regStr_ff = /firefox\\/[\\d.]+/gi;\r\n        const regStr_chrome = /chrome\\/[\\d.]+/gi;\r\n        const regStr_saf = /safari\\/[\\d.]+/gi;\r\n        device.browserName = '未知';\r\n        //IE\r\n        if (agent.indexOf('msie') > 0) {\r\n            const browserInfo = agent.match(regStr_ie)[0];\r\n            device.browserName = browserInfo.split('/')[0];\r\n            device.browserVersion = browserInfo.split('/')[1];\r\n        }\r\n        //firefox\r\n        if (agent.indexOf('firefox') > 0) {\r\n            const browserInfo = agent.match(regStr_ff)[0];\r\n            device.browserName = browserInfo.split('/')[0];\r\n            device.browserVersion = browserInfo.split('/')[1];\r\n        }\r\n        //Safari\r\n        if (agent.indexOf('safari') > 0 && agent.indexOf('chrome') < 0) {\r\n            const browserInfo = agent.match(regStr_saf)[0];\r\n            device.browserName = browserInfo.split('/')[0];\r\n            device.browserVersion = browserInfo.split('/')[1];\r\n        }\r\n        //Chrome\r\n        if (agent.indexOf('chrome') > 0) {\r\n            const browserInfo = agent.match(regStr_chrome)[0];\r\n            device.browserName = browserInfo.split('/')[0];\r\n            device.browserVersion = browserInfo.split('/')[1];\r\n        }\r\n    }\r\n    // Webview\r\n    device.webView =\r\n        (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);\r\n    // Export object\r\n    return device;\r\n}\r\nexports.getDevice = getDevice;\r\nfunction restFulParam(param, sep = '&') {\r\n    if (_.isObject(param) && !_.isEmpty(param)) {\r\n        const parArr = [];\r\n        Object.keys(param).forEach(key => {\r\n            parArr.push(`${key}=${param[key]}`);\r\n        });\r\n        return parArr.join(sep);\r\n    }\r\n    return '';\r\n}\r\nexports.restFulParam = restFulParam;\r\n\n\n//# sourceURL=webpack:///./src/util.ts?");

/***/ })

/******/ });
});
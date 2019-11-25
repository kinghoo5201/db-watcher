import * as _ from 'lodash';
import { def } from './types';

/** 获取设备信息 */
export function getDevice() {
  const device: def.commonInfo.IDeviceInfo = {};
  const ua = navigator.userAgent;
  const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
  const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  const iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
  const mobileInfo = ua.match(/Android\s[\S\s]+Build\//);
  device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;
  device.isWeixin = /MicroMessenger/i.test(ua);
  device.os = 'web';
  device.deviceName = 'PC';
  // Android
  if (android) {
    device.os = 'android';
    device.osVersion = android[2];
    device.android = true;
    device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
  }
  if (ipad || iphone || ipod) {
    device.os = 'ios';
    device.ios = true;
  }
  // iOS
  if (iphone && !ipod) {
    device.osVersion = iphone[2].replace(/_/g, '.');
    device.iphone = true;
  }
  if (ipad) {
    device.osVersion = ipad[2].replace(/_/g, '.');
    device.ipad = true;
  }
  if (ipod) {
    device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
    device.iphone = true;
  }
  // iOS 8+ changed UA
  if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
    if (device.osVersion.split('.')[0] === '10') {
      device.osVersion = ua
        .toLowerCase()
        .split('version/')[1]
        .split(' ')[0];
    }
  }

  // 如果是ios, deviceName 就设置为iphone，根据分辨率区别型号
  if (device.iphone) {
    device.deviceName = 'iphone';
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    if (screenWidth === 320 && screenHeight === 480) {
      device.deviceName = 'iphone 4';
    } else if (screenWidth === 320 && screenHeight === 568) {
      device.deviceName = 'iphone 5/SE';
    } else if (screenWidth === 375 && screenHeight === 667) {
      device.deviceName = 'iphone 6/7/8';
    } else if (screenWidth === 414 && screenHeight === 736) {
      device.deviceName = 'iphone 6/7/8 Plus';
    } else if (screenWidth === 375 && screenHeight === 812) {
      device.deviceName = 'iphone X/S/Max';
    }
  } else if (device.ipad) {
    device.deviceName = 'ipad';
  } else if (mobileInfo) {
    const info = mobileInfo[0];
    const deviceName = info.split(';')[1].replace(/Build\//g, '');
    device.deviceName = deviceName.replace(/(^\s*)|(\s*$)/g, '');
  }
  // 浏览器模式, 获取浏览器信息
  // TODO 需要补充更多的浏览器类型进来
  if (ua.indexOf('Mobile') == -1) {
    const agent = navigator.userAgent.toLowerCase();
    const regStr_ie = /msie [\d.]+;/gi;
    const regStr_ff = /firefox\/[\d.]+/gi;
    const regStr_chrome = /chrome\/[\d.]+/gi;
    const regStr_saf = /safari\/[\d.]+/gi;

    device.browserName = '未知';
    //IE
    if (agent.indexOf('msie') > 0) {
      const browserInfo = agent.match(regStr_ie)[0];
      device.browserName = browserInfo.split('/')[0];
      device.browserVersion = browserInfo.split('/')[1];
    }
    //firefox
    if (agent.indexOf('firefox') > 0) {
      const browserInfo = agent.match(regStr_ff)[0];
      device.browserName = browserInfo.split('/')[0];
      device.browserVersion = browserInfo.split('/')[1];
    }
    //Safari
    if (agent.indexOf('safari') > 0 && agent.indexOf('chrome') < 0) {
      const browserInfo = agent.match(regStr_saf)[0];
      device.browserName = browserInfo.split('/')[0];
      device.browserVersion = browserInfo.split('/')[1];
    }
    //Chrome
    if (agent.indexOf('chrome') > 0) {
      const browserInfo = agent.match(regStr_chrome)[0];
      device.browserName = browserInfo.split('/')[0];
      device.browserVersion = browserInfo.split('/')[1];
    }
  }
  // Webview
  device.webView =
    (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);

  // Export object
  return device;
}

export function restFulParam(param: any, sep: string = '&'): string {
  if (_.isObject(param) && !_.isEmpty(param)) {
    const parArr: string[] = [];
    Object.keys(param).forEach(key => {
      parArr.push(`${key}=${param[key]}`);
    });
    return parArr.join(sep);
  }
  return '';
}

/** 用户行为监控 */
export function recordBehavior() {
  // 记录用户点击元素的行为数据
  document.onclick = function (e:any) {
    var className = "";
    var placeholder = "";
    var inputValue = "";
    var tagName = e.target.tagName;
    var innerText = "";
    if (e.target.tagName != "svg" && e.target.tagName != "use") {
      className = e.target.className;
      placeholder = e.target.placeholder || "";
      inputValue = e.target.value || "";
      innerText = e.target.innerText ? e.target.innerText.replace(/\s*/g, "") : "";
      // 如果点击的内容过长，就截取上传
      if (innerText.length > 200) innerText = innerText.substring(0, 100) + "... ..." + innerText.substring(innerText.length - 99, innerText.length - 1);
      innerText = innerText.replace(/\s/g, '');
    }
    console.log('e',e);
    console.log({ type:"click", className, placeholder, inputValue, tagName, innerText});
    // return { type:"click", className, placeholder, inputValue, tagName, innerText};
  }
}


function siftAndMakeUpMessage(infoType, origin_errorMsg, origin_lineNumber, origin_columnNumber, origin_errorObj) {
  // 记录js错误前，检查一下url记录是否变化
  // checkUrlChange();
  var errorMsg = origin_errorMsg ? origin_errorMsg : '';
  var errorObj = origin_errorObj ? origin_errorObj : '';
  var errorType = "";
  if (errorMsg) {
    if (typeof errorObj === 'string') {
      errorType = errorObj.split(": ")[0].replace('"', "");
    } else {
      var errorStackStr = JSON.stringify(errorObj)
      errorType = errorStackStr.split(": ")[0].replace('"', "");
    }
  }

  window.console.log("error",infoType, errorType + ": " + errorMsg,);
  // var javaScriptErrorInfo = new JavaScriptErrorInfo(JS_ERROR, infoType, errorType + ": " + errorMsg, errorObj);
  // javaScriptErrorInfo.handleLogInfo(JS_ERROR, javaScriptErrorInfo);
};
/**
 * 页面JS错误监控
 */
export function recordJavaScriptError() {
  // 重写console.error, 可以捕获更全面的报错信息
  var oldError = console.error;
  console.error = function (tempErrorMsg) {
    var errorMsg = (arguments[0] && arguments[0].message) || tempErrorMsg;
    var lineNumber = 0;
    var columnNumber = 0;
    var errorObj = arguments[0] && arguments[0].stack;
    if (!errorObj) {
      siftAndMakeUpMessage("console_error", errorMsg, lineNumber, columnNumber, "CustomizeError: " + errorMsg);
    } else {
      siftAndMakeUpMessage("console_error", errorMsg, lineNumber, columnNumber, errorObj);
    }
    return oldError.apply(console, arguments);
  };
  // 重写 onerror 进行jsError的监听
  window.onerror = function(errorMsg, url, lineNumber, columnNumber, errorObj) {
    // jsMonitorStarted = true;
    var errorStack = errorObj ? errorObj.stack : null;
    siftAndMakeUpMessage("on_error", errorMsg, lineNumber, columnNumber, errorStack);
  };
  window.onunhandledrejection = function(e) {
    var errorMsg = "";
    var errorStack = "";
    if (typeof e.reason === "object") {
      errorMsg = e.reason.message;
      errorStack = e.reason.stack;
    } else {
      errorMsg = e.reason;
      errorStack = "";
    }
    siftAndMakeUpMessage("on_error", errorMsg, WEB_LOCATION, 0, 0, "UncaughtInPromiseError: " + errorStack);
  }
};

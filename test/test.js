console.log('test');
window.onerror = function (msg, url, row, col, error) {
  console.log('我知道错误了');
  console.log({
    msg,  url,  row, col, error
  })
  return true; // 注意，在返回 true 的时候，异常才不会继续向上抛出error;
};
// // 设置日志对象类的通用属性
// function setCommonProperty() {
//   this.happenTime = new Date().getTime(); // 日志发生时间
//   this.webMonitorId = WEB_MONITOR_ID;     // 用于区分应用的唯一标识（一个项目对应一个）
//   this.simpleUrl =  window.location.href.split('?')[0].replace('#', ''); // 页面的url
//   this.customerKey = utils.getCustomerKey(); // 用于区分用户，所对应唯一的标识，清理本地数据后失效
//   this.pageKey = utils.getPageKey();  // 用于区分页面，所对应唯一的标识，每个新页面对应一个值
//   this.deviceName = DEVICE_INFO.deviceName;
//   this.os = DEVICE_INFO.os + (DEVICE_INFO.osVersion ? " " + DEVICE_INFO.osVersion : "");
//   this.browserName = DEVICE_INFO.browserName;
//   this.browserVersion = DEVICE_INFO.browserVersion;
//   // TODO 位置信息, 待处理
//   this.monitorIp = "";  // 用户的IP地址
//   this.country = "china";  // 用户所在国家
//   this.province = "";  // 用户所在省份
//   this.city = "";  // 用户所在城市
//   // 用户自定义信息， 由开发者主动传入， 便于对线上进行准确定位
//   this.userId = USER_INFO.userId;
//   this.firstUserParam = USER_INFO.firstUserParam;
//   this.secondUserParam = USER_INFO.secondUserParam;
// }

// // JS错误日志，继承于日志基类MonitorBaseInfo
// function JavaScriptErrorInfo(uploadType, errorMsg, errorStack) {
//   setCommonProperty.apply(this);
//   this.uploadType = uploadType;
//   this.errorMessage = encodeURIComponent(errorMsg);
//   this.errorStack = errorStack;
//   this.browserInfo = BROWSER_INFO;
// }

// JavaScriptErrorInfo.prototype = new MonitorBaseInfo();

// /**
//  * 页面JS错误监控
//  */
// function recordJavaScriptError() {
//   // 重写console.error, 可以捕获更全面的报错信息
//   var oldError = console.error;
//   console.error = function () {
//     // arguments的长度为2时，才是error上报的时机
//     // if (arguments.length < 2) return;
//     var errorMsg = arguments[0] && arguments[0].message;
//     var url = WEB_LOCATION;
//     var lineNumber = 0;
//     var columnNumber = 0;
//     var errorObj = arguments[0] && arguments[0].stack;
//     if (!errorObj) errorObj = arguments[0];
//     // 如果onerror重写成功，就无需在这里进行上报了
//     !jsMonitorStarted && siftAndMakeUpMessage(errorMsg, url, lineNumber, columnNumber, errorObj);
//     return oldError.apply(console, arguments);
//   };
//   // 重写 onerror 进行jsError的监听
//   window.onerror = function(errorMsg, url, lineNumber, columnNumber, errorObj)
//   {
//     jsMonitorStarted = true;
//     var errorStack = errorObj ? errorObj.stack : null;
//     siftAndMakeUpMessage(errorMsg, url, lineNumber, columnNumber, errorStack);
//   };

//   function siftAndMakeUpMessage(origin_errorMsg, origin_url, origin_lineNumber, origin_columnNumber, origin_errorObj) {
//     var errorMsg = origin_errorMsg ? origin_errorMsg : '';
//     var errorObj = origin_errorObj ? origin_errorObj : '';
//     var errorType = "";
//     if (errorMsg) {
//       var errorStackStr = JSON.stringify(errorObj)
//       errorType = errorStackStr.split(": ")[0].replace('"', "");
//     }
//     var javaScriptErrorInfo = new JavaScriptErrorInfo(JS_ERROR, errorType + ": " + errorMsg, errorObj);
//     javaScriptErrorInfo.handleLogInfo(JS_ERROR, javaScriptErrorInfo);
//   };
// };

// recordJavaScriptError();

// /**
//  * 添加一个定时器，进行数据的上传
//  * 2秒钟进行一次URL是否变化的检测
//  * 10秒钟进行一次数据的检查并上传
//  */
// var timeCount = 0;
// setInterval(function () {
//   checkUrlChange();
//   // 循环5后次进行一次上传
//   if (timeCount >= 25) {
//     // 如果是本地的localhost, 就忽略，不进行上传

//     var logInfo = (localStorage[ELE_BEHAVIOR] || "") +
//       (localStorage[JS_ERROR] || "") +
//       (localStorage[HTTP_LOG] || "") +
//       (localStorage[SCREEN_SHOT] || "") +
//       (localStorage[CUSTOMER_PV] || "") +
//       (localStorage[LOAD_PAGE] || "") +
//       (localStorage[RESOURCE_LOAD] || "");

//     if (logInfo) {
//       localStorage[ELE_BEHAVIOR] = "";
//       localStorage[JS_ERROR] = "";
//       localStorage[HTTP_LOG] = "";
//       localStorage[SCREEN_SHOT] = "";
//       localStorage[CUSTOMER_PV] = "";
//       localStorage[LOAD_PAGE] = "";
//       localStorage[RESOURCE_LOAD] = "";
//       utils.ajax("POST", HTTP_UPLOAD_LOG_INFO, {logInfo: logInfo}, function (res) {}, function () {})
//     }
//     timeCount = 0;
//   }
//   timeCount ++;
// }, 200);

// /**
//  *
//  * @param method  请求类型(大写)  GET/POST
//  * @param url     请求URL
//  * @param param   请求参数
//  * @param successCallback  成功回调方法
//  * @param failCallback   失败回调方法
//  */
// this.ajax = function(method, url, param, successCallback, failCallback) {
//   var xmlHttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
//   xmlHttp.open(method, url, true);
//   xmlHttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
//   xmlHttp.onreadystatechange = function () {
//     if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
//       var res = JSON.parse(xmlHttp.responseText);
//       typeof successCallback == 'function' && successCallback(res);
//     } else {
//       typeof failCallback == 'function' && failCallback();
//     }
//   };
//   xmlHttp.send("data=" + JSON.stringify(param));
// }
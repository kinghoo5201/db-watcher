/**
 * @description 监听xhr对象，将结果通过回调函数透传出去
 */
import * as _ from 'lodash';
import { ajaxEventType, monitorType } from './baseInfo';
import { DEVICE_INFO } from './util';
import { def } from './types';

export default function(callback?: def.fn.IEventCallback) {
  const oldXHR = XMLHttpRequest;
  /** 时间事件数据记录 */
  let timeRecordArray: def.modules.request.ITimeRecord[] = [];

  function newXHR(): XMLHttpRequest {
    const realXHR = new oldXHR();
    const oldOpen = realXHR.open;
    realXHR.open = function(...args) {
      this.requestMethod = args[0];
      oldOpen.call(this, ...args);
    };
    const oldSend = realXHR.send;
    realXHR.send = function(body) {
      this.requestParams = body ? body.toString() : '';
      oldSend.call(realXHR, body);
    };
    realXHR.onloadstart = function() {
      const loadEvent = new CustomEvent(ajaxEventType.ajaxLoadStart, {
        /** 如果用箭头函数，这个this就需要具名指向realXHR */
        detail: this
      });
      window.dispatchEvent(loadEvent);
    };
    realXHR.onloadend = function() {
      const endEvent = new CustomEvent(ajaxEventType.ajaxLoadEnd, {
        detail: this
      });
      window.dispatchEvent(endEvent);
    };
    realXHR.onerror = function() {
      const errEvent = new CustomEvent(ajaxEventType.ajaxLoadError, {
        detail: this
      });
      window.dispatchEvent(errEvent);
    };
    return realXHR;
  }

  function handleHttpResult(timeRecord: def.modules.request.ITimeRecord) {
    const result: def.commonInfo.ICommonPram = {
      time: timeRecord.timestamp,
      monitorType: monitorType.requestWatcher,
      requestMethod: (timeRecord as any).event.detail.requestMethod,
      deviceName: DEVICE_INFO.deviceName,
      browserName: DEVICE_INFO.browserName,
      browserVersion: DEVICE_INFO.browserVersion,
      pageUrl: timeRecord.pageUrl,
      requestUrl: timeRecord.event.detail.responseURL,
      requestParams: (timeRecord.event.detail as any).requestParams,
      requestCode: timeRecord.event.detail.status,
      errorType:
        timeRecord.event.detail.status === 200
          ? ''
          : 'TypeError: ' + timeRecord.event.detail.statusText,
      errorMessage:
        timeRecord.event.detail.status === 200
          ? ''
          : timeRecord.event.detail.statusText
    };
    callback && callback(result);
  }

  (window as any).XMLHttpRequest = newXHR;
  window.addEventListener(ajaxEventType.ajaxLoadStart, function(
    e: def.modules.request.IEventWithDetail<XMLHttpRequest>
  ) {
    timeRecordArray.push({
      timestamp: Date.now(),
      event: e,
      pageUrl: window.location.href,
      uploadFlag: false
    });
  });
  window.addEventListener(ajaxEventType.ajaxLoadEnd, function() {
    timeRecordArray.forEach(timeRecord => {
      if (timeRecord.uploadFlag) {
        return;
      }
      if (timeRecord.event.detail.status > 0) {
        timeRecord.uploadFlag = true;
        handleHttpResult(timeRecord);
      }
    });
    /** 清除已经处理的数据 */
    timeRecordArray = timeRecordArray.filter(item => !item.uploadFlag);
  });

  /** 处理fetch */
  if ('fetch' in window) {
    const oldFetch = window.fetch;
    window.fetch = function(
      input: RequestInfo,
      init?: RequestInit
    ): Promise<Response> {
      let opt: RequestInit = _.isString(input) ? init : input;
      let requestUrl = _.isString(input) ? input : input.url;
      const result: def.commonInfo.ICommonPram = {
        time: Date.now(),
        monitorType: monitorType.requestWatcher,
        browserName: DEVICE_INFO.browserName,
        browserVersion: DEVICE_INFO.browserVersion,
        deviceName: DEVICE_INFO.deviceName,
        pageUrl: window.location.href,
        requestUrl,
        requestMethod: _.get(opt, 'method', 'GET'),
        requestParams: _.get(opt, 'body', '').toString()
      };
      return new Promise(function(resolve, reject) {
        return oldFetch(input, init)
          .then(res => {
            result.requestCode = res.status;
            result.errorType =
              res.status === 200 ? '' : 'TypeError: ' + res.statusText;
            result.errorMessage = res.status === 200 ? '' : res.statusText;
            callback && callback(result);
            resolve(res);
          })
          .catch(e => {
            result.requestCode = 404;
            result.errorType = e.stack;
            result.errorMessage = e.message;
            callback && callback(result);
            reject(e);
          });
      });
    };
  }
}

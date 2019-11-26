/** 语法错误监控 */
import * as _ from 'lodash';
import { monitorType } from './baseInfo';
import { DEVICE_INFO } from './util';
import { def } from './types';

export default function(callback?: def.fn.IEventCallback) {
  const result: def.commonInfo.ICommonPram = {
    browserName: DEVICE_INFO.browserName,
    browserVersion: DEVICE_INFO.browserVersion,
    deviceName: DEVICE_INFO.deviceName,
    monitorType: monitorType.syntaxWatcher
  };
  /** 监听error事件，去除静态资源报错问题 */
  window.addEventListener(
    'error',
    function(e) {
      if (!_.get(e, 'target.localName', '')) {
        const errorRst: def.commonInfo.ICommonPram = {
          reporterTime: Date.now(),
          pageUrl: window.location.href,
          errorType: e.error.message.split(':')[0],
          errorMessage: e.error.stack
        };
        callback &&
          callback({
            ...result,
            ...errorRst
          });
      }
    },
    true
  );
  window.addEventListener(
    'unhandledrejection',
    function(e) {
      if (!e.promise) {
        return;
      }
      const errorRst: def.commonInfo.ICommonPram = {
        reporterTime: Date.now(),
        pageUrl: window.location.href,
        errorType: 'Promise rejected',
        errorMessage:
          e.reason.constructor.name === 'Error'
            ? e.reason.stack
            : e.reason.toString()
      };
      callback &&
        callback({
          ...result,
          ...errorRst
        });
    },
    true
  );
}

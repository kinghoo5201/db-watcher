import { def } from './types';

export const monitorType: { [propName: string]: def.commonInfo.IErrorType } = {
  /** 语法报错 */
  syntaxWatcher: 'syntaxWatcher',
  /** 请求报错 */
  requestWatcher: 'requestWatcher',
  /** 静态资源错误 */
  staticWatcher: 'staticWatcher'
};

export const ajaxEventType = {
  ajaxLoadStart: 'ajaxLoadStart',
  ajaxLoadEnd: 'ajaxLoadEnd',
  ajaxLoadError: 'ajaxLoadError'
};

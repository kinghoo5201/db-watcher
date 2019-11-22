
import requestWatcher from './request';
import { getDevice, restFulParam, recordBehavior } from './util';
import { def } from './types';

export class DbWatcher {
  /** 设备信息 */
  public DEVICE_INFO = getDevice();

  /** 上报地址 */
  public reporterUrl: string = 'http://localhost:2048/cxxc';

  /** 监听器 */
  public watchers = { requestWatcher };

  constructor() {
    recordBehavior();
  }

  /** 通用信息生成 */
  public setCommonProperty = (monitorType: def.commonInfo.IErrorType) => {
    const result: def.commonInfo.ICommonPram = {
      time: Date.now(),
      browserName: this.DEVICE_INFO.browserName,
      browserVersion: this.DEVICE_INFO.browserVersion,
      deviceName: this.DEVICE_INFO.deviceName,
      monitorType
    };
    return result;
  };

  /** 默认上报请求 */
  public defaultReporter = (param: def.commonInfo.ICommonPram) => {
    const img = new Image();
    const paramstr = restFulParam(param);
    img.src = `${this.reporterUrl}${paramstr ? '?' : ''}${paramstr}`;
    function loadFn() {
      removeEvt();
      img.remove();
    }
    function errFn() {
      window.console.log('上报失败：：', param);
      removeEvt();
      img.remove();
    }
    function removeEvt() {
      img.removeEventListener('load', loadFn);
      img.removeEventListener('abort', errFn);
      img.removeEventListener('cancel', errFn);
      img.removeEventListener('error', errFn);
    }

    img.addEventListener('load', loadFn);
    img.addEventListener('abort', errFn);
    img.addEventListener('cancel', errFn);
    img.addEventListener('error', errFn);
    //
  };
}

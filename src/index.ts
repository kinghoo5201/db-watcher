import * as _ from 'lodash';
import requestWatcher from './request';
import staticWatcher from './staticwatch';
import syntaxWatcher from './syntaxWatcher';
import { restFulParam, DEVICE_INFO } from './util';
import { def } from './types';

export class DbWatcher {
  /** 上报地址 */
  public reporterUrl: string = '';

  /** 上报函数 */
  public reporter?: (data: def.commonInfo.ICommonPram) => void = null;

  /** 监听器 */
  public watchers = { requestWatcher, staticWatcher, syntaxWatcher };

  /** 配置 */
  public config: def.modules.index.IConfig = {
    requestWatcher: true,
    staticWatcher: true,
    syntaxWatcher: true
  };

  constructor(
    reporter: string | def.modules.index.reportCfg,
    config?: def.modules.index.IConfig
  ) {
    if (config) {
      this.config = config;
    }
    if (_.isString(reporter)) {
      this.reporterUrl = reporter;
    } else {
      /** 自定义上报函数，就没必要配置上报地址了 */
      this.reporter = reporter;
    }
    this.install();
  }

  /** 安装相应功能 */
  public install() {
    Object.keys(this.watchers).forEach(key => {
      if (this.config[key]) {
        this.watchers[key](this.recordReceiver);
      }
    });
  }

  /** 接收器 */
  public recordReceiver = (data: def.commonInfo.ICommonPram) => {
    let dt = data;
    if (
      !_.isBoolean(this.config) &&
      !_.isEmpty(this.config[data.monitorType])
    ) {
      const config: any = this.config[data.monitorType];
      // 是否上报
      const shouldReported: boolean = config.shouldReport
        ? config.shouldReport(data)
        : true;
      if (!shouldReported) {
        return;
      }
      dt = config.filter ? config.filter(data) : data;
      if (this.reporter) {
        this.reporter(dt);
        return;
      }
    }
    this.defaultReporter(dt);
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

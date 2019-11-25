/** 静态资源监控器
 * @description 只监控js和css文件的情况
 */
import * as _ from 'lodash';
import { monitorType } from './baseInfo';
import { DEVICE_INFO } from './util';
import { def } from './types';

export default function(callback?: def.fn.IEventCallback) {
  window.addEventListener(
    'error',
    function(e) {
      const localName: string = _.get(e, 'target.localName', '');
      if (localName && (localName === 'script' || localName === 'link')) {
        const isScript = localName === 'script';
        const sourceUrl = _.get(e, `target.${isScript ? 'src' : 'href'}`, '');
        const result: def.commonInfo.ICommonPram = {
          time: Date.now(),
          monitorType: monitorType.staticWatcher,
          browserName: DEVICE_INFO.browserName,
          browserVersion: DEVICE_INFO.browserVersion,
          deviceName: DEVICE_INFO.deviceName,
          pageUrl: this.window.location.href,
          requestMethod: 'GET',
          requestUrl: sourceUrl,
          errorType: `${localName}`,
          errorMessage: `failed to load ${localName}[${
            isScript ? 'src' : 'href'
          }:${sourceUrl}]`
        };
        callback && callback(result);
      }
    },
    true
  );
}

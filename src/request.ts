/**
 * @description 监听xhr对象，将结果通过回调函数透传出去
 */
import { ajaxEventType } from './baseInfo';
import { def } from './types';

export default function(callback?: def.fn.IEventCallback) {
  const oldXHR = XMLHttpRequest;

  function newXHR(): XMLHttpRequest {
    const realXHR = new oldXHR();
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
    return realXHR;
  }
  const timeRecordArray = [];
  (window as any).XMLHttpRequest = newXHR;
}

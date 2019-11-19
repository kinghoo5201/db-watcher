import { getDevice } from './util';

export class DbWatcher {
  /** 设备信息 */
  public DEVICE_INFO = getDevice();
  public method: RequestInit;

  constructor() {}

  /** 通用信息生成 */
  public setCommonProperty = () => {};

  public say() {
    console.log(this.DEVICE_INFO);
  }
}

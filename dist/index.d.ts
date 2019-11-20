import { def } from './types';
export declare class DbWatcher {
    /** 设备信息 */
    DEVICE_INFO: def.commonInfo.IDeviceInfo;
    /** 上报地址 */
    reporterUrl: string;
    constructor();
    /** 通用信息生成 */
    setCommonProperty: (monitorType: def.commonInfo.IErrorType) => def.commonInfo.ICommonPram;
    /** 默认上报请求 */
    defaultReporter: (param: def.commonInfo.ICommonPram) => void;
}

import requestWatcher from './request';
import staticWatcher from './staticwatch';
import syntaxWatcher from './syntaxWatcher';
import { def } from './types';
export declare class DbWatcher {
    /** 上报地址 */
    reporterUrl: string;
    /** 上报函数 */
    reporter?: (data: def.commonInfo.ICommonPram) => void;
    /** 监听器 */
    watchers: {
        requestWatcher: typeof requestWatcher;
        staticWatcher: typeof staticWatcher;
        syntaxWatcher: typeof syntaxWatcher;
    };
    /** 配置 */
    config: def.modules.index.IConfig;
    constructor(reporter: string | def.modules.index.reportCfg, config?: def.modules.index.IConfig);
    /** 安装相应功能 */
    install(): void;
    /** 接收器 */
    recordReceiver: (data: def.commonInfo.ICommonPram) => void;
    /** 默认上报请求 */
    defaultReporter: (param: def.commonInfo.ICommonPram) => void;
}

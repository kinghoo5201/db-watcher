/** 获取设备信息 */
export declare function getDevice(): {
    /** 是否ios */
    ios?: boolean;
    /** 是否安卓 */
    android?: boolean;
    /** 是否iphone */
    iphone?: boolean;
    /** 是否ipad */
    ipad?: boolean;
    /** 是否安卓chrome */
    androidChrome?: boolean;
    /** 是否微信 */
    isWeixin?: boolean;
    /** 是否基于webView渲染 */
    webView?: RegExpMatchArray;
    /** 系统 */
    os?: string;
    /** 设备名 */
    deviceName?: string;
    /** 系统版本 */
    osVersion?: string;
    /** 浏览器名 */
    browserName?: string;
    /** 浏览器版本 */
    browserVersion?: string;
};
